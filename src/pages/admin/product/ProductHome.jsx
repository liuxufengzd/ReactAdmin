import React, {useEffect, useState} from 'react';
import LinkButton from "../../../components/linkbutton/LinkButton";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Card, Input, message, Select, Space, Table} from "antd";
import {reqProductByPage, reqSearchProduct, reqUpdateStatus} from "../../../api/api";
import {PAGE_SIZE} from "../../../constant";

const {Option} = Select;
const {Column} = Table

const ProductHome = props => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [searchMode, setSearchMode] = useState(false)
    const [searchType, setSearchType] = useState('name')
    const [searchInput, setSearchInput] = useState('')
    let tempInput = ''

    useEffect(() => {
        getProduct(pageNum)
    }, [searchInput, pageNum])

    // 大量数据情况下通过分页来请求部分数据
    async function getProduct() {
        setLoading(true)
        let res = searchMode ? await reqSearchProduct(searchInput, searchType)
            : await reqProductByPage(pageNum, PAGE_SIZE)
        if (res && res[0]) {
            setData(res[0].data)
            setTotal(searchMode ? res[0].length : res[0].total)
        } else {
            setData([])
            setTotal(0)
        }
        setLoading(false)
    }

    async function handleChange(record) {
        let res = await reqUpdateStatus({...record, status: record.status === 0 ? 1 : 0})
        if (res) getProduct()
        else message.error('failed to update status!')
    }

    const Title = () => {
        return (
            <div>
                <Select style={{width: 180, margin: '0 15px'}} value={searchType}
                        onChange={value => setSearchType(value)}>
                    <Option value="name">search by name</Option>
                    <Option value="desc">search by description</Option>
                </Select>
                <Input placeholder='key word' style={{width: 150, marginRight: 15}}
                       onChange={e => tempInput = e.target.value}/>
                <Button onClick={() => {
                    setSearchMode(tempInput.length !== 0)
                    setSearchInput(tempInput)
                }} type="primary">Search</Button>
            </div>
        )
    }

    return (
        <Card title={<Title/>}
              extra={<Button onClick={() => props.history.push('/product/addupdate')} icon={<PlusOutlined/>} type="primary">Add</Button>}
              style={{width: '100%'}}>
            <Table dataSource={data} bordered rowKey='id'
                   pagination={{
                       defaultPageSize: PAGE_SIZE,
                       showQuickJumper: true,
                       total,
                       onChange: pageNum => setPageNum(pageNum)
                   }}
                   loading={loading}
            >
                <Column title="Name" dataIndex="name" width={150}/>
                <Column title="Description" dataIndex="desc"/>
                <Column title="Price" dataIndex="price" width={100} render={price => `￥${price}`}/>
                <Column title="Status" dataIndex="status" width={200} render={(status, record) => {
                    return (
                        <div>
                            <Button onClick={() => handleChange(record)} type="primary">
                                {status === 0 ? 'upload' : 'download'}
                            </Button>&nbsp;
                            <span>{status === 0 ? 'offline' : 'online'}</span>
                        </div>
                    )
                }}/>
                <Column
                    title="Action"
                    key="action"
                    width={100}
                    render={rowData => (
                        <Space size="middle">
                            <LinkButton onClick={() => props.history.push('/product/detail', {product: rowData})}
                                        style={{color: '#00BFFF'}}>detail</LinkButton>
                            <LinkButton onClick={() => {
                            }} style={{color: '#00BFFF'}}>modify</LinkButton>
                        </Space>
                    )}
                />
            </Table>
        </Card>
    );
};

export default ProductHome;