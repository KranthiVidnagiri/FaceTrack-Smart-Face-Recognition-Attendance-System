import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  users: User[]; // <-- Add this
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'hod'; // <-- change 'hod' to 'admin'
  rollNumber?: string;
  section?: string;
  branch?: string;
  department?: string;
  hodId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // <-- Add this
  const [token, setToken] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('frs_current_user');
    const savedToken = localStorage.getItem('frs_token');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  // Fetch all users for signup HOD selection
  useEffect(() => {
    async function fetchUsers() {
      if (!token) {
        setUsers([]);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setUsers([]);
      }
    }
    fetchUsers();
  }, [API_BASE, token]);

  // Save user/token in localStorage
  useEffect(() => {
    if (user) localStorage.setItem('frs_current_user', JSON.stringify(user));
    else localStorage.removeItem('frs_current_user');

    if (token) localStorage.setItem('frs_token', token);
    else localStorage.removeItem('frs_token');
  }, [user, token]);

  // ✅ Signup
  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    try {
      const payload: any = {
  name: userData.name,
  email: userData.email,
  password: userData.password,
  role: userData.role,
  department: userData.department 
};
      if (userData.rollNumber) payload.rollNumber = userData.rollNumber;
      if (userData.section) payload.section = userData.section;
      if (userData.branch) payload.branch = userData.branch;
      if (userData.department) payload.department = userData.department;
      if (userData.hodId) payload.hodId = userData.hodId;

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Signup error:', data); // <-- Add this line
        if (data.errors) {
          console.error('Validation errors:', data.errors); // <-- Add this
          data.errors.forEach((err: any) => console.error(err)); // <-- Add this line
        }
        return { success: false, message: data.message || 'Signup failed' };
      }
      return { success: true, message: 'Account created successfully' };
    } catch (error) {
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  };

  // ✅ Login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || 'Invalid email or password' };
      }

      setUser({
        _id: data.user._id, // <-- Use _id here
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        rollNumber: data.user.rollNumber,
        section: data.user.section,
        branch: data.user.branch,
        department: data.user.department,
      });
      setToken(data.token);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('frs_current_user');
    localStorage.removeItem('frs_token');
  };

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}


