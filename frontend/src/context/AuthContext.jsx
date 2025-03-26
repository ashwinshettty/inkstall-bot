import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In a real app, this would involve API calls
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    navigate('/');
  };

  const register = (userData) => {
    // In a real app, this would involve API calls
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
