import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { useState, useEffect } from "react";

import { Button, Flex } from "antd";

Modal.setAppElement("#root");
const modalStyles = {
  content: {
    height: "300px",
    width: "300px",
    margin: "auto", // Center the modal
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
};

const formStyle = {
  margin: "10px",
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
  const [email, seEmail] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => seEmail(e.target.value);

  const onSave = async () => {
    const data = {
      name: name,
      email: email,
      invited_date: "30/05/2024",
      status: "new",
      download_url: "https://via.placeholder.com/300",
    };
    console.log("save action here" + name);
    try {
      const response = await axios.post(
        "https://homework-be.onrender.com/api/students",
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
  };

  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add Student</h2>
      <form>
        <div style={formStyle}>
          <label style={margin}>Name: </label> <br />
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            style={margin}
          />
          <br />
          <label style={margin}>
            Email:
            <br />
            <input
              type="text"
              name="email"
              onChange={handleEmailChange}
              style={margin}
            />
          </label>
          <br />
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
          onClick={onClose}
        >
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalComponent1;
