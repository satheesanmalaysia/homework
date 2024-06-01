// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Register.css'
import './CSS/Register.css';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student',
    country: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://homework-be.onrender.com/users/register', formData)
      .then(response => {
        alert('User Registred');
        console.log(response.data);
      })
      .catch(error => {
        if(error.response.data =='Username already exists'){
            alert('User already exist')
        } else{
        alert('Error occured')
        }
        console.error('There was an error!', error);
      });
  };

  function loginClicked(){
    navigate("/login");
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
        <button style={{marginTop:'10px'}}onClick={loginClicked} >Login</button>
      </form>
    </div>
  );
};

export default Register;
