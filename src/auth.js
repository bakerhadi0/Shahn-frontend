import http from './http';

export async function login(email, password) {
  const { data } = await http.post('/auth/login', { email, password });
  const token = data.token || data.access_token || data?.data?.token;
  if (!token) throw new Error('No token');
  localStorage.setItem('token', token);
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete http.defaults.headers.common['Authorization'];
}
export function isLogged() { return !!localStorage.getItem('token'); }
