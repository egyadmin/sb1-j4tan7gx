import { ADMIN_CREDENTIALS } from './constants';

export const login = async (email: string, password: string) => {
  // Check against admin credentials
  const adminUser = ADMIN_CREDENTIALS.find(
    admin => admin.email === email && admin.password === password
  );

  if (adminUser) {
    const user = {
      id: email === 'admin@school.com' ? '1' : '2',
      email: adminUser.email,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      role: 'admin'
    };
    
    const token = 'admin-token'; // In production, this would be a JWT
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  }
  
  throw new Error('Invalid credentials');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};