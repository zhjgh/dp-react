import React, { Fragment, useRef, useState } from 'react';
import { Popconfirm, Button, Card, Modal } from 'antd';
import DpSearchGroup from '@/ToolkitComponent/DpSearchGroup';
import DpTable from '@/ToolkitComponent/DpTable';
import * as api from '@/services/api';
import 'antd/dist/antd.css';

const DpSearchTable: React.FC = () => {
  const [searchParams, setSearchParams] = useState({});
  const [currentRecord, setCurrentRecord] = useState({});
  const [visible, setVisible] = useState(false);
  const isCleanRef = useRef(false);

  // 搜索栏数据
  const fields = [
    { label: 'ID', name: 'id' },
    { label: '姓名', name: 'name' },
    {
      label: '性别',
      name: 'sex',
      type: 'select',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
      ],
    },
    {
      label: '出生范围',
      name: 'birthDate',
      type: 'rangePicker',
    },
  ];

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

  // 查询
  const onSearch = (values: any) => {
    isCleanRef.current = false;
    setSearchParams(values);
  };

  // 新增和编辑操作
  const onOperate = (record: any) => {
    setVisible(true);
    setCurrentRecord(record);
  };

  return (
    <Fragment>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
      <Modal
        width={1000}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          isCleanRef.current = true;
        }}
        onOk={() => {
          setVisible(false);
          isCleanRef.current = true;
        }}
      >
        <DpSearchGroup
          fields={fields}
          onSearch={onSearch}
          isClean={isCleanRef.current}
        />
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
            fetchAction={api.getList}
            fetchParams={{ lg: 'zh-cn' }}
            searchParams={searchParams}
          />
        </Card>
      </Modal>
    </Fragment>
  );
};

export default DpSearchTable;
