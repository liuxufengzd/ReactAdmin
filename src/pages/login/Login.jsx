import React from 'react';
import {Form, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './Login.css'
import logo from './img/logo.png'
import store from "../../utils/storageUtil";
import memo from "../../utils/memoryUtil";
import {reqLogin} from "../../api/api";
/*
* async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
* */
const Login = props => {

    const onFinish = async values => {
        const {username, password} = values;
        const user = (await reqLogin(username, password))[0]
        if (user) {
            message.success(`${user.username} welcome!`)
            store.saveUser(user)
            memo.user = user
            props.history.replace('/')
        } else message.error('username or password is incorrect!')
    };

    if (memo.user.id) return <Redirect to='/'/>

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