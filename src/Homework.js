import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import "./CSS/Homework.css";

import TopBar from "./Components/Topbar";
import PrimaryButton from "./Components/PrimaryButton";
import Table from "./Components/Table"
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const data = 
  [
        {
            "id": 1,
            "title": "test",
            "subject": "history",
            "invited_date": "28/05/2024",
            "due_date": "30/05/2024",
            "num_of_submissions": "2/5",
            "homework_document": "just a url"
        },
        {
            "id": 2,
            "title": "Science Homework",
            "subject": "science",
            "invited_date": "28/05/2024",
            "due_date": "05/06/2024",
            "num_of_submissions": "4/5",
            "homework_document": "just a url"
        },
        {
            "id": 3,
            "title": "Maths Homework",
            "subject": "mathemetics",
            "invited_date": "28/05/2024",
            "due_date": "05/06/2024",
            "num_of_submissions": "2/5",
            "homework_document": "just a url"
        }
    ] ;

function FirstComponent() {
  function clicked() {
    console.log("clicked");
  }
//   function onSearch() {
//     console.log("onsearch");
//   }
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="homework">
      <TopBar
        logoSrc="logo192.png"
        logoText="Teacher App"
        profilePicSrc="35.50.m.jpg"
        profileName="Satheesan OP"
        ProfileRole="Teacher"
      />
      <div className="container">
      <div className="searchcontainer">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </Space>
      </div>
      <div className="addhomeworkContainer">
        <PrimaryButton title = "Add Homework" onClick={clicked}></PrimaryButton>
      </div>
      </div>
      <Table></Table>
    </div>
  );
}
export default FirstComponent;
