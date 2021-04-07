import React from 'react';
import { useState, useEffect } from 'react';
import { Cascader, Spin } from 'antd';
import { useRequest } from '@umijs/hooks';
import { IRequestProps } from '@/global';

export interface IDpCascaderAreaProps extends IRequestProps {
  isRequest?: boolean; // 是否需要请求
  sourceData?: Array<any>; // 数据
  valeName?: string; // 设置value名称，默认id
  isFliter?: boolean; // 过滤相同名称
}

const DpCascaderArea: React.FC<IDpCascaderAreaProps> = props => {
  const {
    reqUrl,
    reqParams,
    valeName = 'id',
    isRequest,
    isFliter,
    sourceData,
  } = props;
  const [options, setOptions] = useState<any[]>([]);
  const { data, run, loading } = useRequest(
    {
      url: reqUrl,
      method: 'post',
      data: reqParams,
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (data) {
      const result = data?.result || [];
      const newData = getKeys(
        result.filter((item: any) => item.level === 1),
        result.filter((item: any) => item.level !== 1),
        result,
      );
      setOptions(newData);
    }
  }, [data]);

  useEffect(() => {
    if (!isRequest && sourceData) {
      const newData = getKeys(
        sourceData.filter((item: any) => item.level === 1),
        sourceData.filter((item: any) => item.level !== 1),
        sourceData,
      );
      setOptions(newData);
    }
  }, [sourceData]);

  useEffect(() => {
    if (isRequest) {
      run();
    }
  }, []);

  // 获取所有级别
  const getKeys = (
    lavel1: Array<any>,
    result: Array<any>,
    ALL_RESULT: Array<any>,
  ) => {
    const arr = [...lavel1];
    lavel1.map(item => {
      item.children = result.filter(
        obj => obj.parent === item.id && (!isFliter || item.name !== obj.name),
      );
      if (item.children.length > 0) {
        return getKeys(item.children, result, ALL_RESULT);
      }
      return item;
    });
    return arr;
  };

  // 过滤
  const filter = (inputValue: string, path: Array<any>) => {
    return path.some(
      option =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  };

  return (
    <Cascader
      options={options}
      notFoundContent={
        loading || loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin size="small" />
          </div>
        ) : null
      }
      fieldNames={{ label: 'name', value: valeName, children: 'children' }}
      placeholder="选择区域"
      showSearch={{ filter }}
      style={{ width: '100%' }}
      changeOnSelect={true}
    />
  );
};

DpCascaderArea.defaultProps = {
  isRequest: false,
  isFliter: false,
  valeName: 'id',
};

export default DpCascaderArea;
