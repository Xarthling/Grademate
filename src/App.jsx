import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import GradingPage from './pages/GradingPage';
import PlagiarismPage from './pages/PlagiarismPage';
import { ProcessingProvider } from './context/ProcessingContext';
import AuthLayout from './components/ui/AuthLayout';

const PrivateRoute = ({ element }) => {
  // const { isAuthenticated, loading } = useAuth();
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  // return isAuthenticated ? element : <Navigate to="/" replace />;
  return element;

};

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <AuthProvider>
        <ProcessingProvider>
          <Routes>
            <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
            <Route path="/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/grading" element={<PrivateRoute element={<GradingPage />} />} />
            <Route path="/plagiarism" element={<PrivateRoute element={<PlagiarismPage />} />} />
          </Routes>
        </ProcessingProvider>
      </AuthProvider>
    </div>
  );
};

export default App;