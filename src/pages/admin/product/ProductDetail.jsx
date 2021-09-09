import React, {useEffect, useState} from 'react';
import {List} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import LinkButton from "../../../components/linkbutton/LinkButton";
import {SERVER_URL} from "../../../constant";
import {reqProductCategory} from "../../../api/api";

const {Item} = List

const ProductDetail = props => {
    const [category, setCategory] = useState({firstCat: '', secondCat: ''})
    const {product} = props.location.state
    let {name, price, desc, imgs = [''], firstId = '', secondId = ''} = product
    useEffect(async () => {
        // 同时发送多个逻辑互斥的异步请求
        let res = await Promise.all([reqProductCategory(firstId), reqProductCategory(secondId)])
        setCategory({firstCat: res[0].name, secondCat: res[1].name})
    }, [])

    const Title = () => {
        return (
            <span>
                <LinkButton onClick={() => props.history.goBack()}>
                    <ArrowLeftOutlined style={{color: 'green', fontSize: 20}}/>
                </LinkButton>
                <span style={{marginLeft: 10, fontSize: 20}}>Product Detail</span>
            </span>
        )
    }

    return (
        <List header={<Title/>} bordered>
            <Item>
                <span className='detail-item-title'>Name:</span>
                <span>{name}</span>
            </Item>
            <Item>
                <span className='detail-item-title'>Description:</span>
                <span>{desc}</span>
            </Item>
            <Item>
                <span className='detail-item-title'>Price:</span>
                <span>{price}￥</span>
            </Item>
            <Item>
                <span className='detail-item-title'>Category:</span>
                <span>{category.firstCat}{category.secondCat ? ` -> ${category.secondCat}` : ''}</span>
            </Item>
            <Item>
                <span className='detail-item-title'>Picture:</span>
                <div>
                    {imgs.map(img => <img key={img} src={SERVER_URL + img} className='detail-img' alt="img"/>)}
                </div>
            </Item>
        </List>
    );
};

export default ProductDetail;