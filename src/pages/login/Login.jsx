import React from 'react';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './Login.css'
import logo from './img/logo.png'

const Login = () => {
    const onFinish = values => {
        message.success('success!')
        // message.error('falied')
        
    };

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
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[
                                   {required: true, message: 'Please input your Password!'},
                                   {min:4, message: 'password should be larger than 4 letters!'},
                                   {max:12, message: 'password should be smaller than 12 letters!'},
                                   {pattern: /^[a-zA-Z0-9_]+$/, message:'password can only contain digit, letter ane _!'}
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