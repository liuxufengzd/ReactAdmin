import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Input, Form, InputNumber, Cascader, message} from 'antd';
import LinkButton from "../../../components/linkbutton/LinkButton";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqCategory} from "../../../api/api";
import PictureWall from "./PictureWall";

const {Item} = Form

const ProductAddUp = props => {
    const [options, setOptions] = useState([])
    const picRef = useRef()
    const product = props.location.state || {}
    const isUpdate = !!props.location.state

    useEffect(async () => {
        let res = await reqCategory(0)
        if (res) {
            let opts = res.map(e => ({value: e.id, label: e.name, isLeaf: e.isLeaf}))
            if (isUpdate && product.secondId) {
                let children = await reqCategory(product.firstId)
                opts.map(e => {
                    if (e.value === product.firstId)
                        e.children = children.map(e => ({value: e.id, label: e.name, isLeaf: true}))
                    return e
                })
            }
            setOptions(opts)
        } else message.warn('failed to get category data!')
    }, [])

    function handleSubmit(values) {
        // 获取所有已上传图片文件名的数组,只有class组件可以使用ref直接定位
        const imgs = picRef.current.getImgs()
        const data = {...values, imgs}
        // 如果是更新, 需要添加_id
        if(isUpdate) data.id = product.id
        console.log(data)
        // 2. 调用接口请求函数去添加/更新
        // const result = await reqAddOrUpdateProduct(product)
        // 3. 根据结果提示
        // if (result.status===0) {
            message.success(`${isUpdate ? '更新' : '添加'}商品成功!`)
            props.history.goBack()
        // } else {
        //     message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        // }
    }

    const Title = () => {
        return (
            <span>
                <LinkButton onClick={() => props.history.goBack()}>
                    <ArrowLeftOutlined style={{color: 'green', fontSize: 20}}/>
                </LinkButton>
                <span style={{marginLeft: 10, fontSize: 20}}>Add Product</span>
            </span>
        )
    }

    // loadData可以实现实时加载多级列表
    async function getCategory(sel) {
        if (sel.children) return
        sel.loading = true
        let res = await reqCategory(sel.value)
        if (res) {
            if (res.length === 0) sel.children = []
            sel.loading = false
            sel.children = res.map(e => ({value: e.id, label: e.name, isLeaf: true}))
            setOptions([...options])
        }
    }

    return (
        <Card title={<Title/>} style={{width: '96%', margin: '0 auto'}}>
            <Form name="basic" labelCol={{span: 3}} wrapperCol={{span: 8}} onFinish={values => handleSubmit(values)}
                  onFinishFailed={() => {
                  }}>
                <Item label="Name" name="name" initialValue={product.name}
                      rules={[{required: true, message: 'Please input product name!'},
                          {max: 20, message: 'name cannot be larger than 20 characters!'}]}>
                    <Input/>
                </Item>
                <Item name='description' label="Description" initialValue={product.desc}
                      rules={[{required: true, message: 'Please input description!'}]}>
                    <Input.TextArea/>
                </Item>
                <Item name='price' label="Price" initialValue={product.price} rules={[
                    {required: true, message: 'Please input price!'},
                    {
                        validator: (_, value) =>
                            value * 1 < 0 ? Promise.reject('price cannot be negative!') : Promise.resolve()
                    }]}>
                    <InputNumber addonafter="$"/>
                </Item>
                <Item name='category' label="Category" rules={[{required: true}]}
                      initialValue={[product.firstId, product.secondId]}>
                    <Cascader placeholder="Select Category" options={options}
                              loadData={sel => getCategory(sel[sel.length - 1])}/>
                </Item>
                <Item><PictureWall ref={picRef}/></Item>
                <Item wrapperCol={{offset: 2}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Card>
    );
};

export default ProductAddUp;