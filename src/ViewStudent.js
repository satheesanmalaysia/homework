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
import { CheckCircleTwoTone } from "@ant-design/icons";
import AddStudent from "./AddStudent";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

function ViewStudent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModal1Open, setIsModal1Open] = useState(false);
  const openModal1 = () => setIsModal1Open(true);
  const closeModal1 = () => {
    console.log("Close Model");
    setIsModal1Open(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Invited Date",
      dataIndex: "invited_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
      //   <CheckCircleTwoTone twoToneColor="#52c41a" />
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
              <label> {status}</label>
            </>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (_, { status, id }) => (
        <>
          <Pop
            onClick={tableActionClick}
            options={
              <>
                {status != "Completed" ? (
                  <>
                    <a id={id} onClick={sendInvitationClicked}>
                      Send Invitation
                    </a>{" "}
                    <br></br>{" "}
                    <a id={id} style={{ color: "red" }} onClick={deleteClick}>
                      Delete
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      id={id}
                      download
                      href="/sample.docx"
                      onClick={downloadClicked}
                    >
                      Download Homework
                    </a>{" "}
                  </>
                )}
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

  const filteredData = data.filter((item) => {
  
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
  );
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://homework-be.onrender.com/api/students"
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
  function sendInvitationClicked(e) {
    alert("Invitation Sent");
    console.log("sendInvitationClicked " + e.currentTarget.id);
  }

  function deleteClick(e) {
    console.log("Delete " + e.currentTarget.id);
    const url = `https://homework-be.onrender.com/api/students/${e.currentTarget.id}`;

    axios
      .delete(url)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Delete " + e.currentTarget.id);
  }
  function downloadClicked(e) {
    console.log("downloadClicked " + e.currentTarget.id);
    console.log(filteredData[e.currentTarget.id].download_url);
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
              placeholder="Search for name"
              onSearch={handleSearchChange}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <div className="addhomeworkContainer">
          <PrimaryButton
            title="Add Student"
            onClick={openModal1}
          ></PrimaryButton>
        </div>
      </div>
      <Table data={filteredData} columns={columns}></Table>
      <AddStudent isOpen={isModal1Open} onClose={closeModal1} />
    </div>
  );
}
export default ViewStudent;
