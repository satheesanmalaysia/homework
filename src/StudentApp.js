import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag } from "antd";
import "./CSS/Homework.css";
import axios from "axios";

import TopBar from "./Components/Topbar";

import Table from "./Components/Table";
import Pop from "./Components/Popover";

import { useNavigate } from "react-router-dom";

import { CheckCircleTwoTone } from "@ant-design/icons";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

//   const data = [
//     {
//       id: 1,
//       title: "test",
//       subject: "history",
//       invited_date: "28/05/2024",
//       due_date: "30/05/2024",
//       num_of_submissions: "2/5",
//       homework_document: "just a url",
//     },
//     {
//       id: 2,
//       title: "Science Homework",
//       subject: "science",
//       invited_date: "28/05/2024",
//       due_date: "05/06/2024",
//       num_of_submissions: "4/5",
//       homework_document: "just a url",
//     },
//     {
//       id: 3,
//       title: "Maths Homework",
//       subject: "mathemetics",
//       invited_date: "28/05/2024",
//       due_date: "05/06/2024",
//       num_of_submissions: "2/5",
//       homework_document: "just a url",
//     },
//   ];

function FirstComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [selectedID, setSelectedId] = useState("");
  const navigate = useNavigate();
  const openModal1 = () => setIsModal1Open(true);
  const closeModal1 = () => {
    console.log("Close Model");
    setIsModal1Open(false);
    setEdit(false);
    setSelectedId("");
  };
  const closeModal2 = () => {
    console.log("Close Model");
    setIsModal1Open(false);
    setEdit(false);
    setSelectedId("");
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (_, { subject }) => (
        <>
          <Tag color={getColor(subject)} key={subject}>
            {subject.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
      render: (_, { status, id }) => (
        <>
          {status == "Completed" ? (
            <>
              <CheckCircleTwoTone twoToneColor="green" />
              <label style={{ color: "green" }}> {status}</label>
            </>
          ) : status == "open" ? (
            <>
              <CheckCircleTwoTone twoToneColor="blue" />
              <label> {status}</label>
            </>
          ) : (
            <>
              <CheckCircleTwoTone twoToneColor="grey" />
              <label> invited</label>
            </>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (_, { id }) => (
        <>
          <Pop
            onClick={tableActionClick}
            options={
              <>
                <a id={id} onClick={submitClick}>
                 Submit File
                </a>{" "}
                <br></br>{" "}
                <a id={id}   download
                      href="/sample.docx" onClick={downloadClick}>
                 Download Homework
                </a>{" "}
              </>
            }
          ></Pop>
        </>
      ),

      //dataIndex: 'num_of_submissions',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
  ];
  const getColor = (subject) => {
    let color;
    if (subject == "science") {
      color = "red";
    } else if (subject == "history") {
      color = "green";
    } else {
      color = "blue";
    }
    return color;
  };
  const handleSearchChange = (value, _e, info) => {
    setSearchTerm(value);
  };

//   const filteredData = data.filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://homework-be.onrender.com/api/homeworks"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isModal1Open]);
  function submitClick(e) {
    console.log("View Studennt " + e.currentTarget.id);
    alert('Submitting Homework');
   
  }
  function downloadClick(e) {
    console.log("Download " + e.currentTarget.id);
  }
  function tableActionClick() {
    console.log("Table Action Clicked");
  }

  //const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="homework">
      <TopBar
        logoSrc="logo192.png"
        logoText="Teacher App"
        profilePicSrc="student.png"
        profileName="Student 1"
        ProfileRole="Student"
      />
      <div className="container">
        <div className="searchcontainer">
          <Space direction="vertical">
            <Search
              placeholder="Search for title"
              onSearch={handleSearchChange}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
       
      </div>
      <Table data={data} columns={columns}></Table>
    </div>
  );
}
export default FirstComponent;
