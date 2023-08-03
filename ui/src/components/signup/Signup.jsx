import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload, Modal, Alert } from 'antd';
import { UserOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Signup.css';

const Signup = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmpassword: '',
        thumbnailData: ''
    });
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [successAlert, setSuccessAlert] = useState({
        status: false,
        message: ''
    });
    const [failureAlert, setFailureAlert] = useState({
        status: false,
        message: ''
    });

    const navigate = useNavigate();

    const createUser = (userData) => {
        const url = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${url}/user/signup`,userData)
            .then(function (response) {
                setSuccessAlert({
                    status: true,
                    message: 'User Created Successfully!'
                });
                navigate('/');
            })
            .catch(function (error) {
                setFailureAlert({
                    status: true,
                    message: error.message
                });
                console.error(error);
            });
    };

    const onFinish = () => {
        console.log('filelist',fileList)
        if (!data.username) {
            setFailureAlert({
                status: true,
                message: 'Please Enter Username'
            });
            return;
        }
        if (!data.password || !data.confirmpassword || data.password !== data.confirmpassword) {
            setFailureAlert({
                status: true,
                message: 'Please Enter password. Passwords must match'
            });
            return;
        }
        if (!fileList?.length) {
            setFailureAlert({
                status: true,
                message: 'Please upload file'
            });
            return;
        }
        const userData = {
            username: data.username,
            password: data.password,
            thumbnailData: fileList?.[0]?.thumbUrl
        }
        createUser(userData);
    }

    const setFormData = (key,value) => {
        const newData = { ...data };
        newData[key] = value;
        setData(newData);
    }

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleCancel = () => setPreviewOpen(false);

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
            <br/>
            <br/>
            <h2 style={{ textAlign: 'center' }}>Sign-Up</h2>
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
                    <Input prefix={<UserOutlined />} onChange={(e) => setFormData("username",e.target.value)} placeholder="Username" />
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
                        onChange={(e) => setFormData("password",e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirmpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please re-enter your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Re-enter password"
                        onChange={(e) => setFormData("confirmpassword",e.target.value)}
                    />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center' }}>
                <Upload
                    action={() => ({ file, onSuccess }) => {
                        setTimeout(() => {
                            onSuccess("ok");
                        }, 0);
                    }}
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button onClick={() => onFinish()} type="primary" className="singup-form-button">
                    Sign Up
                </Button>
            </div>
        </>
    );
};


export default Signup;