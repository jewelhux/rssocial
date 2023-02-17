import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import ioCookieParser from "socket.io-cookie-parser";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;
const secretKey = "secret_key";

let mockDB = {
  users: [
    {
      id: 1,
      name: "Илья",
      lastname: "Жиков",
      email: "jik@maybebaby.com",
      password: "123",
      isAdmin: true,
      friends: [
        { id: 2, status: "accepted" },
        { id: 3, status: "accepted" },
      ],
      avatar: null,
      about: {
        age: 25,
        status: "не указан",
        interests: "maybe baby",
        work: "Вкусно и точка",
      },
    },
    {
      id: 2,
      name: "Женя",
      lastname: "Сидеров",
      email: "syderi@github.com",
      password: "123",
      isAdmin: true,
      friends: [
        { id: 1, status: "accepted" },
        { id: 3, status: "accepted" },
      ],
      avatar: null,
      about: {
        age: 45,
        status: "в отношениях",
        interests: "programming",
        work: "Вкусно и точка",
      },
    },
    {
      id: 3,
      name: "Кирилл",
      lastname: "Ферко",
      email: "ferka123@github.com",
      password: "123",
      isAdmin: true,
      friends: [
        { id: 1, status: "accepted" },
        { id: 2, status: "accepted" },
      ],
      avatar: null,
      about: {
        age: 30,
        status: "никого не ищу",
        interests: "skateboarding",
        work: "продавец фломастеров",
      },
    },
  ],
  posts: [
    {
      id: 1676376266008,
      date: 1676376216008,
      userId: 1,
      image:
        "https://mir-znamenitostej.ru/wp-content/uploads/2019/08/%D0%9C%D1%8D%D0%B9%D0%B1%D0%B8-%D0%91%D1%8D%D0%B9%D0%B1%D0%B8-%D0%B1%D0%B8%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F-%D0%BB%D0%B8%D1%87%D0%BD%D0%B0%D1%8F-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-%D0%BC%D1%83%D0%B6.jpg",
      text: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      id: 1676376266009,
      date: 1676376264008,
      userId: 3,
      image: null,
      text: "Ferka post",
    },
    {
      id: 1676376266010,
      date: 1676316266008,
      userId: 2,
      image: null,
      text: "Syderi post",
    },
  ],
  conversations: [
    {
      id: 1676376266008,
      participants: [
        { id: 1, lastIndex: 0 },
        { id: 3, lastIndex: 0 },
      ],
      lastUpdate: 1676376266008,
      messages: [
        {
          date: 1676376073988,
          text: "Hello there",
          userId: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONo5SwAXmbHd6ShcH2jk-9zTYMlsAyQDCew&usqp=CAU",
        },
        {
          date: 1676376266008,
          text: "General Kenobi",
          userId: 3,
          image: "https://i.imgflip.com/4i355u.png",
        },
      ],
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
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
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
    return res.status(400).send({ message: "Validation failed" });
  if (mockDB.users.find((el) => el.email === email))
    return res.status(409).send({ message: "User already exists" });

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
    expiresIn: "15h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 54000000 });
  res.cookie("logged_in", true, { maxAge: 54000000 });

  return res.status(201).send({ message: "Account created" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "Validation failed" });

  const user = mockDB.users.find(
    (el) => el.email === email && el.password === password
  );
  if (!user) return res.status(401).send({ message: "Authentication failed" });

  const token = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    secretKey,
    {
      expiresIn: "15h",
    }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 54000000 });
  res.cookie("logged_in", true, { maxAge: 54000000 });

  return res.status(200).send({ message: "Login successful" });
});

// Middleware function to check the token
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.clearCookie("logged_in");
    return res.status(401).send({ message: "Unauthorized access" });
  }
};

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).send({ message: "Access forbidden" });
  } else next();
};

app.post("/api/auth/logout", checkAuth, (req, res) => {
  res.clearCookie("token");
  res.clearCookie("logged_in");
  return res.status(200).send({ message: "User logged out" });
});

//user
app.get("/api/profile", checkAuth, (req, res) => {
  const userId = Number(req.query.id || req.user.userId);
  const user = mockDB.users.find((el) => el.id === userId);
  if (!user) return res.status(404).send({ message: "Not found" });

  const { password, friends, email, isAdmin, ...profileData } = user;
  if (userId === req.user.userId) {
    profileData.friendStatus = "none";
    profileData.isAdmin = isAdmin;
    profileData.isOwn = true;
  } else {
    const self = mockDB.users.find((el) => el.id === req.user.userId);
    const friend = self.friends.find((el) => el.id === user.id);
    profileData.friendStatus = friend?.status ?? "none";
  }

  return res.status(200).send(profileData);
});

