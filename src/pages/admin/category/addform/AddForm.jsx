import React, {useEffect} from 'react';
import {Form, Select, Input} from "antd";
import PropTypes from 'prop-types';

const {Option} = Select
const {Item, useForm} = Form

const AddForm = props => {
    const [form] = useForm()

    useEffect(() => {
        console.log('set add form')
        props.setForm(form)
    },[])

    return (
        <Form form={form} initialValues={{parentId: 0}}>
            <div style={{marginBottom: 10, fontWeight: 'bolder'}}>Parent:</div>
            <Item name="parentId">
                <Select allowClear style={{width: '100%', marginBottom: 40}}>
                    <Option value={0}>First Class</Option>
                    {props.category.map(e => <Option key={e.id} value={e.id}>{e.name}</Option>)}
                </Select>
            </Item>
            <div style={{marginBottom: 10, fontWeight: 'bolder'}}>Name:</div>
            <Item
                name="name" rules={[{required: true, message: 'Please input a new name!'},
                {max: 20, message: 'name should be smaller than 20 letters!'}]}>
                <Input/>
            </Item>
        </Form>
    );
};

AddForm.prototype = {
    category: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
}

export default AddForm;