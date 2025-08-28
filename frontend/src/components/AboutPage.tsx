import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Brain, 
  Shield, 
  Users, 
  Camera, 
  BarChart3, 
  Clock,
  CheckCircle,
  Target,
  Award,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "Advanced Face Recognition",
      description: "State-of-the-art AI technology for accurate and secure attendance marking using facial recognition."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Hierarchical Management",
      description: "Complete organizational structure with Student → Faculty → HOD hierarchy for streamlined management."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Secure Authentication",
      description: "Robust signup/login system with password hashing and role-based access control."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "Comprehensive Reports",
      description: "Detailed attendance analytics with CSV/Excel export functionality for all stakeholders."
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: "Real-time Tracking",
      description: "Live attendance monitoring with instant updates and notifications across the system."
    },
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "Fast & Efficient",
      description: "Lightning-fast recognition processing with minimal wait times and maximum accuracy."
    }
  ];

  const benefits = [
    "Eliminate manual attendance processes",
    "Reduce administrative workload",
    "Prevent proxy attendance fraud",
    "Generate automated reports",
    "Real-time attendance monitoring",
    "Secure data management",
    "Mobile-responsive interface",
    "Scalable for any institution size"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">FRS ATTENDANCE</span>
            </Link>
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
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">About FRS ATTENDANCE</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive Face Recognition Attendance Management System designed to revolutionize 
            how educational institutions track and manage attendance with cutting-edge AI technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To provide educational institutions with a secure, efficient, and user-friendly 
                attendance management system that leverages advanced face recognition technology 
                to eliminate traditional attendance challenges.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in creating technology that simplifies complex processes while 
                maintaining the highest standards of security and accuracy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                <Award className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">99.9% Accuracy</h3>
                <p className="text-sm text-gray-600">Industry-leading face recognition precision</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                <Shield className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Secure System</h3>
                <p className="text-sm text-gray-600">Advanced encryption and data protection</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                <Clock className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Real-time</h3>
                <p className="text-sm text-gray-600">Instant attendance processing and updates</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                <Users className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Multi-role</h3>
                <p className="text-sm text-gray-600">Complete hierarchical management system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Key Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and capabilities designed to meet all your attendance management needs
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
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Why Choose FRS ATTENDANCE?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your institution's attendance management with these powerful benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">System Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Frontend Technology</h4>
                  <p className="text-blue-100">React.js with TypeScript, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <p className="text-blue-100">Secure signup/login with password hashing</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Face Recognition</h4>
                  <p className="text-blue-100">Advanced AI algorithms with high accuracy</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Export</h4>
                  <p className="text-blue-100">CSV/Excel format with comprehensive reports</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security</h4>
                  <p className="text-blue-100">Role-based access control and data encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join the future of attendance management with FRS ATTENDANCE system
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Create Account
            </Link>
            <Link 
              to="/login"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Login Now
            </Link>
          </div>
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

export default AboutPage;