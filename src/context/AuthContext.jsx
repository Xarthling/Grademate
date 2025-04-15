import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// TODO: Move this to an environment configuration file
const API_URL = 'http://127.0.0.1:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/account/login/`, {
        email,
        password,
      });
      const { token, user } = response.data;
      console.log('Login response:', response.data);
      localStorage.setItem('token', token); // Add this line to store the token

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    console.log('Signing up with data:', userData);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/account/signup/`, userData);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const forgotPassword = async (email) => {
    console.log('Sending forgot password email to:', email);
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/account/search_email/`, { email });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message?.data.error|| 'Failed to send reset email');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    console.log('Resetting password with token:', token);
    console.log('Resetting password with new password:', password);
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/account/set_new_password/`, {
        token,
        password,
      });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
