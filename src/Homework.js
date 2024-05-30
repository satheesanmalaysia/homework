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
import { useNavigate } from "react-router-dom";
import Model from "./AddHomework";
import EditModel from "./EditHomeWork";

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
      dataIndex: "id",
      render: (_, { id }) => (
        <>
          <Pop
            onClick={tableActionClick}
            options={
              <>
                <a id={id} onClick={viewStudentClick}>
                  View Student
                </a>{" "}
                <br></br>{" "}
                <a id={id} onClick={editClick}>
                  Edit
                </a>{" "}
                <br></br>{" "}
                <a id={id} style={{ color: "red" }} onClick={deleteClick}>
                  Delete
                </a>
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

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  function clicked() {
    console.log("onsearch");
  }
  function viewStudentClick(e) {
    console.log("View Studennt " + e.currentTarget.id);
    navigate("/viewstudent");
  }
  function editClick(e) {
    console.log("edit " + e.currentTarget.id);
    setIsModal1Open(true);
    setEdit(true);
    setSelectedId(e.currentTarget.id);
  }
  function deleteClick(e) {
    console.log("Delete " + e.currentTarget.id);
    const url = `https://homework-be.onrender.com/api/homeworks/${e.currentTarget.id}`;

    axios
      .delete(url)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
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
        profilePicSrc="35.50.m.jpg"
        profileName="Satheesan OP"
        ProfileRole="Teacher"
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
        <div className="addhomeworkContainer">
          <PrimaryButton
            title="Add Homework"
            onClick={openModal1}
          ></PrimaryButton>
        </div>
      </div>
      <Table data={filteredData} columns={columns}></Table>
      <Model isOpen={isModal1Open} onClose={closeModal1} />
      <EditModel
        isOpen={isEdit}
        onClose={closeModal1}
        selectedID={selectedID}
      />
    </div>
  );
}
export default FirstComponent;
