import React from "react";
import Modal from "react-modal";

import Upload from "./Components/Upload";
import Picker from "./Components/DatePicker";
import DropDown from "./Components/DropDown";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CSS/Homework.css";
import { Button, Flex } from "antd";

Modal.setAppElement("#root");
const modalStyles = {
  content: {
    height: "500px",
    width: "500px",
    margin: "auto", // Center the modal
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: "5",
    
  },
};

const formStyle = {
  margin: "10px",
  zIndex: "5",
  position: 'relative',
  color:'black'
  
};
const margin = {
  margin: "8px",
};

const option = {
  margin: "8px",
  height: "21px",
  width: "170px",
};

const button_margin = {
  margin: "auto", // Center the modal
  padding: "20px",
  display: "flex",
  justifyContent: "space-around",
};

const ModalComponent1 = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [subject, seSubject] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const handleNameChange = (e) => {
    setErrors({});
    setName(e.target.value);
  };
  const handleSubjectChange = (e) => seSubject(e.target.value);

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const validateInputs = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!subject) errors.subject = "Subject is required";
    if (!date) errors.date = "Date is required";
    return errors;
  };
  const onSave = async () => {
    console.log("Post call");
    const data = {
      title: name,
      subject: subject,
      invited_date: "30/05/2024",
      due_date: date,
      num_of_submissions: "2/20",
      homework_document: "https://via.placeholder.com/300",
    };
    console.log("save action here" + name + subject + date);
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      alert("Feilds are required");
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "https://homework-be.onrender.com/api/homeworks",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        if (response.data) {
          console.log("save done");
          onClose();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  function onCloseClicked() {
    console.log("Close ");
    seSubject("");
    setName("");
    setDate("");
    onClose();
    setErrors({});
  }
  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add HomeWork</h2>
      <form>
        <div style={formStyle}>
          <label style={margin}>Title: </label> <br />
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            style={margin}
          />
          <br />
          {errors.name && (
            <p style={{ color: "red", margin: "8px" }}>{errors.name}</p>
          )}
          <label style={margin}>
            Subject:
            <br />
            <select style={option} onChange={handleSubjectChange}>
              <option value="" disabled>
                Select an option
              </option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="mathemetics">Mathemetics</option>
            </select>
            {errors.subject && (
              <p style={{ color: "red", margin: "8px" }}>{errors.subject}</p>
            )}
          </label>
          <br />
          <label style={margin}>Upload Homework Document </label> <br />
          <div style={margin}>
            <Upload></Upload>
          </div>
          <label style={margin}>Due Date </label> <br />
          <div style={margin}>
            <Picker onClick={onDateChange}></Picker>
            {errors.name && <p style={{ color: "red" }}>{errors.date}</p>}
          </div>
        </div>
      </form>
      <Flex style={button_margin} gap="small" wrap>
        <Button style={margin} type="primary" onClick={onSave}>
          Save
        </Button>
        <Button
          type="primary"
          style={margin}
          className="addhomeworkContainer"
          onClick={onCloseClicked}
        >
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalComponent1;
