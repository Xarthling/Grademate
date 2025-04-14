import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GradingPage from './pages/GradingPage';
import PlagiarismPage from './pages/PlagiarismPage';

const App = () => {
  // This would normally check for authentication from a context or state management
  const isAuthenticated = false;

  // Private route component to protect authenticated routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <div className="min-h-scree w-full bg-gray-50">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grading" element={<GradingPage />} />
        <Route path="/plagiarism" element={<PlagiarismPage />} />
      </Routes>
    </div>
  );
};

export default App;