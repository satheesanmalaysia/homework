import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homework from './Homework'
import Studentslist from  './StudentsList'
import ViewStudent from './ViewStudent';
import Student from './StudentApp'
import Login from './Login';
import Register from './Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page1" element={<Studentslist />} />
        <Route path="/viewstudent" element={<ViewStudent />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Homework />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
