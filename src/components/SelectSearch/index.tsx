/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-09 16:23:04
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-12 16:19:14
 */
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import setting from '../../setting';
import { ISelectSearchProps } from './index.d';

const SelectSearch = forwardRef((props: ISelectSearchProps, ref: any) => {
  const { action, headers, fetchData, labelAndValue } = props;
  const { defaultValue, pageSize, debounceTimeout, mode, maxTagCount } = props;

  const [fetching, setFetching] = useState(false);
  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);
  const page = useRef(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchOptions = async (value: string) => {
    return await new Promise((resolve, reject) => {
      axios({
        url: action,
        method: 'post',
        data: {
          name: value,
          page: page.current,
          pageSize,
          ...fetchData,
        },
        headers,
      })
        .then(res => {
          const { list, page } = res.data.result;
          setTotalPage(page.totalPage);
          const newOptions =
            list &&
            list.map(() => {
              return {
                label: labelAndValue[0],
                value: labelAndValue[1],
              };
            });
          resolve(newOptions);
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
          setName(value);
          setOptions(newOptions);
          console.log('name', value);
          console.log('newOptions', newOptions);
        });
      } else {
        if (page.current >= totalPage) return;
        page.current += 1;
        fetchOptions(name).then((newOptions: any) => {
          setOptions(options.concat(newOptions));
          console.log('name', name);
          console.log('newOptions', options.concat(newOptions));
        });
      }
      console.log('page', page.current);
      setFetching(false);
    };

    return _.debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    debounceFetcher(name, 'search');
    return () => {
      console.log('组件卸载了...');
      setOptions([]);
    };
  }, []);

  return (
    <Select
      ref={ref}
      placeholder={`${setting.selectSearch.pleaseSelect} ${
        mode !== undefined ? setting.selectSearch.multiple : ''
      }`}
      style={{ width: '100%' }}
      showArrow={true}
      showSearch={true}
      autoClearSearchValue={true}
      mode={mode}
      maxTagCount={maxTagCount}
      defaultValue={defaultValue}
      onPopupScroll={() => debounceFetcher(name, 'scroll')}
      labelInValue
      filterOption={false}
      onSearch={value => debounceFetcher(value, 'search')}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
    />
  );
});

SelectSearch.defaultProps = {
  mode: undefined,
  pageSize: 10,
  debounceTimeout: 800,
  maxTagCount: 3,
  labelAndValue: ['name', 'id'],
};

export default SelectSearch;
