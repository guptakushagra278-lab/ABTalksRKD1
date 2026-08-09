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
  completedDays: number[];
  submissions: any[];
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
      const parsed = JSON.parse(storedUser);
      if (!parsed.completedDays) parsed.completedDays = [];
      if (!parsed.submissions) parsed.submissions = [];
      setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = (username: string, email: string) => {
    const usersStr = localStorage.getItem('abtalks_users');
    const users = usersStr ? JSON.parse(usersStr) : {};
    const key = `${username.toLowerCase()}_${email.toLowerCase()}`;

    if (users[key]) {
      if (!users[key].completedDays) users[key].completedDays = [];
      if (!users[key].submissions) users[key].submissions = [];
      setUser(users[key]);
      localStorage.setItem('abtalks_user', JSON.stringify(users[key]));
      return;
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
      track: 'Full Stack Development',
      completedDays: [],
      submissions: []
    };
    
    users[key] = newUser;
    localStorage.setItem('abtalks_users', JSON.stringify(users));
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
    
    const usersStr = localStorage.getItem('abtalks_users');
    const users = usersStr ? JSON.parse(usersStr) : {};
    const key = `${user.username.toLowerCase()}_${user.email.toLowerCase()}`;
    users[key] = updated;
    localStorage.setItem('abtalks_users', JSON.stringify(users));
    
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
