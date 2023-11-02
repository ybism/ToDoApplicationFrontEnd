// import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { userLogin } from '../services/UserService'
// import axios from 'axios';
// import { GoogleOutlined } from '@ant-design/icons';
import '../styles/SignIn.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // const [data, setData] = useState([]);
  const navigate = useNavigate();

  // const onFinish = (values) => {
  //   // navigate('/');
  //   console.log('Received values of form: ', values);

  //   const reqBody = {
  //     userName: values.username,
  //     password: values.password 
  //   }

  //   axios.post(`http://localhost:8081/api/mn/user/login`, reqBody).then((response) => {
  //     alert(response);
  //     setLocalStorage(response.userId);
  //     navigate('/');
  // }).catch(error => {
  //   alert(error);
  // })
  // };

    const onFinish = (values) => {
      userLogin(values.email, values.password)
      .then((res) => {
        // setLocalStorage(res.userId);
        // window.location.reload(true);
        console.log('res.userId', res.userId);
 
        localStorage.setItem('signInUserId', res.userId);       
        navigate('/home');        

        console.log("login sucess")

        // alert("login sucess");
      })
      .catch((error) => {
        console.log("error adding task: " + error.message);
        // alert(error.message);
      });


  };

// const setLocalStorage = (data) => {
//   localStorage.setItem('id', JSON.stringify(data));
// }

  return (
    <Form className="login-form" onFinish={onFinish}>
        <h2>To Do Application</h2>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" href="">
          Forgot password
        </Link>
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
      {/* <Form.Item>
        <Button type="primary" htmlType="submit" onClick={signInWithGoogle}>
        <GoogleOutlined />Continue with Google
        </Button>
      </Form.Item> */}
      Or <Link to={'/sign-up'}>register now!</Link>
    </Form>
  );
}

export default SignIn;