import axios from "axios";
import {message} from "antd";
import {SERVER_URL} from "../constant";
import {nanoid} from 'nanoid'
import PropTypes from "prop-types";

const ajax = (url, data = {}, method = 'GET') => {
    console.log(data, url, method)
    return new Promise(resolve => {
        method = method.toLowerCase();
        let promise;
        switch (method) {
            case 'get':
                promise = axios.get(url, {params: data});
                break;
            case 'post':
                promise = axios.post(url, data)
                break;
            case 'put':
                promise = axios.put(url, data)
                break;
            case 'delete':
                promise = axios.delete(url)
                break;
            default:
                message.error(`${method} is not supported!`)
        }
        promise.then(res => resolve(res.data))
            .catch(reason => message.error(reason))
    })
}

ajax.prototype = {
    url: PropTypes.string.isRequired,
    data: PropTypes.object,
    method: PropTypes.string
}

export const reqWeather = code => ajax(`${SERVER_URL}/cities/${code}`)

export const reqLogin = (username, password) => ajax(`${SERVER_URL}/login`, {username, password})

export const reqCategory = parentId => ajax(`${SERVER_URL}/category`, {parentId})

export const reqAllCategory = () => ajax(`${SERVER_URL}/category`)

export const reqProductCategory = id => ajax(`${SERVER_URL}/category/${id}`)

export const reqUpdateCategory = (id, name, parentId) =>
    ajax(`${SERVER_URL}/category/${id}`, {name, parentId, id}, 'put')

export const reqAddCategory = (parentId, name) => ajax(`${SERVER_URL}/category`, {parentId, name, id: nanoid()}, 'post')

export const reqDelCategory = id => ajax(`${SERVER_URL}/category/${id}`, null, 'delete')

export const reqProductByPage = (pageNum, pageSize) => ajax(`${SERVER_URL}/product`, {pageSize, pageNum})

export const reqSearchProduct = (searchInput, searchType) => ajax(`${SERVER_URL}/product`, {[searchType]: searchInput})

export const reqUpdateStatus = record => ajax(`${SERVER_URL}/product/${record.id}`, {...record}, 'put')

