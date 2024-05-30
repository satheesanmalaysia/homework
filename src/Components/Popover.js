import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag, Menu, Popover } from "antd";
import { useState, useEffect } from "react";
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
function App({ onClick ,options }) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    console.log("handleOpenChange");
    setOpen(newOpen);
  };
  return (
    <Popover
      titleMinWidth={500}
      content={
        options
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