//update profile
app.put("/api/profile", checkAuth, upload.single("avatar"), (req, res) => {
  const image = req.file;
  const user = mockDB.users.find((el) => el.id === req.user.userId);
  if (!user) return res.status(404).send({ message: "Not found" });
  if (req.body.age) user.about.age = req.body.age;
  if (req.body.status) user.about.status = req.body.status;
  if (req.body.interests) user.about.interests = req.body.interests;
  if (req.body.work) user.about.work = req.body.work;

  if (image) user.avatar = `http://localhost:3000/uploads/${image.filename}`;
  return res.status(200).send({ message: "success" });
});

app.get("/api/profile/all", checkAuth, (req, res) => {
  const searchQuery = req.query.search;
  const self = mockDB.users.find((el) => el.id === req.user.userId);
  const users = mockDB.users
    .filter((user) => {
      return (
        user !== self &&
        (!searchQuery ||
          searchQuery
            ?.toLowerCase()
            .split(" ")
            .slice(0, 2)
            .every(
              (word) =>
                user.name.toLowerCase().startsWith(word) ||
                user.lastname.toLowerCase().startsWith(word)
            ))
      );
    })
    .map((user) => {
      const { id, name, lastname, avatar, about } = user;
      const friend = self.friends.find((el) => el.id === id);
      const friendStatus = friend?.status ?? "none";
      return { id, name, lastname, avatar, about, friendStatus };
    });
  return res.status(200).send({ users });
});

//friends
app.get("/api/friends", checkAuth, (req, res) => {
  const status = req.query.type || "accepted";
  const user = mockDB.users.find((el) => el.id === Number(req.user.userId));
  if (!user) return res.status(404).send({ message: "Not found" });
  const friends = user.friends
    .filter((friend) => friend.status === status)
    .map((friend) => {
      const friendUser = mockDB.users.find((el) => el.id === friend.id);
      const { id, name, lastname, avatar, about } = friendUser;
      return { id, name, lastname, avatar, about };
    });

  return res.status(200).send({ friends });
});

app.post("/api/friends", checkAuth, (req, res) => {
  const { id, action } = req.body;
  if (
    typeof id !== "number" ||
    id === req.user.userId ||
    !["request", "approve", "delete"].includes(action)
  )
    return res.status(400).send({ message: "Bad request" });

  const self = mockDB.users.find((el) => el.id === Number(req.user.userId));
  const requested = mockDB.users.find((el) => el.id === Number(id));
  if (!self || !requested)
    return res.status(404).send({ message: "Not found" });

  const selfFriend = self.friends.find((friend) => friend.id === id);
  const requestedFriend = requested.friends.find(
    (friend) => friend.id === Number(req.user.userId)
  );

  if (action === "request") {
    if (selfFriend || requestedFriend)
      return res.status(400).send({ message: "Already requested" });
    self.friends.push({ id, status: "requested" });
    requested.friends.push({ id: req.user.userId, status: "pending" });
    return res.status(200).send({ message: "Request Processed" });
  }
  if (action === "approve") {
    if (!selfFriend || !requestedFriend)
      return res.status(400).send({ message: "Bad request" });
    if (
      selfFriend.status === "accepted" &&
      requestedFriend.status === "accepted"
    )
      return res.status(400).send({ message: "Already approved" });
    selfFriend.status = "accepted";
    requestedFriend.status = "accepted";
    return res.status(200).send({ message: "Request Processed" });
  }
  if (action === "delete") {
    if (!selfFriend || !requestedFriend)
      return res.status(400).send({ message: "Bad request" });
    self.friends = self.friends.filter((friend) => friend !== selfFriend);
    requested.friends = self.friends.filter(
      (friend) => friend !== requestedFriend
    );
    return res.status(200).send({ message: "Request Processed" });
  }
});

// posts
app.post("/api/posts", checkAuth, upload.single("image"), (req, res) => {
  const image = req.file;
  const { text } = req.body;
  const user = mockDB.users.find((el) => el.id === req.user.userId);

  const post = {
    id: +new Date(),
    date: +new Date(),
    userId: req.user.userId,
    text,
    image: image ? `http://localhost:3000/uploads/${image.filename}` : null,
  };
  mockDB.posts.push(post);
  return res.status(200).send(post);
});

app.get("/api/posts", checkAuth, (req, res) => {
  const userId = Number(req.query.id || req.user.userId);
  if (isNaN(userId)) return res.status(400).send({ message: "Bad request" });

  const posts = mockDB.posts.filter((post) => post.userId === userId).reverse();
  res.status(200).send({ posts });
});

app.get("/api/posts/all", checkAuth, (req, res) => {
  const posts = mockDB.posts
    .map((post) => {
      const user = mockDB.users.find((el) => el.id === post.userId);
      return {
        ...post,
        name: `${user.name} ${user.lastname}`,
        avatar: user.avatar,
      };
    })
    .reverse();
  res.status(200).send({ posts });
});

app.delete("/api/posts/:id", checkAuth, (req, res) => {
  const index = mockDB.posts.findIndex((el) => el.id === Number(req.params.id));
  if (index === -1) return res.status(404).send({ message: "Not found" });

  if (mockDB.posts[index].userId !== req.user.userId && !req.user.isAdmin)
    return res.status(403).send({ message: "Access forbidden" });

  mockDB.posts.splice(index, 1);

  return res.status(204).send();
});

