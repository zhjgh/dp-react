import React, { useState } from 'react';
import { Popconfirm, Button } from 'antd';
import DpTable from './index';
import * as api from '@/services/api';

const demo = () => {
  const [searchParams, setSearchParams] = useState({});

  // 表单列数据 updateMethod 刷新方法
  const getColumn = (updateMethod: any) => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: string) => {
          return <img src={text} width={60} height={60} />;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '出生日期',
        dataIndex: 'birthDate',
        key: 'birthDate',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text: any) => {
          return text === 0 ? '男' : '女';
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
                onClick={() => onOperate(record)}
              >
                编辑
              </Button>
              <Popconfirm
                title="此操作将永久删除该人, 是否继续?"
                okText="确定"
                cancelText="取消"
                onConfirm={async () => {
                  const res: any = await api.delItem({ id: record.id });
                  if (res.state === '1') {
                    updateMethod();
                  }
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  };

  // 新增和编辑操作
  const onOperate = (record: any) => {};

  return (
    <DpTable
      ownColumns={(updatefunc: any) => getColumn(updatefunc)}
      fetchAction={api.getList}
      fetchParams={{ lg: 'zh-cn' }}
      searchParams={searchParams}
    />
  );
};

export default demo;
