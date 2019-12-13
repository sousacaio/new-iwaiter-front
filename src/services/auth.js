export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getIdBar = () => localStorage.getItem('idbar');
export const armazenaToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const armazenaIdBar = token => {
  localStorage.setItem('idbar', token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

