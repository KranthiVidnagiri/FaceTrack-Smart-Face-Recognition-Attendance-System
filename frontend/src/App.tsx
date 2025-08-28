import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import AboutPage from './components/AboutPage';
import StudentDashboard from './components/dashboards/StudentDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import HODDashboard from './components/dashboards/HODDashboard';
import FaceRecognition from './components/attendance/FaceRecognition.tsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route 
        path="/signup" 
        element={user ? <Navigate to="/dashboard" /> : <SignupPage />} 
      />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/dashboard" 
        element={
          user ? (
            user.role === 'student' ? <StudentDashboard /> :
            user.role === 'faculty' ? <FacultyDashboard /> :
            user.role === 'hod' ? <HODDashboard /> :
            <Navigate to="/login" />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route 
        path="/face-recognition" 
        element={user ? <FaceRecognition /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <AppRoutes />
          </div>
        </Router>
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;