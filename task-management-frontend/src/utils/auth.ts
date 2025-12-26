import Cookies from 'js-cookie';

export const isAuthenticated = () => !!Cookies.get('token');

export const storeLoginCredentials = (user: any, tokenId: string) => {
  Cookies.set('token', tokenId, { expires: 365 });
  Cookies.set('user', JSON.stringify(user), { expires: 365 });
};

export const getAuthorizationHeader = () => {
  const token = getToken();
  if (!token) return '';

  if (token.startsWith('Bearer ')) {
    return token;
  }

  return `Bearer ${token}`;
};

export const getToken = () => (Cookies.get('token') ? Cookies.get('token') : '');
export const getUser = () => (Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : '');

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  window.location.href = '/login';
};

export const getUserRole = () => {
  const user = Cookies.get('user') && JSON.parse(Cookies.get('user') as string);
  if (user && user.role) {
    return user.role;
  }
  return 'NON_MEMBER';
};