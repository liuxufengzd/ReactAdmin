import React, {useEffect, useState} from 'react';
import {message} from "antd";
import {SERVER_URL} from "../../constant";
import axios from "axios";

const useWeather = initCode => {
    const [cityCode, setCityCode] = useState(initCode)
    const [weatherInfo, setWeather] = useState({})

    useEffect(() => {
        if (cityCode) {
            axios.get(`${SERVER_URL}/cities/${cityCode}`)
                .then(response => {
                    const {city, temp1, temp2, weather} = response.data
                    setWeather({city, temp1, temp2, weather})
                }).catch(reason => message.warn(reason))
        }
    }, [cityCode])

    return [weatherInfo, setCityCode]
};

export default useWeather;