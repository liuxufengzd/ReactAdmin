import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Form, InputNumber, Cascader, message} from 'antd';
import LinkButton from "../../../components/linkbutton/LinkButton";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqAllCategory} from "../../../api/api";

const {Item} = Form

const ProductAddUp = props => {

    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');
    useEffect(getCategory, [])

    const [options, setOptions] = useState([])

    function handleSubmit(values) {
        console.log(values)
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

    async function getCategory() {
        let res = await reqAllCategory()
        if (res) {
            let opts = res.filter(e => e.parentId === 0).map(e => ({value: e.id, label: e.name}))
            opts.forEach(p => p.children = res.filter(e => e.parentId === p.value).map(e => ({
                value: e.id,
                label: e.name
            })))
            setOptions(opts)
        } else message.warn('failed to get category data!')
    }

    return (
        <Card title={<Title/>} style={{width: '96%', margin: '0 auto'}}>
            <Form name="basic" labelCol={{span: 3}} wrapperCol={{span: 8}} onFinish={values => handleSubmit(values)}
                  onFinishFailed={() => {
                  }}>
                <Item label="Name" name="name"
                      rules={[{required: true, message: 'Please input product name!'},
                          {max: 20, message: 'name cannot be larger than 20 characters!'}]}>
                    <Input/>
                </Item>
                <Item name='description' label="Description"
                      rules={[{required: true, message: 'Please input description!'}]}>
                    <Input.TextArea/>
                </Item>
                <Item name='price' label="Price" rules={[
                    {required: true, message: 'Please input price!'},
                    {
                        validator: (_, value) =>
                            value * 1 < 0 ? Promise.reject('price cannot be negative!') : Promise.resolve()
                    }]}>
                    <InputNumber addonafter="$"/>
                </Item>
                <Item name='category' label="Category" rules={[{required: true}]}>
                    <Cascader placeholder="Select Category" options={options}/>
                </Item>
                <Item wrapperCol={{offset: 2}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Card>
    );
};

export default ProductAddUp;