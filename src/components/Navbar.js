import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Tag } from 'antd';
import { PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AddTaskList from './AddTaskList'
import ImageUpload from './ImageUpload'
import { GetStatusCounts } from '../services/TaskService'
import '../styles/Navbar.css';

const Navbar = () => {

  const [completedCount, setCompletedCount] = useState([0]);
  const [inProgressCount, setInProgressCount] = useState([0]);
  const [notInProgressCount, setNotInProgressCount] = useState([0]);
  const navigate = useNavigate();


  useEffect(() => {

    GetStatusCounts()
          .then((res) => {
            console.log('res', res)
            setCompletedCount(res.data.isComplete);
            setInProgressCount(res.data.inProgress);
            setNotInProgressCount(res.data.notInProgress);
          })
          .catch((error) => {
              console.log("error adding task: " + error.message);
              // alert(error);
          });

  }, []);

    const handleMainMenu = () => {
    navigate('/home');
    };
    // const handleProfileMenu = () => {
    //   navigate('/profile-upload');
    //   };
    
    const handleLogout = () => {
        navigate('/');
        localStorage.removeItem('signInUserId');
        };
    
    return (
      <Layout.Header className="navbar">

        <Menu
        
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="navbar-item"
        >
       
          <Menu.Item key="1" className="navbar-item" onClick={handleMainMenu}>
          To Do Application
          </Menu.Item>
          {/* <Menu.Item key="2" className="navbar-item ad-container" >
          <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: <Button onClick={handleMemory}><PlusOutlined /> 
                Add Memory</Button>,
              },
              {
                key: '2',
                label: <Button onClick={handleEvent}><PlusOutlined /> 
                Add Event</Button>,
              },
            ]}
          />
        }
        trigger={['click']}
      >
          
     
             </Dropdown>
             <PlusOutlined /> 
          </Menu.Item> */}
          {/* <Menu.Item key="2" className="navbar-item"> */}
          {/* <PlusOutlined />  */}
          {/* </Menu.Item> */}
          <AddTaskList/>
          <Menu.Item key="2" className="navbar-item profile-continer">
          <Tag color="purple">{'Not In Progess - ' + notInProgressCount}</Tag>
          <Tag color="blue">{'In Progess - ' + inProgressCount}</Tag>
          <Tag color="green">{'Completed - ' + completedCount}</Tag>
          </Menu.Item>

          <Menu.Item key="3" className="navbar-item ">
          {/* <UserOutlined /> Profile */}
          <ImageUpload/>
          </Menu.Item>
          <Menu.Item key="4" className="navbar-item" onClick={handleLogout}>
          <LogoutOutlined /> LogOut
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  };
  
  export default Navbar;