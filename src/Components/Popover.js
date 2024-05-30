import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag, Menu, Popover } from "antd";
import { useState, useEffect } from "react";
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
function App({ onClick }) {
  const [open, setOpen] = useState(false);
  const viewStudent = () => {
    console.log("hide");
    setOpen(false);
    onClick("viewStudent");
  };
  const edit = () => {
    console.log("edit");
    setOpen(false);
    onClick("Edit");
  };
  const deleteHomework = () => {
    console.log("delete");
    setOpen(false);
    onClick("delete");
  };
  const handleOpenChange = (newOpen) => {
    console.log("handleOpenChange");
    setOpen(newOpen);
  };
  return (
    <Popover
      titleMinWidth={500}
      content={
        <>
          <a onClick={viewStudent}>View Student</a> <br></br>{" "}
          <a onClick={edit}>Edit</a> <br></br>{" "}
          <a style={{ color: "red" }} onClick={deleteHomework}>
            Delete
          </a>
        </>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">
        <UnorderedListOutlined />
      </Button>
    </Popover>
  );
}

export default App;
