import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import PrivateRouter from "./routes/PrivateRoute";
import StudentView from "./pages/admin/StudentView";
import AddStudent from "./pages/admin/AddStudent";
import StudentLogin from "./pages/student/StudentLogin";
import AdminLayout from "./layout/AdminLayout";
import SubjectView from "./pages/admin/SubjectView";
import TeacherView from "./pages/admin/TeacherView";
import AddSubject from "./pages/admin/AddSubject";
import AddTeacher from "./pages/admin/AddTeacher";
import SetPassword from "./pages/SetPassword";
import Profile from "./pages/student/Profile";
import StudentLayout from "./layout/StudentLayout";
import TeacherLayout from "./layout/TeacherLayout";
import StudentProfile from "./pages/student/Profile";
import TeacherProfile from "./pages/teacher/Profile";
import ClassRoomView from "./pages/admin/ClassRoomView";
import ClassView from "./pages/admin/ClassView";
import AddClassRoom from "./pages/admin/AddClassRoom";
import AttendanceForm from "./pages/TakeAttendance";
import ViewAttendance from "./pages/ViewAttendance";
import StudentAttendance from "./pages/student/StudentViewAttendance";
import ResultForm from "./pages/teacher/Result";
import SyllabusList from "./pages/admin/SyllabusList";
import SyllabusView from "./pages/admin/SyllabusView";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/create-new-password/" element={<SetPassword />}></Route>
          <Route path="/student-login" element={<StudentLogin />} />

          {/* Admin Side */}
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-management" element={<ClassView />} />
            <Route path="/add-student" element={<AddStudent />} />

            <Route path="/teacher-management" element={<TeacherView />} />
            <Route path="/add-teacher" element={<AddTeacher />} />

            <Route path="/subject" element={<SubjectView />} />
            <Route path="/add-subject" element={<AddSubject />} />

            <Route path="/class" element={<ClassRoomView />} />
            <Route path="/add-classroom" element={<AddClassRoom />} />

            <Route path="/attendance" element={<ViewAttendance /> }/>

            <Route path="/syllabus" element={<SyllabusView />} />

            <Route path="/admin-profile" element={<Profile />} />

          </Route>

          {/* Student Side */}
          <Route element={<StudentLayout />}>
            <Route path="/student-dashboard" element={<StudentProfile />} />
            <Route path="/student-profile" element={<Profile />} />
            <Route path="/student-attendance" element={<StudentAttendance />} />
          </Route>

          {/* Teacher Side */}
          <Route element={<TeacherLayout />} >
          <Route path="/teacher-dashboard" element={<TeacherProfile />} />
          <Route path="/take-attendance" element={<AttendanceForm />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
          <Route path="/result" element={<ResultForm />} />
          </Route>

          <Route path="/" element={<PrivateRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

