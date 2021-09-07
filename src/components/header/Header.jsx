import React from 'react';
import memoryUtil from "../../utils/storageUtil";
import LinkButton from "../link-button/LinkButton";
import {Modal, Select} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import store from "../../utils/storageUtil";
import useWeather from "../common-hooks/useWeather";

const {Option} = Select;

const Header = props => {
    const user = memoryUtil.getUser()
    const cities = store.cities;
    const [weatherInfo, setCityCode] = useWeather(cities[0].code)

    function logout() {
        Modal.confirm({
            title: 'Are you sure to logout?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                memoryUtil.removeUser()
                props.history.replace('/login')
            }
        });
    }

    return (
        <div className='header'>
            <span>welcome, {user.username}</span>
            <LinkButton onClick={logout}>logout</LinkButton>
            <div className='header-weather'>
                <h3>{weatherInfo.city||''}</h3>
                <Select defaultValue={cities[0].name||''} style={{width: 80}} onChange={value => setCityCode(value)}>
                    {cities.map(w => <Option key={w.code} value={w.code}>{w.name}</Option>)}
                </Select>
            </div>
        </div>
    );
};

export default Header;