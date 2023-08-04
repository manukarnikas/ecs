import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserContext } from '../../App';
import axios from 'axios';
import './Login.css';

const Login = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [successAlert, setSuccessAlert] = useState({
        status: false,
        message: ''
    });
    const [failureAlert, setFailureAlert] = useState({
        status: false,
        message: ''
    });

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const userLogin = (userData)=>{
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${url}/user/login`,userData)
            .then(function (response) {
                setSuccessAlert({
                    status: true,
                    message: 'Login Successfull!'
                });
                setUser(response?.data);
                navigate('/boards');
            })
            .catch(function (error) {
                setFailureAlert({
                    status: true,
                    message: error.message
                });
                console.error(error);
            });
    }
  
    const onFinish = () => {
        if (!data.username) {
            setFailureAlert({
                status: true,
                message: 'Please Enter Username'
            });
            return;
        }
        if (!data.password) {
            setFailureAlert({
                status: true,
                message: 'Please Enter password'
            });
            return;
        }
        userLogin(data);
    }

    const setFormData = (key,value) => {
        const newData = { ...data };
        newData[key] = value;
        setData(newData);
    }
    
    const onSuccessClose = () => {
        setSuccessAlert({
            status: false,
            message: ''
        });
    }

    const onFailureClose = () => {
        setFailureAlert({
            status: false,
            message: ''
        })
    }

    return (
        <>
            {successAlert.status ?
                <Alert
                    message={successAlert.message}
                    type="success"
                    closable
                    onClose={() => onSuccessClose()}
                />
                : null}
            {failureAlert.status ?
                <Alert
                    message={failureAlert.message}
                    type="error"
                    closable
                    onClose={() => onFailureClose()}
                />
                : null}
            <br />
            <br />
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form
                name="signup"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} onChange={(e) => setFormData("username", e.target.value)} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setFormData("password", e.target.value)}
                    />
                </Form.Item>
            </Form>
            <div>
                <Button type="primary" onClick={()=> onFinish()} className="login-form-button">
                    Login
                </Button>
                Or <a onClick={() => navigate('/signup')}>Signup</a>
            </div>
        </>
    );
};


export default Login;