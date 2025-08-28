📷 FaceTrack: Smart Face Recognition Attendance System

Welcome to FaceTrack, a real-time Face Recognition Attendance Management System built using the MERN stack with OpenCV + face-recognition (Python microservice) for accurate detection.
It provides a secure and automated way to mark attendance, designed especially for college/classroom environments.

🚀 Features
👩‍💼 Admin / Faculty

🔐 Secure login with JWT authentication

👨‍🎓 Add and manage student records

📸 Capture & upload face data

🧠 Train recognition model via Python microservice

📅 View & edit attendance records

📊 Generate downloadable reports

👨‍🎓 Student

🔐 Secure login

🕘 Mark Time In / Time Out using face recognition

📈 View personal attendance history

🛠️ Tech Stack
💻 Frontend	⚙️ Backend	🧠 Face Recognition	🗄️ Database
React.js + TailwindCSS	Node.js + Express.js	Python, OpenCV, face_recognition	MongoDB Atlas
🖥️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/face-recognition-attendance-system.git
cd face-recognition-attendance-system

2️⃣ Frontend Setup (React)
cd frontend
npm install
npm run dev


🌐 Runs at: http://localhost:5173 (Vite)

3️⃣ Backend Setup (Node.js + Express)
cd backend
npm install
npm run dev


🛠️ Backend API runs at: http://localhost:5000

4️⃣ Face Recognition Microservice (Python)
cd face-service
python -m venv venv
venv\Scripts\activate   # (use source venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
python app.py


🔁 This service handles face detection, encoding, and verification.

🗂️ Folder Structure for Face Data
dataset/
├── Student1/
│   ├── img1.jpg
│   ├── img2.jpg
├── Student2/
│   ├── img1.jpg
│   └── img2.jpg


📸 Each folder = one student’s data.

📊 Reporting Dashboard

📆 Attendance by date / student

📈 Weekly & monthly charts

📂 Export reports as .CSV

🎯 Goals & Scope

✅ Real-time MERN + AI integration
✅ Student, Faculty & Admin roles
✅ Scalable for colleges & organizations
✅ Professional UI with TailwindCSS
