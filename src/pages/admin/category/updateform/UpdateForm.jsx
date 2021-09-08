import React, {useEffect} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types';

const {Item, useForm} = Form

const UpdateForm = props => {

    const [form] = useForm()

    useEffect(() => {
        console.log('set update form')
        props.setForm(form)
    }, [])

    return (
        <Form form={form}>
            <Item
                name="name"
                rules={[
                    {required: true, message: 'Please input a new name!'},
                    {max: 20, message: 'name should be smaller than 20 letters!'},
                ]}
            >
                <Input placeholder={props.initName}/>
            </Item>
        </Form>
    );
};

UpdateForm.propTypes = {
    initName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
}

export default UpdateForm;