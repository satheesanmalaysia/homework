import React, { useState, useEffect } from 'react';
import './CSS/Login.css'; // Import the CSS file
import Homework from './Homework'
import Student from './StudentApp'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Making this call to initiate the render server , first call on render server will be very slow.
const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://homework-be.onrender.com/api/homeworks"
    );
   console.log(response);
  } catch (error) {
    console.error("Error fetching the data", error);
  }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = () => {
    navigate("/register");
    console.log('register clicked ');
  };
  
  const fetchLogin = async () => {
    const data = {
      username:username,
      password:password
    }
    try {
      const response = await axios.post(
        "https://homework-be.onrender.com/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
console.log(response);
      if (response.data) {
     //   console.log(response.data && response.data.users && response.data.users.role && response.data.users.role);
        if (response.data.role === 'student') {
          navigate("/student");
        } else  {
          navigate("/teacher");
        }
      }
    } catch (error) {
      setError('Error - Please check your username and password');
      console.error("Error:", error);
    }
  };



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
            onChange={(e) => { 
              setUsername(e.target.value);
              setError(null)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>{ 
              setPassword(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div>
          <button type="submit" style={{backgroundColor:'#4CAF50',margin:'10px'}} onClick={fetchLogin}>Login</button>
          <button type="submit" style={{backgroundColor:'#4CAF50'}} onClick={handleRegister}>Register</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
