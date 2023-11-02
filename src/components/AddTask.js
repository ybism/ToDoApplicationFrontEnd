import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Radio, DatePicker } from "antd";
import { CreateOneTask } from '../services/TaskService'
import "../styles/AddToDo.css";

const AddTask = (props) => {

  const [open, setOpen] = useState(false);
  const [inProgressStatus, setInProgressStatus] = useState(false);
  const [isCompleteStatus, setIsCompleteStatus] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const options = ['completed', 'started'];

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    if(checkedValues.includes('completed')) {
      setIsCompleteStatus(true);
    } else if(checkedValues.includes('started')) {
      setInProgressStatus(true);
    }
  };

  const onFinish = (values) => {
    const userId = localStorage.getItem('signInUserId');

    // if(values.status === 'completed') {
    //   setIsCompleteStatus(true);
    // } else {
    //   setInProgressStatus(true);
    // }

    // console.log("Success:", values);
    const reqBody = {
      title: values.title,
      description: values.description,
      inProgress: inProgressStatus,
      isComplete: isCompleteStatus,
      dueDate: values.dueDate
    };



  CreateOneTask(reqBody, userId, props.taskListId)
    .then((res) => {
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
        Add Task
      </Button>

      <Modal
        title="Add Task"
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
            label="Title"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            
            <Input />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="dueDate"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            
          >
            {/* <Radio.Group>
              <Radio value="completed"> Completed </Radio>
              <Radio value="started"> Started </Radio>
            </Radio.Group> */}
             <Checkbox.Group options={options} onChange={onChange} />
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
export default AddTask;

