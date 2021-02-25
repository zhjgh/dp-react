import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SearchGroup, Table } from '../.'
import { Popconfirm, Button, Card } from 'antd'
import Layout from './layout'
import Mock from 'mockjs'
import axios from 'axios'

Mock.mock('/api/getList', 'get', {
  msg: '成功',
  state: 1,
  total: 100,
  'list|100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
    },
  ],
})

const API = {
  http_getProjectList: async function(req){
    console.log('req', req)
    return new Promise((resolve, reject) => {
      axios.get('/api/getList').then(result => {
        // console.log(result)
        resolve(result.data)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

const App = () => {
  const [searchParams, setSearchParams] = React.useState()
  // 搜索栏数据
  const fields = [
    { name: '姓名1', label: 'name1' },
    { name: '姓名2', label: 'name2' },
    { name: '姓名3', label: 'name3' },
    { name: '姓名4', label: 'name4' },
    {
      name: '性别',
      label: 'type',
      type: 'select',
      options: [
        { label: '男', value: '0' },
        { label: '女', value: '1' },
      ],
    },
    { name: '日期', label: 'date', type: 'datePicker' },
    {
      name: '日期范围',
      label: ['messageDateBegin', 'messageDateEnd'],
      type: 'rangePicker',
    },
  ]
  // 表单列数据 updateMethod 刷新方法
  const getColumn = updateMethod => {
    return [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address",
      },
      {
        title: '操作',
        key: 'setting',
        width: 200,
        render: (text: any, record: any, index: number) => {
          return (
            <div>
              <Button type="primary" style={{ marginRight: '5px' }}>查看</Button>
              <Popconfirm
                title="此操作将永久删除该项目, 是否继续?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  updateMethod()
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ];
  }
  // 查询
  const onSearch = (values) => {
    setSearchParams(values)
  }

  return (
    <Layout>
      <SearchGroup fields={fields} onSearch={onSearch} extraParams={{ otherParams: '其他参数值' }} />
      <Card style={{ marginTop: '10px' }}>
        <Table
          owncolumns={updatefunc => getColumn(updatefunc)}
          queryAction={API.http_getProjectList}
          baseProps={{ rowKey: record => record.id }}
          params={searchParams}
        />
      </Card>
    </Layout>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
