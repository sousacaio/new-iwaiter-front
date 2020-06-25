export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem('_id');
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const setId = token => {
  localStorage.setItem('_id', token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const setData = data => {
  localStorage.setItem('data', data);
};
export const getData = () => {
  JSON.parse(localStorage.getItem('data'))
};

