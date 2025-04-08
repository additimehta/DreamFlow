
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('dreamflow_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // In a real app, these functions would make API calls
  const login = (email: string, password: string) => {
    // This is a mock implementation - in a real app, you'd verify credentials with a backend
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: email,
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('dreamflow_user', JSON.stringify(mockUser));
  };

  const signup = (name: string, email: string, password: string) => {
    // This is a mock implementation - in a real app, you'd create a user in your backend
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('dreamflow_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dreamflow_user');
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
