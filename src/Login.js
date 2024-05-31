import React, { useState } from 'react';
import './CSS/Login.css'; // Import the CSS file
import Homework from './Homework'
import Student from './StudentApp'
const StudentComponent = () => {
  return <div>Welcome, Student!</div>;
};

const TeacherComponent = () => {
  return <div>Welcome, Teacher!</div>;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.toLowerCase() === 'student' && password.toLowerCase() === 'student') {
      setRole('student');
      setError('');
    } else if (username.toLowerCase() === 'teacher' && password.toLowerCase() === 'teacher') {
      setRole('teacher');
      setError('');
    } else {
      setError('Invalid credentials');
      setRole(null);
    }
  };

  if (role === 'student') {
    return <Student />;
  } else if (role === 'teacher') {
    return <Homework />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>This is a static Login page for rolebased redirection</p>
        <p>Teacher Login credentials-<span style={{color:'red'}}> teacher/teacher</span></p>
        <p>Student Login credentials- <span style={{color:'red'}}>student/student</span></p>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
