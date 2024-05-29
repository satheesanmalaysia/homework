import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homework from './Homework'
import Studentslist from  './StudentsList'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homework />} />
        <Route path="/page1" element={<Studentslist />} />
        {/* <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
