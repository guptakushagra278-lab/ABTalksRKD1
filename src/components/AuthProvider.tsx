import React, { createContext, useContext, useEffect, useState } from 'react';

export interface MockUser {
  username: string;
  email: string;
  profileComplete: boolean;
  currentDay: number;
  totalDays: number;
  currentStreak: number;
  bestStreak: number;
  completedBuilds: number;
  linkedinSubmissions: number;
  momentum: number;
  track: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (username: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<MockUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('abtalks_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username: string, email: string) => {
    const existingStr = localStorage.getItem('abtalks_user');
    if (existingStr) {
      const existing = JSON.parse(existingStr);
      if (existing.email === email && existing.username === username) {
        setUser(existing);
        return;
      }
    }
    
    const newUser: MockUser = {
      username,
      email,
      profileComplete: false,
      currentDay: 1,
      totalDays: 60,
      currentStreak: 0,
      bestStreak: 0,
      completedBuilds: 0,
      linkedinSubmissions: 0,
      momentum: 0,
      track: 'Full Stack Development'
    };
    
    localStorage.setItem('abtalks_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('abtalks_user');
    setUser(null);
  };

  const updateUser = (updates: Partial<MockUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    localStorage.setItem('abtalks_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
