import React from "react";
import { Table, Tag, Space } from "antd";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const App = ({ data, columns }) => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{
      target: "sorter-icon",
    }}
  />
);
export default App;
