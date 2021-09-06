import React, {lazy, Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
const Login = lazy(()=>import('./pages/login/Login'))
const Admin = lazy(()=>import('./pages/admin/Admin'))

const App = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </Suspense>
        </>
    );
};

export default App;