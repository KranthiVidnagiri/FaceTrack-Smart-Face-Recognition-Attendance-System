  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../../context/AuthContext';
  import { useAttendance } from '../../context/AttendanceContext';
  import { 
    Users, 
    Download, 
    Search,
    Eye,
    TrendingUp,
    Calendar,
    CheckCircle,
    AlertCircle,
    UserPlus,
    LogOut,
    Camera,
    BarChart3,
    Trash2,
    UserX
  } from 'lucide-react';

  const FacultyDashboard = () => {
    const { user, logout, getFacultyStudents, addUser, deleteUser } = useAuth();
    const { getAllAttendance, getAttendanceStats, exportToCSV } = useAttendance();
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const [newStudent, setNewStudent] = useState({
      name: '',
      email: '',
      password: '',
      rollNumber: '',
      branch: '',
      section: ''
    });

    if (!user) return null;

    // Get students under this faculty
    const students = getFacultyStudents(user._idid);
    const allAttendance = getAllAttendance();

    const handleAddStudent = () => {
      if (!newStudent.name || !newStudent.email || !newStudent.password || !newStudent.rollNumber || !newStudent.branch || !newStudent.section) {
        alert('Please fill all fields');
        return;
      }

      const studentData = {
        id: Date.now().toString(),
        name: newStudent.name,
        email: newStudent.email,
        password: btoa(newStudent.password + 'salt_key_2024'), // Simple hashing
        role: 'student' as const,
        rollNumber: newStudent.rollNumber,
        branch: newStudent.branch,
        section: newStudent.section,
        facultyId: user.id,
        createdAt: new Date().toISOString()
      };

      addUser(studentData);
      setNewStudent({ name: '', email: '', password: '', rollNumber: '', branch: '', section: '' });
      setShowAddStudent(false);
    };

    const handleRemoveStudent = (studentId: string) => {
      if (window.confirm('Are you sure you want to remove this student?')) {
        deleteUser(studentId);
      }
    };

    const handleExportStudentData = (studentId: string) => {
      const studentAttendance = allAttendance.filter(record => record.userId === studentId);
      exportToCSV(studentAttendance);
    };

    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalStudents = students.length;
    const presentToday = allAttendance.filter(record => 
      record.date === new Date().toISOString().split('T')[0] && 
      record.status === 'present' &&
      students.some(student => student.id === record.userId)
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="glass backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Faculty Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome, {user.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/face-recognition"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Mark My Attendance
                </Link>
                <button
                  onClick={() => setShowAddStudent(true)}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Student
                </button>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-800">{totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present Today</p>
                  <p className="text-3xl font-bold text-gray-800">{presentToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent Today</p>
                  <p className="text-3xl font-bold text-gray-800">{totalStudents - presentToday}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Students Management */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {filteredStudents.length > 0 ? (
                <div className="grid gap-4">
                  {filteredStudents.map((student) => {
                    const studentStats = getAttendanceStats(student.id);
                    return (
                      <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{student.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Roll: {student.rollNumber}</span>
                                <span>Branch: {student.branch}</span>
                                <span>Section: {student.section}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-800">{studentStats.attendancePercentage}%</div>
                              <div className="text-xs text-gray-500">Attendance</div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleExportStudentData(student.id)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Export Data"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleRemoveStudent(student.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove Student"
                              >
                                <UserX className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {selectedStudent === student.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-xl font-bold text-blue-600">{studentStats.presentDays}</div>
                                <div className="text-sm text-gray-600">Present Days</div>
                              </div>
                              <div className="text-center p-3 bg-red-50 rounded-lg">
                                <div className="text-xl font-bold text-red-600">{studentStats.absentDays}</div>
                                <div className="text-sm text-gray-600">Absent Days</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-xl font-bold text-gray-600">{studentStats.totalDays}</div>
                                <div className="text-sm text-gray-600">Total Days</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Students Found</h3>
                  <p className="mb-4">Add students to start tracking attendance</p>
                  <button
                    onClick={() => setShowAddStudent(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Student
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h3>
              
              <form onSubmit={(e) => { e.preventDefault(); handleAddStudent(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="student@university.edu"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create password for student"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roll number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <input
                    type="text"
                    required
                    value={newStudent.branch}
                    onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    required
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., A"
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddStudent(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default FacultyDashboard;