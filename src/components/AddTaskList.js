import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Radio } from "antd";
import { CreateOneTaskList } from '../services/TaskListService'
import "../styles/AddToDo.css";

const AddTaskList = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const onFinish = (values) => {
    const userId = localStorage.getItem('signInUserId');
    // console.log("Success:", values);
    const reqBody = {
      title: values.title
  };

    CreateOneTaskList(reqBody, userId)
    .then((res) => {
      // window.location.reload(true);
      console.log("login sucess")
      // alert("login sucess");
      setOpen(false);
      window.location.reload(true);
    })
    .catch((error) => {
      console.log("error adding task: " + error.message);
      alert(error.message);
    });
  };

  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" className="btn-container" onClick={showModal}>
        Add Task List
      </Button>

      <Modal
        title="Add Task List"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <p>{modalText}</p> */}

        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tilte"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 14,
              span: 16,
            }}
          >
            <Button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTaskList;
