const BASE = 'http://localhost:3000/api';
const USER = `${BASE}/profile`;
const LOGIN = `${BASE}/auth/login`;

const ADMIN_PROFILE_DATA = {
  name: 'Илья',
  lastname: 'Жиков',
  avatar: null,
  about: {
    age: 25,
    status: 'не женат',
    interests: 'maybe baby',
    work: 'Вкусно и точка'
  }
};

const ADMIN_LOGIN_DATA = {
  email: 'jik@maybebaby.com',
  password: '123'
};

export { BASE, USER, LOGIN, ADMIN_PROFILE_DATA, ADMIN_LOGIN_DATA };
