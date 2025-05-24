export const authUtils = {
  setAuthData: (key, value) => {
    try {
      localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    } catch (error) {
      console.error('Erreur localStorage:', error);
    }
  },
  getAuthData: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return localStorage.getItem(key);
    }
  },
  isAuthenticated: () => {
    return localStorage.getItem('auth_token') !== null ||
      localStorage.getItem('is_authenticated') === 'true';
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('session_data');
    localStorage.removeItem('refresh_token');
  }
};
