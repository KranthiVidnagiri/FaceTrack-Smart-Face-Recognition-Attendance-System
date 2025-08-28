import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Brain, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Camera,
  Database,
  Download
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "Face Recognition",
      description: "Advanced AI-powered face recognition for secure attendance marking"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Multi-Role System",
      description: "Hierarchical system supporting HOD, Faculty, and Student roles"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive reports and analytics for attendance tracking"
    },
    {
      icon: <Database className="w-8 h-8 text-indigo-600" />,
      title: "Data Management",
      description: "Efficient student and faculty data management system"
    },
    {
      icon: <Download className="w-8 h-8 text-orange-600" />,
      title: "Export Reports",
      description: "Download attendance reports in CSV/Excel format"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure System",
      description: "Role-based security with encrypted data storage"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "5000+", label: "Students Managed" },
    { number: "24/7", label: "System Availability" },
    { number: "<1s", label: "Recognition Time" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">FRS ATTENDANCE</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/signup"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                SIGNUP
              </Link>
              <Link 
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                LOGIN
              </Link>
              <Link 
                to="/about"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">FRS ATTENDANCE</span>
              <br />
              <span className="text-gray-800">Face Recognition System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Real-time attendance management system using Face Recognition technology. 
              Secure signup/login for Students, Faculty, and HOD with hierarchical management and comprehensive reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Sign Up Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for modern attendance management in one comprehensive platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover-lift cursor-pointer group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of institutions already using FaceTrack Pro for seamless attendance management
          </p>
          <Link 
            to="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
          >
            Create Account <CheckCircle className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">FRS ATTENDANCE</span>
          </div>
          <p className="text-gray-400 mb-8">
            Face Recognition Attendance Management System
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2024 FRS ATTENDANCE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;