//chat

io.use(ioCookieParser());

io.use((socket, next) => {
  const token = socket.request.cookies.token;
  try {
    const decoded = jwt.verify(token, secretKey);
    socket.user = decoded;
    next();
  } catch {
    next(new Error({ message: "Unauthorized access" }));
  }
});

io.on("connection", (socket) => {
  socket.join(socket.user.userId);
  socket.broadcast.emit("userStatus", { id: socket.user.userId, online: true });

  socket.on("disconnect", () =>
    socket.broadcast.emit("userStatus", {
      id: socket.user.userId,
      online: false,
    })
  );

  socket.on("reportRead", (profile) => {
    const conv = mockDB.conversations.find((conv) =>
      conv.participants.every(
        (el) => [profile, socket.user.userId].indexOf(el.id) > -1
      )
    );
    if (conv) {
      const user = conv.participants.find((el) => el.id === socket.user.userId);
      if (user) user.lastIndex = conv.messages.length;
      socket.emit("updateRead", profile);
    }
  });
});

const getConvResponse = (conv, userId) => {
  const { id: opponentId } = conv.participants.find(
    (participant) => participant.id !== userId
  );
  const { lastIndex } = conv.participants.find(
    (participant) => participant.id === userId
  );
  const opponent = mockDB.users.find((el) => el.id === opponentId);
  const lastMessage = conv.messages.at(-1);
  return {
    id: opponentId,
    name: `${opponent.name} ${opponent.lastname}`,
    avatar: opponent.avatar,
    unreadCount: conv.messages.length - lastIndex,
    lastUpdate: conv.lastUpdate,
    online: Boolean(io.sockets.adapter.rooms.get(opponentId)),
    lastMessage: lastMessage?.text
      ? lastMessage.text
      : lastMessage?.src
      ? "Image"
      : "",
  };
};

app.get("/api/chat/conversations", checkAuth, (req, res) => {
  const newChatProfile = Number(req.query.newchat);
  const conversations = mockDB.conversations
    .filter((conv) =>
      conv.participants.find(
        (participant) => participant.id === req.user.userId
      )
    )
    .map((conv) => getConvResponse(conv, req.user.userId));

  if (
    !isNaN(newChatProfile) &&
    newChatProfile !== req.user.userId &&
    conversations.every((conv) => conv.id !== newChatProfile)
  ) {
    const opponent = mockDB.users.find((user) => user.id === newChatProfile);
    if (opponent)
      conversations.push({
        id: opponent.id,
        name: `${opponent.name} ${opponent.lastname}`,
        avatar: opponent.avatar,
        unreadCount: 0,
        lastUpdate: +new Date(),
        online: Boolean(io.sockets.adapter.rooms.get(opponent.id)),
        lastMessage: "",
      });
  }
  res.status(200).send({ conversations });
});

app.get("/api/chat/messages", checkAuth, (req, res) => {
  const profile = Number(req.query.profile);

  const conv = mockDB.conversations.find((conv) =>
    conv.participants.every(
      (el) => [profile, req.user.userId].indexOf(el.id) > -1
    )
  );
  const messages = conv?.messages ?? [];
  res.status(200).send({ messages });
});

app.post(
  "/api/chat/messages",
  checkAuth,
  upload.single("image"),
  (req, res) => {
    const image = req.file;
    const text = req.body.text;
    const profile = Number(req.body.profile);

    if (
      !typeof profile === "number" ||
      !(text || image) ||
      profile === req.user.userId ||
      !mockDB.users.find((user) => user.id === profile)
    )
      return res.status(400).send({ message: "Bad request" });

    const conv = mockDB.conversations.find((conv) =>
      conv.participants.every(
        (el) => [profile, req.user.userId].indexOf(el.id) > -1
      )
    );

    const message = {
      date: +new Date(),
      text,
      image: image ? `http://localhost:3000/uploads/${image.filename}` : null,
      userId: req.user.userId,
      conversationId: req.user.userId,
    };

    if (conv) {
      conv.messages.push(message);
      const user = conv.participants.find((el) => el.id === req.user.userId);
      user.lastIndex += 1;
      io.to(profile).emit("newMessage", message);
    } else {
      const newConv = {
        id: +new Date(),
        participants: [
          { id: req.user.userId, lastIndex: 0 },
          { id: profile, lastIndex: 0 },
        ],
        lastUpdate: +new Date(),
        messages: [message],
      };
      mockDB.conversations.push(newConv);
      io.to(profile).emit("addConversation", getConvResponse(newConv, profile));
    }

    io.to(req.user.userId).emit("newMessage", {
      ...message,
      conversationId: profile,
      own: true,
    });

    return res.status(200).send({ message: "success" });
  }
);

httpServer.listen(port, () => console.log(`server started on ${port}`));
