import React from 'react';
import Modal from 'react-modal';

import Upload from "./Components/Upload";
import Picker from "./Components/DatePicker";
import DropDown from "./Components/DropDown"
import axios from "axios";
import { useState, useEffect } from "react";

import { Button, Flex } from 'antd';

Modal.setAppElement('#root');
const modalStyles = {
    content: {
      height: '500px',
      width: '400px',
      margin: 'auto',  // Center the modal
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'flex-start',
     
    }
  };

  const formStyle= {
margin:'10px',
  };
  const margin= {
    margin:'8px',
      };

      const option= {
        margin:'8px',
       height:'21px',
       width:'170px'
          };

      const button_margin= {
        margin: 'auto',  // Center the modal
        padding: '20px',
        display: 'flex',
        justifyContent:'space-around',
          };


const ModalComponent1 = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [subject, seSubject] = useState('');
  const [date, setDate] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleSubjectChange = (e) => seSubject(e.target.value);

    const onDateChange = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);
      };

    
      const onSave = async () => {
        const data = {
          title: name,
          subject: subject,
          invited_date: "30/05/2024",
          due_date: date,
          num_of_submissions: "2/20",
          homework_document: "https://via.placeholder.com/300"
        };
        console.log('save action here'+name+subject+date);
        try {
          const response = await axios.post('https://homework-be.onrender.com/api/homeworks', data, {
            headers: {
              'Content-Type': 'application/json',
              'Accept':'*/*'
              
            }
          });
         

    if(response.data){
      console.log('save done');
      onClose();
    }
         
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <Modal style = {modalStyles}isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add HomeWork</h2>
      <form>
        <div  style={formStyle}>
        <label  style={margin} >
          Title: </label>  <br />
          <input type="text" name="name"  onChange={handleNameChange} style={margin}/>
        
        <br />
        <label style={margin}>
          Subject:
          <br/>
          <select style={option} value={subject} onChange={handleSubjectChange}>
            <option value="" disabled>Select an option</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="mathemetics">Mathemetics</option>
          </select>
        </label>
       <br/>
       <label style={margin}>
          Upload Homework Document </label> <br />
          <div style={margin}>
       <Upload ></Upload>
       </div>

       <label style={margin}>
          Due Date </label> <br />
          <div style={margin}>
       <Picker onClick={onDateChange} ></Picker>
       </div>
       </div>
      </form>
      <Flex style={button_margin} gap="small" wrap>

    <Button style={margin} type="primary" onClick={onSave}>Save</Button>
    <Button type="primary"  style={margin} className="addhomeworkContainer" onClick={onClose} >Close</Button>
    </Flex>
    
    </Modal>
  );
};

export default ModalComponent1;
