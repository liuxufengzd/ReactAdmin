import React, {lazy,Suspense} from 'react';
import {Layout} from 'antd';
import memoryUtil from "../../utils/storageUtil";
import {Redirect, Route, Switch} from 'react-router-dom'
import Header from "../../components/header/Header";
import LeftNav from "../../components/left-nav/LeftNav";
const Home = lazy(() => import('./home/Home'))
const Category = lazy(() => import('./category/Category'))
const User = lazy(() => import('./user/User'))
const Role = lazy(() => import('./role/Role'))
const Product = lazy(() => import('./product/Product'))
const Bar = lazy(() => import('./charts/Bar'))
const Line = lazy(() => import('./charts/Line'))
const Pie = lazy(() => import('./charts/Pie'))

const {Footer, Sider, Content} = Layout;

const Admin = props => {
    const user = memoryUtil.getUser();

    return (
        !user.id ? <Redirect to='/login'/> :
            <Layout style={{height: '100%'}}>
                <Sider><LeftNav/></Sider>
                <Layout>
                    <Header {...props}/>
                    <Content style={{backgroundColor: 'white'}}>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Suspense>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cccccc'}}>
                        Please use Google Chrome to enjoy better</Footer>
                </Layout>
            </Layout>
    );
};

export default Admin;