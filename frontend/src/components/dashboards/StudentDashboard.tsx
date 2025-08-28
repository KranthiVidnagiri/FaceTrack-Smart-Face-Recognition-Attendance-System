import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAttendance } from '../../context/AttendanceContext';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  User,
  BookOpen,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BarChart3,
  LogOut
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { getAttendanceByUser, getAttendanceStats, exportToCSV } = useAttendance();

  if (!user) return null;

  const attendanceRecords = getAttendanceByUser(user._id); // use _id
  const stats = getAttendanceStats(user._id);

  const handleExportCSV = () => exportToCSV(attendanceRecords);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-600 bg-emerald-50';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50';
    if (percentage >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const recentAttendance = attendanceRecords.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Student Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <InfoCard title="Roll Number" value={user.rollNumber} icon={<BookOpen className="w-8 h-8 text-blue-600" />} />
          <InfoCard title="Branch" value={user.branch} icon={<TrendingUp className="w-8 h-8 text-emerald-600" />} />
          <InfoCard title="Section" value={user.section} icon={<User className="w-8 h-8 text-purple-600" />} />
          <InfoCard title="Total Days" value={stats.totalDays} icon={<Calendar className="w-8 h-8 text-indigo-600" />} />
        </div>

        {/* Attendance Overview */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Attendance Overview</h2>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <AttendanceStat title="Overall Attendance" value={`${stats.attendancePercentage}%`} icon={<BarChart3 className="w-8 h-8" />} color={getAttendanceColor(stats.attendancePercentage)} />
              <AttendanceStat title="Present Days" value={stats.presentDays} icon={<CheckCircle className="w-8 h-8" />} color="text-emerald-600 bg-emerald-50" />
              <AttendanceStat title="Absent Days" value={stats.absentDays} icon={<AlertCircle className="w-8 h-8" />} color="text-red-600 bg-red-50" />
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Attendance Progress</span>
                <span>{stats.attendancePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    stats.attendancePercentage >= 90
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : stats.attendancePercentage >= 75
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : stats.attendancePercentage >= 60
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${stats.attendancePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Attendance</h3>
            <div className="space-y-3">
              {recentAttendance.length ? (
                recentAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {record.status === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <div className="font-medium text-gray-800">{record.date}</div>
                        <div className="text-sm text-gray-600">{record.time}</div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        record.status === 'present' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status.toUpperCase()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No attendance records found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const InfoCard = ({ title, value, icon }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const AttendanceStat = ({ title, value, icon, color }: any) => (
  <div className="text-center">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${color}`}>{icon}</div>
    <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

export default StudentDashboard;
