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



function ViewStudent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (_, { status , id }) => (
        <>
          <Pop
            onClick={tableActionClick}
            options={<>
                {status == 'new' ? (
              <>
               
                <a id={id} onClick={sendInvitationClicked}>
                 Send Invitation
                </a>{" "}
                <br></br>{" "}
                <a id={id} style={{ color: "red" }} onClick={deleteClick}>
                  Delete
                </a>
              </>) : (
              <>
               
              <a id={id} onClick={downloadClicked}>
              Download Homework
              </a>{" "}
            </>)
                }
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
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

    fetchData();
  }, []);
  function clicked() {
    console.log("onsearch");
  }
  function sendInvitationClicked(e) {
    alert('Invitation Sent');
    console.log("sendInvitationClicked " + e.currentTarget.id);
  }

  function deleteClick(e) {
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
          <PrimaryButton title="Add Student" onClick={clicked}></PrimaryButton>
        </div>
      </div>
      <Table data={filteredData} columns={columns}></Table>
    </div>
  );
}
export default ViewStudent;
