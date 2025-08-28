export interface User {
  _id: string; // <-- Add this line
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'hod'; // <-- change 'hod' to 'admin'
  rollNumber?: string;
  section?: string;
  branch?: string;
  department?: string;
}

export interface Student extends User {
  rollNumber: string;
  branch: string;
  section: string;
  facultyId: string;
  faceEncoding: string;
}

export interface Faculty extends User {
  department: string;
  hodId: string;
}

export interface HOD extends User {
  department: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  markedBy?: string;
  method: 'face-recognition' | 'manual';
  subject?: string;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
}