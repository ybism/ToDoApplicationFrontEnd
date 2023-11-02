import React from "react";
import { Space, Table, Tag, Divider, Card } from "antd";
// import { Divider, Radio, Table } from 'antd';
import "../styles/ToDoList.css";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },

  //   {
  //     title: 'Status',
  //     key: 'status',
  //     dataIndex: 'status',
  //     render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? 'geekblue' : 'green';
  //           if (tag === 'loser') {
  //             color = 'volcano';
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (record) => (
      <Space size="middle">
        <Tag color="green">{record}</Tag>
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    title: "title1",
    description: "description1",
    status: "Completed",
  },
  {
    key: "2",
    title: "title2",
    description: "description2",
    status: "In Progess",
  },
  {
    key: "3",
    title: "title3",
    description: "description3",
    status: "Completed",
  },
];
// const ToDoList = () => <Table columns={columns} dataSource={data} />;

const ToDoList = () => {
  return (
    <>
      <h3>Task List</h3>
      <Tag color="green">Completed - 02</Tag>
      <Tag color="blue">In Progess - 01</Tag>
      <Card className="card-container">
        <div>
          {/* <Divider /> */}

          <Table columns={columns} dataSource={data} size="small"/>
        </div>
      </Card>
    </>
  );
};

export default ToDoList;
