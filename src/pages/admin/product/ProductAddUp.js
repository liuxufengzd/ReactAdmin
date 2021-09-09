import React, {useState} from 'react';
import {Card, Input, Form, InputNumber, Select} from 'antd';
import LinkButton from "../../../components/linkbutton/LinkButton";
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Item} = Form
const {Option} = Select

const ProductAddUp = props => {

    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');


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

    return (
        <Card title={<Title/>} style={{width: '96%', margin: '0 auto'}}>
            <Form name="basic" labelCol={{span: 2}} wrapperCol={{span: 8}} onFinish={() => {
            }} onFinishFailed={() => {
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
                <Item name='price' label="Price" rules={[{required: true, message: 'Please input price!'}]}>
                    <InputNumber addonAfter="$" defaultValue={0}/>
                </Item>
                <Item name='category' label="Category" rules={[{required: true}]}>
                    <Select placeholder="Select Category" onChange={() => {
                    }}>
                        <Option value="other">...</Option>
                    </Select>
                </Item>
            </Form>
        </Card>
    );
};

export default ProductAddUp;