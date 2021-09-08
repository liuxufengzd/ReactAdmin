import ReactDOM from 'react-dom'
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import store from "./utils/storageUtil";
import memo from "./utils/memoryUtil";

// 刷新不丢失用户登录信息
memo.user = store.getUser()

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'))