import React, { Fragment, useState } from 'react';
import { Popconfirm, Button, Card } from 'antd';
import DpSearchGroup from '@/ToolkitComponent/DpSearchGroup';
import DpTable from '@/ToolkitComponent/DpTable';
import Modal from './components/Modal';
import api from '@/services/api';
import 'antd/dist/antd.css';

const DpSearchTable: React.FC = () => {
  const [searchParams, setSearchParams] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});

  // 搜索栏数据
  const fields = [
    { name: 'code', label: 'code' },
    { name: '名称', label: 'name' },
    {
      name: '状态',
      label: 'status',
      type: 'select',
      options: [
        { label: '禁用', value: '0' },
        { label: '启用', value: '1' },
      ],
    },
  ];

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
                onClick={() => onOperate(record)}
              >
                编辑
              </Button>
              <Popconfirm
                title="此操作将永久删除该项目, 是否继续?"
                okText="确定"
                cancelText="取消"
                onConfirm={async () => {
                  const res: any = await api.deleteLanguage({ id: record.id });
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

  // 查询
  const onSearch = (values: any) => {
    setSearchParams(values);
  };

  // 新增和编辑操作
  const onOperate = (record: any) => {
    setVisible(true);
    setCurrentRecord(record);
  };

  return (
    <Fragment>
      <DpSearchGroup fields={fields} onSearch={onSearch} />
      <Card style={{ marginTop: '20px' }}>
        <Button
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => onOperate({})}
        >
          新增
        </Button>
        <DpTable
          ownColumns={(updatefunc: any) => getColumn(updatefunc)}
          fetchAction={api.queryLanguage}
          fetchParams={{ lg: 'zh-cn' }}
          searchParams={searchParams}
        />
      </Card>
      <Modal
        visible={visible}
        currentRecord={currentRecord}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          setVisible(false);
          onSearch({ ...searchParams });
        }}
      />
    </Fragment>
  );
};

export default DpSearchTable;
