import React, { useEffect, useState } from 'react';
import { Card, Space, Button } from 'antd';
import { Col, Row, Tooltip } from 'antd';
import { GetAllUserTaskLists } from '../services/TaskListService';
import { GetAllUserTasks } from '../services/TaskService';
import { useNavigate } from 'react-router-dom';
import AddTask from './AddTask';
import '../styles/TaskListCard.css';
import EditTask from './EditTask';

const TaskListCard = () => {
  const [taskListData, setTaskListData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleShowTask = (task) => {
    console.log('task', task);
  };

  
  const handleDeleteTask = (taskId) => {
    const userId = localStorage.getItem('signInUserId');
    const apiUrl = `https://localhost:7166/User/RemoveTaskForUser/${userId}/${taskId}`;

    if (window.confirm("Are you sure you want to delete this task?")) {
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error deleting task: " + error.message);
      });
  }};

  const handleEditTask = (task) => {
    setEditTaskData(task); 
    setIsEditTaskModalOpen(true); 
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTaskData((prevTaskData) => {
      return prevTaskData.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });

    handleCloseEditTaskModal();
  };

  useEffect(() => {
    GetAllUserTaskLists()
      .then((res) => {
        setTaskListData(res.data.$values);
        console.log('taskListData', res.data.$values);
      })
      .catch((error) => {
        console.log('error adding task: ' + error.message);
      });

    GetAllUserTasks()
      .then((res) => {
        setTaskData(res.data.$values);
        console.log('taskData', res.data.$values);
      })
      .catch((error) => {
        console.log('error adding task: ' + error.message);
      });
  }, []);

  return (
    <Space direction="horizontal" size={24}>
      <Row gutter={16}>
        {taskListData.map((taskListItem, index) => (
          <Col className="gutter-row col-container" span={8} key={index}>
            <Card
              className="card-container"
              size="small"
              title={'Title: ' + taskListItem.title}
              extra={<AddTask taskListId={taskListItem.id} />}
              style={{
                width: 400,
              }}
            >
              {taskData.map((taskItem, index) => {
                if (taskListItem.id === taskItem.taskListId) {
                  return (
                    <div key={taskItem.id}>
                      <Tooltip
                        title={
                          'Title:' +
                          taskItem.title +
                          ' | ' +
                          'Description: ' +
                          taskItem.description +
                          ' | ' +
                          'Due Date: ' +
                          taskItem.dueDate +
                          ' | ' +
                          'In Progress: ' +
                          taskItem.inProgress +
                          ' | ' +
                          'Is Complete: ' +
                          taskItem.isComplete
                        }
                      >
                        <div className='display-buttons'>
                          <Button
                            type='primary'
                            className='btn-container'
                            onClick={() => handleDeleteTask(taskItem.id)}
                          >
                            Delete
                          </Button>
                          <a onClick={() => handleEditTask(taskItem)} key={taskItem.id}>
                            {taskItem.title} <br />
                          </a>
                          <EditTask
                            taskData={editTaskData}
                            onClose={handleCloseEditTaskModal}
                            onUpdate={handleUpdateTask}
                          />
                        </div>
                      </Tooltip>
                    </div>
                  );
                }
              })}
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
}
export default TaskListCard;