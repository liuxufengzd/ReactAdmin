import React, {useState} from 'react';
import {Button, Card, Input, Form, InputNumber, Select, Cascader} from 'antd';
import LinkButton from "../../../components/linkbutton/LinkButton";
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Item} = Form
const {Option} = Select

const ProductAddUp = props => {

    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');

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

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        }]

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
                    <Cascader
                        placeholder="Select Category"
                        options={options}
                        onChange={()=>{}}
                    />
                </Item>
                <Item wrapperCol={{offset: 2}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Card>
    );
};

export default ProductAddUp;