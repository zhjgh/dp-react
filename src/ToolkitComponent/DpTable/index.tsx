// @ts-nocheck
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import lang from '@/locales';

function emptyString(obj: any) {
  const newObj = {};
  for (const key in obj) {
    // @ts-ignore
    _.trim(obj[key]) === ''
      ? (newObj[key] = undefined)
      : (newObj[key] = obj[key]);
  }
  return newObj;
}

export interface IDpTableProps {
  ownColumns(updatefunc: any): {}; // 必填，表格列配置回调方法
  fetchAction(params: any): {}; // 必填，异步请求方法
  searchParams: object; // 搜索项参数
  fetchParams?: object; // 请求附加参数
  baseProps?: any; // antd Table基础配置，默认rowKey是id
  pageSize?: number;
}

const DpTable: React.FC<IDpTableProps> = props => {
  const {
    ownColumns,
    fetchAction,
    fetchParams,
    baseProps,
    searchParams,
    pageSize,
  } = props;
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const currentRef = useRef(1);
  const pageSizeRef = useRef(pageSize || 10);

  // useCallback包装请求，缓存依赖，优化组件性能
  const fetchDataWarp = useCallback(fetchData, [searchParams]);

  // 异步请求数据
  async function fetchData() {
    setLoading(true);
    const params = emptyString({ ...searchParams, ...fetchParams });
    console.log(
      `current: ${currentRef.current}, pageSize: ${pageSizeRef.current}`,
    );
    console.log('params', params);
    // @ts-ignore
    const res = await fetchAction({
      current: currentRef.current,
      pageSize: pageSizeRef.current,
      ...params,
    }).catch((err: any) => {
      setLoading(false);
      return err;
    });
    setLoading(false);
    console.log('分页请求返回数据', res);
    if (res && res.message === 'success') {
      const { page, list } = res.data;
      setTotal(page.total || 0);
      setDataSource(list || []);
    }
  }

  useEffect(() => {
    console.log('searchParams', searchParams);
    if (searchParams.current === 1) {
      currentRef.current = 1;
    }
    fetchDataWarp();
  }, [fetchDataWarp]);

  const tableProps = {
    loading,
    dataSource,
    pagination: {
      current: currentRef.current,
      pageSize: pageSizeRef.current,
      total,
      showTotal: (total: number) => `${lang.total} ${total} ${lang.items}`,
      showSizeChanger: true,
      showQuickJumper: true,
      // pageSize 变化的回调
      onShowSizeChange: async (current: number, size: number) => {
        pageSizeRef.current = size;
        fetchData();
      },
    },
    columns: ownColumns(fetchData),
    // 改变页码
    onChange: async (payload: { current: number; pageSize: number }) => {
      currentRef.current = payload.current;
      fetchData();
    },
    scroll: {
      x: 500,
    },
    rowKey: (record: any) => record.id,
    ...baseProps,
  };

  return <Table {...tableProps} />;
};

export default DpTable;
