import React, {useState, useEffect} from 'react';
import memo from "../../utils/memoryUtil";
import store from "../../utils/storageUtil";
import LinkButton from "../linkbutton/LinkButton";
import {message, Modal, Select} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {formatDate} from "../../utils/timeUtil";
import PubSub from 'pubsub-js'
import './Header.css'
import {TITLE_KEY} from "../../constant";
import {reqWeather} from "../../api/api";

const {Option} = Select;

const Header = props => {
    const cities = memo.cities;
    const [weatherInfo, setWeatherInfo] = useState({})
    const [time, setTime] = useState(0)
    const [title, setTitle] = useState('')
    const {weather, temp1, temp2, city} = weatherInfo

    useEffect(() => {
        selectWeather(cities[0].code)
        const timer = setInterval(() => {
            setTime(formatDate(Date.now()))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const token = PubSub.subscribe(TITLE_KEY, (_, data) => setTitle(data))
        return () => PubSub.unsubscribe(token)
    }, [title])

    async function selectWeather(code) {
        let res = await reqWeather(code);
        if (res) setWeatherInfo({...res})
        else message.warn('cannot get the weather information!')
    }

    function logout() {
        Modal.confirm({
            title: 'Are you sure to logout?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                store.removeUser()
                memo.user = {}
                props.history.replace('/login')
            }
        });
    }

    return (
        <div>
            <div className='header-badge'>
                <span>welcome, {memo.user.username}</span>
                <LinkButton onClick={logout}>Log out</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className="header-title">{title}</div>
                <div>{time}</div>
                <h3>{city} {temp1}℃-{temp2}℃ {weather}</h3>
                <Select defaultValue={cities[0].name || ''} style={{width: 100}}
                        onChange={value => selectWeather(value)}>
                    {cities.map(w => <Option key={w.code} value={w.code}>{w.name}</Option>)}
                </Select>
            </div>
        </div>
    );
};

export default Header;