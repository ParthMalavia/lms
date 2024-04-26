import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardPage from './pages/student/dashboard';
import AccountPage from './pages/student//account';
import CoursesPage from './pages/student//courses';
import CourseHomepage from './pages/student//coursehomepage';
import Test from './pages/student/test';
import AdminDashboardPage from './pages/admin//admindashboard';
import FacultyDashnboard from './pages/faculty/facultydashboard';
import AddAssignment from './pages/faculty/facultyassignment';
import AddGrades from './pages/faculty/facultygrades';
import Sample from './pages/student/sample';
import AddAnnouncement from './pages/faculty/faculyannouncement';
import AssignCourse from './pages/admin/assigncourse';
import StudnetList from './pages/admin/students';
import { AuthProvider } from './context/AuthContext';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#75CA67"
      },
      secondary: {
        main: "#999999"
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 575,
        md: 767,
        lg: 991,
        xl: 1199,
      }
    },
    spacing: 8,
    typography: {
      fontFamily: [
        'Fira Sans', 'sans-serif',
      ].join(','),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="courses" element={<CoursesPage />}></Route>
          <Route path="account" element={<AccountPage />}></Route>
          <Route path="courseshome" element={<CourseHomepage />}></Route>
          {/* TODO: change path test to something meanign full */}
          {/* add param in url as this endpoing is related to specific course detailation */}
          {/* ex: <Route path="/inbox/:userId" element={<Inbox />} /> */}
          <Route path="test" element={<Test />}></Route>
          <Route path="admin_dashboard" element={<AdminDashboardPage />}></Route>
          <Route path="faculty_dashboard" element={<FacultyDashnboard />}></Route>
          <Route path="faculty_assignment" element={<AddAssignment />}></Route>
          <Route path="faculty_announcement" element={<AddAnnouncement />}></Route>
          <Route path="faculty_grades" element={<AddGrades />}></Route>
          <Route path="assign_course" element={<AssignCourse />}></Route>
          <Route path="student_list" element={<StudnetList />}></Route>
          <Route path="sample" element={<Sample />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
