import { DatePicker, Checkbox, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../styles/AddToDo.css';
import dayjs from 'dayjs';

const EditTask = ({ taskData, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({ ...taskData });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setEditedTask({ ...taskData });
  }, [taskData]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    const apiUrl = `https://localhost:7166/User/EditTaskForUser/${editedTask.userId}/${editedTask.id}`;
    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => {
        if (response.status === 200) {
          handleCancel();
          onUpdate(editedTask);
        } else if (!response.ok) {
          throw new Error('Failed to update the task');
        }
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <>
      <Button type="primary" className="btn-container" onClick={showModal}>
        Edit Task
      </Button>

      <Modal
        title="Edit Task"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Update Task
          </Button>,
        ]}
      >
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <DatePicker
            value={editedTask.dueDate ? dayjs(editedTask.dueDate) : null}
            onChange={(date, dateString) =>
              setEditedTask((prevTask) => ({
                ...prevTask,
                dueDate: dateString,
              }))
            }
          />
        </div>
        <div>
          <label>Status:</label>
          <Checkbox.Group
            options={['In Progress', 'Completed']}
            value={editedTask.status}
            onChange={(values) =>
              setEditedTask((prevTask) => ({
                ...prevTask,
                status: values,
              }))
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default EditTask;