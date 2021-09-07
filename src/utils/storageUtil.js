//浏览器缓存数据的工具对象,比如刷新浏览器保持登录
import {USER_KEY} from "../constant";

const store = {
    saveUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    removeUser() {
        localStorage.removeItem(USER_KEY)
    },
    cities: [
        {
            code:'1',
            name:'北京'
        },
        {
            code:'2',
            name:'成都'
        }
    ]
}

export default store