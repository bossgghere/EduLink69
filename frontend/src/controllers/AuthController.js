const BASE_URL = 'http://localhost:3000/api/auth';  // Or your deployed backend URL

export async function loginController({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await response.json();

  // Save the token to localStorage for future API calls
  if (data.token) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error('Login succeeded but no token received');
  }

  return data;
}


export async function signupController({ name, email, password, phone, dob, gender }) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone, dob, gender }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }
  return await response.json();
}
