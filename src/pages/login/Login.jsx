import React from 'react';
import {Form, Input, Button, message} from 'antd';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './Login.css'
import logo from './img/logo.png'
import {SERVER_URL} from "../../constant";
import memoryUtil from "../../utils/storageUtil";

const Login = props => {

    const onFinish = values => {
        const {username, password} = values;
        axios.get(`${SERVER_URL}/login`, {params: {username, password}})
            .then(response => {
                const user = response.data[0] || {}
                if (user.username) {
                    message.success(`${user.username} welcome!`)
                    memoryUtil.saveUser(user)
                    props.history.replace('/')
                } else message.error('username or password is incorrect!')
            })
            .catch(reason => console.error(reason))
    };

    if (memoryUtil.getUser().id) return <Redirect to='/'/>

    return (
        <div id='login'>
            <div className='header'>
                <img src={logo} alt={logo}/>
                <h1>React System</h1>
            </div>
            <div className='body'>
                <h1>User Login</h1>
                <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={onFinish}>
                    <Form.Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Username"/>
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[
                                   {required: true, message: 'Please input your Password!'},
                                   {min: 4, message: 'password should be larger than 4 letters!'},
                                   {max: 12, message: 'password should be smaller than 12 letters!'},
                                   {
                                       pattern: /^[a-zA-Z0-9_]+$/,
                                       message: 'password can only contain digit, letter ane _!'
                                   }
                               ]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                               placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;