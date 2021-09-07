import React from 'react';
import logo from "./img/logo.png";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {
    GiftFilled, HddFilled, HomeFilled, LineChartOutlined,
    MehFilled, UserOutlined, AreaChartOutlined, BarChartOutlined, PieChartOutlined
} from "@ant-design/icons";
import './LeftNav.css'

const {Item, SubMenu} = Menu

const LeftNav = () => {

    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={logo} alt='logo'/>
                <h1>React System</h1>
            </Link>
            <Menu theme='dark' onClick={handleClick} defaultSelectedKeys={['1']}
                  selectedKeys={[]}
                  mode="inline">
                <Item key="1" icon={<HomeFilled/>}>
                    <Link to='/home'>Home</Link>
                </Item>
                <Item key="2" icon={<HddFilled/>}>
                    <Link to='/category'>Category</Link>
                </Item>
                <Item key="3" icon={<GiftFilled/>}>
                    <Link to='/product'>Product</Link>
                </Item>
                <Item key="4" icon={<MehFilled/>}>
                    <Link to='/role'>Role</Link>
                </Item>
                <Item key="5" icon={<UserOutlined/>}>
                    <Link to='/user'>User</Link>
                </Item>
                <SubMenu key="sub1" title="Charts" icon={<AreaChartOutlined/>}>
                    <Item key="6" icon={<BarChartOutlined/>}>
                        <Link to='/charts/bar'>bar</Link>
                    </Item>
                    <Item key="7" icon={<LineChartOutlined/>}>
                        <Link to='/charts/line'>line</Link>
                    </Item>
                    <Item key="8" icon={<PieChartOutlined/>}>
                        <Link to='/charts/pie'>pie</Link>
                    </Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default LeftNav;