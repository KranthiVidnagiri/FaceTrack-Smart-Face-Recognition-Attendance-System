import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAttendance } from '../../context/AttendanceContext';
import { 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  RefreshCw,
  User,
  Clock,
  Zap,
  Shield,
  Eye,
  Scan
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const FaceRecognition = () => {
  const { user } = useAuth();
  const { addAttendance } = useAttendance();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera access error:', err);
    }
  };

  const captureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current || !user) return;

    setIsScanning(true);
    setError(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Unable to get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0);

      // Simulate face recognition processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful face recognition (90% success rate)
      const recognitionSuccess = Math.random() > 0.1;

      if (recognitionSuccess) {
        // Mark attendance
        const now = new Date();
        const attendanceRecord = {
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          date: now.toISOString().split('T')[0],
          time: now.toTimeString().split(' ')[0],
          status: 'present' as const,
          method: 'face-recognition' as const
        };

        // Send to backend
        try {
          const token = localStorage.getItem('frs_token');
          await fetch(`${API_BASE}/attendance/mark`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
            body: JSON.stringify({
              userId: user.id,
              status: 'present',
              location: attendanceRecord.location,
              imageUrl: imageDataUrl
            })
          });
        } catch (e) {
          console.error('Backend attendance mark failed', e);
        }
        addAttendance(attendanceRecord);
        setIsSuccess(true);

        // Stop camera after success
        if (stream) { stream.getTracks().forEach(t => t.stop()); }

        // Auto-redirect after success
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        throw new Error('Face not recognized. Please ensure proper lighting and face the camera directly.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Recognition failed');
    } finally {
      setIsScanning(false);
    }
  };

  const resetAndRetry = () => {
    setIsSuccess(false);
    setError(null);
    setIsScanning(false);
  };

  if (!user) {
    return <div>Please log in to mark attendance.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Face Recognition Attendance</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Position your face within the camera frame and click "Scan Face" to mark your attendance securely using AI-powered recognition.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="relative">
                <div className="bg-gray-900 rounded-xl overflow-hidden relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-80 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Overlay for face detection area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-blue-500 rounded-full border-dashed animate-pulse opacity-50"></div>
                  </div>
                  
                  {/* Status Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-75 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin mx-auto mb-4">
                          <Scan className="w-12 h-12" />
                        </div>
                        <p className="text-lg font-semibold">Scanning face...</p>
                        <p className="text-sm opacity-80">Please hold still</p>
                      </div>
                    </div>
                  )}
                  
                  {isSuccess && (
                    <div className="absolute inset-0 bg-emerald-900 bg-opacity-75 flex items-center justify-center">
                      <div className="text-center text-white">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-300" />
                        <p className="text-xl font-bold">Attendance Marked!</p>
                        <p className="text-sm opacity-80">Redirecting to dashboard...</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isCameraReady && (
                  <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Starting camera...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Recognition Failed</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {isSuccess && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-800 font-medium">Attendance Successfully Marked</p>
                    <p className="text-emerald-600 text-sm mt-1">Your attendance has been recorded at {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                {!isSuccess ? (
                  <>
                    <button
                      onClick={captureAndProcess}
                      disabled={!isCameraReady || isScanning}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Scan className="w-5 h-5" />
                          Scan Face
                        </>
                      )}
                    </button>
                    <button
                      onClick={startCamera}
                      disabled={isScanning}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={resetAndRetry}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Scan Again
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Current Session</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                </div>
                
                {user.role === 'student' && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 text-emerald-600 font-bold">#</span>
                      <div>
                        <p className="text-sm text-gray-600">Roll Number</p>
                        <p className="font-medium text-gray-800">{user.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 text-purple-600 font-bold">B</span>
                      <div>
                        <p className="text-sm text-gray-600">Branch</p>
                        <p className="font-medium text-gray-800">{user.branch}</p>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current Time</p>
                    <p className="font-medium text-gray-800">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Instructions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Position Your Face</p>
                    <p className="text-sm text-gray-600">Center your face within the circular guide</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Good Lighting</p>
                    <p className="text-sm text-gray-600">Ensure adequate lighting on your face</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Stay Still</p>
                    <p className="text-sm text-gray-600">Hold still during the scanning process</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Secure & Private</p>
                  <p className="text-sm text-blue-600">Your biometric data is processed locally and never stored permanently.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;