import { createContext, useContext, ReactNode, useState } from 'react';

interface AttendanceRecord {
  userId: string;
  date: string;
  status: 'present' | 'absent';
}

interface AttendanceContextType {
  attendance: AttendanceRecord[];
  markAttendance: (userId: string) => void;
  getAllAttendance: () => AttendanceRecord[];
  getAttendanceStats: (userId: string) => { presentDays: number; absentDays: number; totalDays: number; attendancePercentage: number };
  exportToCSV: (records: AttendanceRecord[]) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const markAttendance = (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const exists = attendance.find(a => a.userId === userId && a.date === today);
    if (!exists) {
      setAttendance(prev => [...prev, { userId, date: today, status: 'present' }]);
    }
  };

  const getAllAttendance = () => attendance;

  const getAttendanceStats = (userId: string) => {
    const records = attendance.filter(a => a.userId === userId);
    const totalDays = records.length;
    const presentDays = records.filter(a => a.status === 'present').length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    return { presentDays, absentDays, totalDays, attendancePercentage };
  };

  const exportToCSV = (records: AttendanceRecord[]) => {
    const csv = [
      ['UserId', 'Date', 'Status'],
      ...records.map(r => [r.userId, r.date, r.status])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance, getAllAttendance, getAttendanceStats, exportToCSV }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) throw new Error('useAttendance must be used within AttendanceProvider');
  return context;
}
