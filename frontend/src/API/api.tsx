import { USER, LOGIN, ADMIN_LOGIN_DATA } from '../utils/const';

async function loginUser() {
  return fetch(LOGIN, {
    method: 'POST',
    body: JSON.stringify(ADMIN_LOGIN_DATA),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    credentials: 'include'
  });
}

async function getUser() {
  const response = await fetch(`${USER}/1`, {
    mode: 'no-cors',
    credentials: 'include'
  });
  return response.json();
}

export { getUser, loginUser };
