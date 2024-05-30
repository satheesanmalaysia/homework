import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      //message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const App = () => (
  <Dragger style={{ width: "170px", height: "30px" }} {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined style={{ width: "50px", height: "30px" }} />
    </p>
    <p className="ant-upload-hint">Upload</p>
  </Dragger>
);
export default App;
