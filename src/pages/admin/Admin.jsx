import React from 'react';
import memoryUtil from "../../utils/storageUtil";
import {Redirect} from 'react-router-dom'

const Admin = props => {

    function logout() {
        memoryUtil.removeUser()
        props.history.replace('/login')
    }

    const user = memoryUtil.getUser();
    if (!user.id) {
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <h2>backend manage system</h2>
            <div>Hello {user.username}</div>
            <button onClick={logout}>logout</button>
        </div>
    );
};

export default Admin;