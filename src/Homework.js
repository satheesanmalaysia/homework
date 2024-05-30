import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag } from "antd";
import "./CSS/Homework.css";
import axios from "axios";

import TopBar from "./Components/Topbar";

import PrimaryButton from "./Components/PrimaryButton";
import Table from "./Components/Table";
import Pop from "./Components/Popover";
import { UnorderedListOutlined } from "@ant-design/icons";

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
      filters: [
        {
          text: "history",
          value: "history",
        },
        {
          text: "science",
          value: "science",
        },
        {
          text: "mathemetics",
          value: "mathemetics",
        },
      ],
      onFilter: (value, record) => record.subject.indexOf(value) === 0,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
    },
    {
      title: "Number of Submission",
      dataIndex: "num_of_submissions",
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      render: (_, { subject }) => (
        <>
          <Pop onClick={tableActionClick}></Pop>
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

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
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

    fetchData();
  }, []);
  function clicked() {
    console.log("onsearch");
  }
  function tableActionClick(e) {
    console.log("table action click " + e);
  }

  //const onSearch = (value, _e, info) => console.log(info?.source, value);
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
              onSearch={handleSearchChange}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <div className="addhomeworkContainer">
          <PrimaryButton title="Add Homework" onClick={clicked}></PrimaryButton>
        </div>
      </div>
      <Table data={filteredData} columns={columns}></Table>
    </div>
  );
}
export default FirstComponent;
