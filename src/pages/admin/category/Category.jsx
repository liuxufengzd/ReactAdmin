import React, {useState, useEffect} from 'react';
import {Card, Button, Table, Space, message, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons"
import {reqAddCategory, reqCategory, reqDelCategory, reqUpdateCategory} from "../../../api/api";
import LinkButton from "../../../components/linkbutton/LinkButton";
import {ArrowRightOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import AddForm from "./addform/AddForm";
import UpdateForm from "./updateform/UpdateForm";

const {Column} = Table;
let reFetch = false
let add_form
let update_form

const Category = () => {
    // 页面跳转后数据才会被清除
    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [parentInfo, setParentInfo] = useState({parentId: 0, name: '', id: ''})
    const [addVisible, setAddVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const {parentId, name, id} = parentInfo

    useEffect(() => {
        if ((parentId === 0 && firstData[0])
            || (parentId !== 0 && secondData[0] && !reFetch)) return
        getCategory(parentId)
        reFetch = false
    }, [parentInfo])

    async function getCategory(parentId) {
        setLoading(true)
        let res = await reqCategory(parentId)
        if (res) {
            if (parentId === 0) setFirstData(res)
            else setSecondData(res)
        } else message.warn('cannot read the category information!')
        setLoading(false)
    }

    function goNext(value) {
        return () => {
            reFetch = name !== value.name
            setParentInfo({parentId: value.id, name: value.name, id: ''})
        }
    }

    function goBack() {
        setParentInfo({parentId: 0, name, id: ''})
    }

    function handleAdd() {
        if (add_form.getFieldError('name')[0]) return
        // 触发表单验证
        add_form.validateFields().then(
            async values => {
                let res = await reqAddCategory(values.parentId, values.name)
                if (res) {
                    reFetch = true;
                    await getCategory(values.parentId)
                } else message.error('add failed!')
                add_form.resetFields()
                setAddVisible(false)
            }
        )
    }

    function handleUpdate() {
        update_form.validateFields().then(
            async values => {
                let res = await reqUpdateCategory(id, values.name, parentId)
                if (res) {
                    reFetch = true;
                    await getCategory(parentId)
                } else message.error('update failed!')
                update_form.resetFields()
                setUpdateVisible(false)
            }
        )
    }

    function confirmDel(value) {
        Modal.confirm({
            title: 'Are you sure to delete?',
            icon: <ExclamationCircleOutlined/>,
            onOk: async () => {
                let res = await reqDelCategory(value.id)
                if (res) {
                    if (value.parentId === 0)
                        reFetch = true;
                    await getCategory(parentId)
                } else message.error('delete failed!')
            }
        });
    }

    function showUpdate(value) {
        setUpdateVisible(true)
        setParentInfo({parentId: value.parentId, name: value.name, id: value.id})
    }

    return (
        <Card title={parentId === 0 ? 'first class' :
            (
                <span>
                        <LinkButton onClick={goBack}>first class</LinkButton>
                        <ArrowRightOutlined/>
                        <span style={{marginLeft: 5}}>{name}</span>
                    </span>
            )}
              extra={<Button onClick={() => setAddVisible(true)}
                             icon={<PlusOutlined/>} type="primary">Add</Button>}
              style={{width: '100%'}}>
            <Table dataSource={parentId === 0 ? firstData : secondData} bordered rowKey='id'
                   pagination={{defaultPageSize: 5, showQuickJumper: true}}
                   loading={loading}
            >
                <Column title="Name" dataIndex="name" width={900}/>
                <Column
                    title="Action"
                    key="action"
                    render={rowData => (
                        <Space size="middle">
                            <LinkButton onClick={() => showUpdate(rowData)}
                                        style={{color: '#00BFFF'}}>modify</LinkButton>
                            {parentId === 0 ? <LinkButton onClick={goNext(rowData)}
                                                          style={{color: '#00BFFF'}}>children</LinkButton> : null}
                            <LinkButton style={{color: 'red'}}
                                        onClick={() => confirmDel(rowData)}>del</LinkButton>
                        </Space>
                    )}
                />
            </Table>
            <Modal title="Update Category" visible={updateVisible} onOk={handleUpdate}
                   onCancel={() => setUpdateVisible(false)}>
                <UpdateForm initName={name} setForm={form => update_form = form}/>
            </Modal>
            <Modal title="Add Category" visible={addVisible} onOk={handleAdd}
                   onCancel={() => setAddVisible(false)}>
                <AddForm category={firstData} setForm={form => add_form = form}/>
            </Modal>
        </Card>
    );
};

export default Category;