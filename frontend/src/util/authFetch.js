async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  return result;
}

async function fetchCurrentUser() {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  });

  const result = await response.json();
  return result;
}

export default {
  login,
  fetchCurrentUser,
}