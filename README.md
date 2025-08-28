# 📷 FaceTrack: Smart Face Recognition Attendance System  

Welcome to **FaceTrack**, a real-time **Face Recognition Attendance Management System** built using the **MERN stack** with a **Python microservice** for accurate face detection.  
This project is designed for **college attendance automation** with role-based access for Admins, Faculty, and Students.  

---

## 🚀 Features  

### 👩‍💼 Admin / Faculty  
- 🔐 Secure login with JWT authentication  
- 👨‍🎓 Add & manage student records  
- 📸 Capture & upload face data  
- 🧠 Train recognition model (Python + OpenCV)  
- 📅 View & edit attendance records  
- 📊 Generate downloadable reports  

### 👨‍🎓 Student  
- 🔐 Secure login  
- 🕘 Mark **Time In / Time Out** using face recognition  
- 📈 View personal attendance history  

---

## 🛠️ Tech Stack  

| 💻 Frontend | ⚙️ Backend | 🧠 Face Recognition | 🗄️ Database |  
|-------------|------------|----------------------|--------------|  
| React.js + TailwindCSS | Node.js + Express.js | Python, OpenCV, face_recognition | MongoDB Atlas |  

---

## 🖥️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/<your-username>/face-recognition-attendance-system.git
cd face-recognition-attendance-system
2️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


🌐 App runs at: http://localhost:5173

3️⃣ Backend Setup (Node.js + Express)
cd backend
npm install
npm run dev


🛠️ API runs at: http://localhost:5000

4️⃣ Face Recognition Microservice (Python + OpenCV)
cd face-service
python -m venv venv
venv\Scripts\activate   # Windows  
source venv/bin/activate  # macOS/Linux  
pip install -r requirements.txt
python app.py

🗂️ Dataset Structure
dataset/
├── Student1/
│   ├── img1.jpg
│   ├── img2.jpg
├── Student2/
│   ├── img1.jpg
│   └── img2.jpg


📸 Each folder represents one student’s face data.

📊 Reporting Dashboard

📆 Attendance by date / student

📈 Weekly & monthly charts

📂 Export reports as .CSV

🎯 Project Goals

✅ Real-time MERN + AI integration

✅ Role-based system (Admin, Faculty, Student)

✅ Automated attendance using face recognition

✅ Professional dashboard with TailwindCSS
