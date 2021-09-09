import React, {lazy} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import './Product.css'

const ProductDetail = lazy(() => import('./ProductDetail'))
const ProductAddUp = lazy(() => import('./ProductAddUp'))
const ProductHome = lazy(() => import('./ProductHome'))

const Product = () => {
    return (
        <Switch>
            <Route path='/product' component={ProductHome} exact/>
            <Route path='/product/detail' component={ProductDetail}/>
            <Route path='/product/addupdate' component={ProductAddUp}/>
            <Redirect to='/product'/>
        </Switch>
    );
};

export default Product;