import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import lang from '@/locales';

import { SelectProps } from 'antd/es/select';

export interface IDpSearchSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  reqUrl: string; // 请求地址，必填
  headers?: Object; // 请求头参数
  reqParams?: Object; // 请求参数
  labelInValue: boolean; // 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
  pageSize?: number; // 分页加载数量，默认20
  debounceTimeout?: number; // 延迟请求时间（单位毫秒），默认500
  labelAndValue?: string[]; // 指定label和value的参数名称，默认['name', 'id']
  initialValues?: any[] | string; // 初始化数据
  onChange?(value: any): {}; // 选择回调方法
}

const DpSearchSelect = forwardRef((props: IDpSearchSelectProps, ref: any) => {
  const {
    reqUrl,
    headers,
    reqParams,
    labelAndValue = ['name', 'id'],
    labelInValue,
    onChange,
  } = props;
  const { initialValues, pageSize, debounceTimeout, mode, maxTagCount } = props;

  const [fetching, setFetching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const page = useRef(1);

  const fetchOptions = async (value: string) => {
    return await new Promise((resolve, reject) => {
      axios({
        url: reqUrl,
        method: 'post',
        data: {
          name: value,
          page: page.current,
          pageSize,
          ...reqParams,
        },
        headers,
      })
        .then(res => {
          console.log(res);
          if (res.data.state === '1') {
            const { list, page } = res.data.result;
            setTotalPage(page && page.totalPage);
            const newOptions =
              list &&
              list.map((item: any) => {
                return {
                  label: item[labelAndValue[0]],
                  value: item[labelAndValue[1]],
                };
              });
            resolve(newOptions);
          }
          reject(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string, type: string) => {
      setFetching(true);
      if (type === 'search') {
        page.current = 1;
        setOptions([]);
        fetchOptions(value).then((newOptions: any) => {
          setSearchValue(value);
          setOptions(newOptions);
          console.log('name', value);
          console.log('newOptions', newOptions);
        });
      } else {
        if (page.current >= totalPage) return;
        page.current += 1;
        fetchOptions(searchValue).then((newOptions: any) => {
          setOptions(options.concat(newOptions));
          console.log('name', searchValue);
          console.log('newOptions', options.concat(newOptions));
        });
      }
      console.log('page', page.current);
      setFetching(false);
    };

    return _.debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const setData = (value: any) => {
    if (Array.isArray(name)) {
      onChange && onChange(value);
    } else {
      onChange && onChange(value);
    }
  };

  useEffect(() => {
    setData(initialValues);
    debounceFetcher(searchValue, 'search');
    return () => {
      setOptions([]);
    };
  }, []);

  const handleChange = (value: any) => {
    setData(value);
  };

  return (
    <Select
      ref={ref}
      placeholder={`${lang.pleaseSelect} ${
        mode === 'multiple' ? lang.multiple : ''
      }`}
      style={{ width: '100%' }}
      showArrow={true}
      showSearch={true}
      autoClearSearchValue={true}
      mode={mode}
      maxTagCount={maxTagCount}
      defaultValue={initialValues}
      onPopupScroll={() => debounceFetcher(searchValue, 'scroll')}
      labelInValue={labelInValue}
      filterOption={false}
      onSearch={value => debounceFetcher(value, 'search')}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      onChange={handleChange}
    />
  );
});

DpSearchSelect.defaultProps = {
  pageSize: 20,
  debounceTimeout: 500,
  maxTagCount: 2,
  labelInValue: false,
};

export default DpSearchSelect;
