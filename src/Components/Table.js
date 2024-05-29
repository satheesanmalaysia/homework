import React from "react";
import { Table, Tag, Space } from "antd";
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
        <Tag color="red" key={subject}>
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
    //dataIndex: 'num_of_submissions',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
];
const data = [
  {
    id: 1,
    title: "test",
    subject: "history",
    invited_date: "28/05/2024",
    due_date: "30/05/2024",
    num_of_submissions: "2/5",
    homework_document: "just a url",
  },
  {
    id: 2,
    title: "Science Homework",
    subject: "science",
    invited_date: "28/05/2024",
    due_date: "05/06/2024",
    num_of_submissions: "4/5",
    homework_document: "just a url",
  },
  {
    id: 3,
    title: "Maths Homework",
    subject: "mathemetics",
    invited_date: "28/05/2024",
    due_date: "05/06/2024",
    num_of_submissions: "2/5",
    homework_document: "just a url",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const App = () => (
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
