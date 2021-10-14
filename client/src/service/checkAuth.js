function auth(action, token) {
  switch (action) {
    case 'checkAuth':
      const token = localStorage.getItem('token');
      if (token) return { isAuthenticated: true };
      else return { isAuthenticated: false };

    case 'logout':
      localStorage.removeItem('token');
      return { isAuthenticated: false };
    default:
      return { isAuthenticated: false };
  }
}
export default auth;
