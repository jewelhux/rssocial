import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
const port = 3000;
const secretKey = "secret_key";

let mockDB = {
  users: [
    {
      id: 0,
      name: "Илья",
      lastname: "Жиков",
      email: "jik@maybebaby.com",
      password: "123",
      isAdmin: true,
      friends: [1, 2],
      avatar: null,
      about: {
        age: 25,
        status: "не женат",
        interests: "maybe baby",
        work: "Вкусно и точка",
      },
    },
    {
      id: 1,
      name: "Женя",
      lastname: "Сидеров",
      email: "syderi@github.com",
      password: "123",
      isAdmin: true,
      friends: [0, 2],
      avatar: null,
      about: {
        age: 45,
        status: "женат",
        interests: "programming",
        work: "Вкусно и точка",
      },
    },
    {
      id: 2,
      name: "Кирилл",
      lastname: "Ферко",
      email: "ferka123@github.com",
      password: "123",
      isAdmin: true,
      friends: [0, 1],
      avatar: null,
      about: {
        age: 30,
        status: "не женат",
        interests: "skateboarding",
        work: "продавец фломастеров",
      },
    },
  ],
  posts: [
    {
      id: 0,
      userId: 0,
      image:
        "https://mir-znamenitostej.ru/wp-content/uploads/2019/08/%D0%9C%D1%8D%D0%B9%D0%B1%D0%B8-%D0%91%D1%8D%D0%B9%D0%B1%D0%B8-%D0%B1%D0%B8%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F-%D0%BB%D0%B8%D1%87%D0%BD%D0%B0%D1%8F-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-%D0%BC%D1%83%D0%B6.jpg",
      text: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      id: 1,
      userId: 0,
      image: null,
      text: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      id: 1,
      userId: 2,
      image: null,
      text: "Ferka post",
    },
    {
      id: 2,
      userId: 1,
      image: null,
      text: "Syderi post",
    },
  ],
};

if (fs.existsSync("db.json")) {
  const data = fs.readFileSync("db.json");
  mockDB = JSON.parse(data);
}

process.on("SIGINT", function () {
  fs.writeFileSync(
    path.join(__dirname, "db.json"),
    JSON.stringify(mockDB),
    "utf-8"
  );
  process.exit();
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = path.join(__dirname, "uploads");
    fs.mkdirSync(uploadsPath, { recursive: true });
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

app.post("/api/auth/register", (req, res) => {
  const { name, lastname, email, password } = req.body;
  if (!name || !lastname || !email || !password)
    return res.status(400).send("data validation failed");
  if (mockDB.users.find((el) => el.email === email))
    return res.status(409).send("user already exist");

  const id = +new Date();
  mockDB.users.push({
    name,
    lastname,
    email,
    password,
    id,
    isAdmin: false,
    friends: [],
    avatar: null,
    about: {},
  });

  const token = jwt.sign({ userId: id, isAdmin: false }, secretKey, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

  return res.status(201).send("account created");
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("data validation failed");

  const user = mockDB.users.find(
    (el) => el.email === email && el.password === password
  );
  if (!user) return res.status(403).send("auth failed");

  const token = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

  return res.status(200).send("login successfull");
});

// Middleware function to check the token
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized access");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(400).send("Token has expired");
  }
};

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(401).send("Unauthorized access");
  } else next();
};

app.get("/api/auth/logout", checkAuth, (req, res) => {
  res.clearCookie("token");
  return res.status(200).send("loged out");
});

//user
app.get("/api/profile", checkAuth, (req, res) => {
  const { password, ...user } = mockDB.users.find(
    (el) => el.id === req.user.userId
  );
  if (!user) return res.status(404).send("not found");
  return res.status(200).send(user);
});

//update profile
app.put("/api/profile", checkAuth, upload.single("avatar"), (req, res) => {
  const image = req.file;
  const user = mockDB.users.find((el) => el.id === req.user.userId);
  if (!user) return res.status(404).send("not found");
  if (req.body.age) user.about.age = req.body.age;
  if (req.body.status) user.about.status = req.body.status;
  if (req.body.interests) user.about.interests = req.body.interests;
  if (req.body.work) user.about.work = req.body.work;

  if (image) user.avatar = `http://localhost:3000/uploads/${image.filename}`;
  const { password, ...rest } = user;
  return res.status(200).send(rest);
});

app.get("/api/profile/:id", checkAuth, (req, res) => {
  const user = mockDB.users.find((el) => el.id === Number(req.params.id));
  if (!user) return res.status(404).send("not found");
  const { name, lastname, avatar, about } = user;
  return res.status(200).send({ name, lastname, avatar, about });
});

// posts
app.post("/api/posts", checkAuth, upload.single("image"), (req, res) => {
  const image = req.file;
  const { text } = req.body;
  const user = mockDB.users.find((el) => el.id === req.user.userId);

  const post = {
    id: +new Date(),
    userId: req.user.userId,
    text,
    image: image ? `http://localhost:3000/uploads/${image.filename}` : null,
  };
  mockDB.posts.push(post);
  return res
    .status(200)
    .send({ ...post, name: `${user.name} ${user.lastname}` });
});

app.get("/api/posts", checkAuth, (req, res) => {
  const posts = mockDB.posts.filter((post) => post.userId === req.user.userId);
  res.status(200).send({ posts });
});

app.delete("/api/posts/:id", checkAuth, (req, res) => {
  const index = mockDB.posts.findIndex((el) => el.id === Number(req.params.id));
  if (index === -1) return res.status(404).send("not found");

  if (mockDB.posts[index].userId !== req.user.userId && !req.user.isAdmin)
    return res.status(401).send("Unathorized");

  mockDB.posts.splice(index, 1);

  return res.status(204).send();
});

app.get("/api/posts/all", checkAuth, (req, res) => {
  const posts = mockDB.posts.map((post) => {
    const user = mockDB.users.find((el) => el.id === post.userId);
    return { ...post, name: `${user.name} ${user.lastname}` };
  });
  res.status(200).send({ posts });
});

app.listen(port, () => console.log(`server started on ${port}`));
