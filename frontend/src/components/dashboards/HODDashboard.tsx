import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAttendance } from '../../context/AttendanceContext';
import { 
  Users, 
  UserPlus, 
  Download, 
  Search,
  Eye,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Building,
  LogOut,
  Camera,
  BarChart3,
  GraduationCap,
  Clock,
  Award,
  UserX
} from 'lucide-react';

const HODDashboard = () => {
  const { user, users, logout, getFacultyStudents, addUser, deleteUser } = useAuth();
  const { getAllAttendance, getAttendanceStats, exportToCSV } = useAttendance();
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  if (!user) return null;

  // Get faculty under this HOD
  const faculty = users.filter(f => f.role === 'faculty' && f.hodId === user.id);
  const students = users.filter(s => s.role === 'student');
  const allAttendance = getAllAttendance();

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.email || !newFaculty.password || !newFaculty.department) {
      alert('Please fill all fields');
      return;
    }

    const facultyData = {
      id: Date.now().toString(),
      name: newFaculty.name,
      email: newFaculty.email,
      password:newFaculty.password, 
      role: 'faculty' as const,
      department: newFaculty.department,
      hodId: user.id,
      createdAt: new Date().toISOString()
    };

    addUser(facultyData);
    setNewFaculty({ name: '', email: '', password: '', department: '' });
    setShowAddFaculty(false);
  };

  const handleRemoveFaculty = (facultyId: string) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      deleteUser(facultyId);
    }
  };

  const handleExportAllData = () => {
    exportToCSV(allAttendance);
  };

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFaculty = faculty.length;
  const totalStudents = students.length;
  const presentToday = allAttendance.filter(record => 
    record.date === new Date().toISOString().split('T')[0] && 
    record.status === 'present'
  ).length;

  const overallAttendanceRate = allAttendance.length > 0 
    ? Math.round((allAttendance.filter(r => r.status === 'present').length / allAttendance.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HOD Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/face-recognition"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Mark My Attendance
              </Link>
              <button
                onClick={() => setShowAddFaculty(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Faculty
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
        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Faculty</p>
                <p className="text-3xl font-bold text-gray-800">{totalFaculty}</p>
                <p className="text-xs text-emerald-600 mt-1">+2 this month</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">{totalStudents}</p>
                <p className="text-xs text-emerald-600 mt-1">+15 this month</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-3xl font-bold text-gray-800">{presentToday}</p>
                <p className="text-xs text-emerald-600 mt-1">Active users</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Rate</p>
                <p className="text-3xl font-bold text-gray-800">{overallAttendanceRate}%</p>
                <p className="text-xs text-blue-600 mt-1">Attendance</p>
              </div>
              <Award className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={handleExportAllData}
                className="w-full flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors text-left"
              >
                <Download className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-medium text-gray-800">Export All Data</div>
                  <div className="text-sm text-gray-600">Download complete attendance report</div>
                </div>
              </button>
              
              <Link 
                to="/face-recognition"
                className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Camera className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-800">Mark Attendance</div>
                  <div className="text-sm text-gray-600">Use face recognition system</div>
                </div>
              </Link>
              
              <button 
                onClick={() => setShowAddFaculty(true)}
                className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
              >
                <UserPlus className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-800">Add Faculty</div>
                  <div className="text-sm text-gray-600">Register new faculty member</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Attendance Activity</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {allAttendance.slice(-10).reverse().map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {record.status === 'present' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{record.userName}</div>
                      <div className="text-sm text-gray-600">{record.date} at {record.time}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    record.status === 'present' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status.toUpperCase()}
                  </div>
                </div>
              ))}
              
              {allAttendance.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No attendance records yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Faculty Management */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Faculty Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredFaculty.length > 0 ? (
              <div className="grid gap-4">
                {filteredFaculty.map((facultyMember) => {
                  const facultyStudents = getFacultyStudents(facultyMember.id);
                  const facultyAttendance = allAttendance.filter(record => 
                    facultyStudents.some(student => student.id === record.userId)
                  );
                  const avgAttendance = facultyAttendance.length > 0 
                    ? Math.round((facultyAttendance.filter(r => r.status === 'present').length / facultyAttendance.length) * 100)
                    : 0;

                  return (
                    <div key={facultyMember.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                            {facultyMember.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{facultyMember.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{facultyMember.email}</span>
                              <span>Dept: {facultyMember.department}</span>
                              <span>Students: {facultyStudents.length}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{avgAttendance}%</div>
                            <div className="text-xs text-gray-500">Avg Attendance</div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedFaculty(selectedFaculty === facultyMember.id ? null : facultyMember.id)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRemoveFaculty(facultyMember.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove Faculty"
                            >
                              <UserX className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {selectedFaculty === facultyMember.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-xl font-bold text-blue-600">{facultyStudents.length}</div>
                              <div className="text-sm text-gray-600">Total Students</div>
                            </div>
                            <div className="text-center p-3 bg-emerald-50 rounded-lg">
                              <div className="text-xl font-bold text-emerald-600">
                                {facultyAttendance.filter(r => r.status === 'present').length}
                              </div>
                              <div className="text-sm text-gray-600">Present Records</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <div className="text-xl font-bold text-purple-600">{avgAttendance}%</div>
                              <div className="text-sm text-gray-600">Success Rate</div>
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
                <h3 className="text-lg font-medium mb-2">No Faculty Found</h3>
                <p className="mb-4">Add faculty members to start managing the institution</p>
                <button
                  onClick={() => setShowAddFaculty(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Your First Faculty
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Faculty</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddFaculty(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
                <input
                  type="text"
                  required
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter faculty name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="faculty@university.edu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newFaculty.password}
                  onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Create password for faculty"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={newFaculty.department}
                  onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddFaculty(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HODDashboard;