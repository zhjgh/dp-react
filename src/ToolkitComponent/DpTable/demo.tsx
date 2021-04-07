import React, { useState } from 'react';
import { Popconfirm, Button } from 'antd';
import DpTable from './index';
import api from '@/services/api';

const demo = () => {
  const [searchParams, setSearchParams] = useState({});

  // 表单列数据 updateMethod 刷新方法
  const getColumn = (updateMethod: any) => {
    return [
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '繁体名称',
        dataIndex: 'name2',
        key: 'name2',
      },
      {
        title: '英文名称',
        dataIndex: 'ename',
        key: 'ename',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => {
          return text === 0 ? '禁用' : '启用';
        },
      },
      {
        title: '操作',
        key: 'setting',
        width: 200,
        render: (text: any, record: any, index: any) => {
          return (
            <div>
              <Button
                type="primary"
                style={{ marginRight: '5px' }}
                // onClick={() => onOperate(record)}
              >
                编辑
              </Button>
              <Popconfirm
                title="此操作将永久删除该项目, 是否继续?"
                okText="确定"
                cancelText="取消"
                /* onConfirm={async () => {
                  const res = await api.deleteLanguage({ id: record.id });
                  if (res.state === '1') {
                    updateMethod();
                  }
                }} */
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  };

  return (
    <DpTable
      ownColumns={(updatefunc: any) => getColumn(updatefunc)}
      fetchAction={api.queryLanguage}
      fetchParams={{ lg: 'zh-cn' }}
      searchParams={searchParams}
    />
  );
};

export default demo;
