import React from 'react';
import logo from "./img/logo.png";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import PubSub from 'pubsub-js'
import {
    GiftFilled, HddFilled, HomeFilled, LineChartOutlined,
    MehFilled, UserOutlined, AreaChartOutlined, BarChartOutlined, PieChartOutlined
} from "@ant-design/icons";
import './LeftNav.css'
import {TITLE_KEY} from "../../constant";

const {Item, SubMenu} = Menu

const LeftNav = () => {
    const handleClick = e => {
        PubSub.publish(TITLE_KEY, e.key)
    };

    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={logo} alt='logo'/>
                <h1>React System</h1>
            </Link>
            <Menu theme='dark' onClick={handleClick} defaultSelectedKeys={['1']} mode="inline">
                <Item key="HOME" icon={<HomeFilled/>}>
                    <Link to='/home'>Home</Link>
                </Item>
                <SubMenu key="sub1" title="Product" icon={<GiftFilled/>}>
                    <Item key="CATEGORY" icon={<HddFilled/>}>
                        <Link to='/category'>Category</Link>
                    </Item>
                    <Item key="PRODUCT" icon={<GiftFilled/>}>
                        <Link to='/product'>Product</Link>
                    </Item>
                </SubMenu>
                <Item key="ROLE" icon={<MehFilled/>}>
                    <Link to='/role'>Role</Link>
                </Item>
                <Item key="USER" icon={<UserOutlined/>}>
                    <Link to='/user'>User</Link>
                </Item>
                <SubMenu key="sub2" title="Charts" icon={<AreaChartOutlined/>}>
                    <Item key="BAR" icon={<BarChartOutlined/>}>
                        <Link to='/charts/bar'>bar</Link>
                    </Item>
                    <Item key="LINE" icon={<LineChartOutlined/>}>
                        <Link to='/charts/line'>line</Link>
                    </Item>
                    <Item key="PIE" icon={<PieChartOutlined/>}>
                        <Link to='/charts/pie'>pie</Link>
                    </Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default LeftNav;