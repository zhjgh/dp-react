import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react';
import { Tree, Input, Tooltip } from 'antd';
import styles from './index.less';
import { TreeProps } from 'antd/lib/tree';

const { Search } = Input;

export type TreeType = 'page' | 'modal';

export interface DpTreeProps extends TreeProps {
  value?: any;
  onChange?(v: any): void;
  treeSource?: any[];
  type?: TreeType;
  title?: string;
}

// 数据标签
const DpTree = forwardRef((props: DpTreeProps, ref: ForwardedRef<any>) => {
  const {
    value,
    onChange,
    treeSource = [],
    type = 'page',
    title,
    ...resProps
  } = props;
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [dataList, setDataList] = useState<any[]>([]);

  console.log(props);

  useEffect(() => {
    if (treeSource.length > 0) {
      setDataSource(treeSource);
    }
  }, [treeSource]);

  useEffect(() => {
    const generateList = (data: any) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key, title });
        setDataList(dataList);
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(treeSource);
  }, []);

  const getParentKey = (key: any, tree: string | any[]): any => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (
          node.children.some((item: any) => {
            return item.key === key;
          })
        ) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  // 展开
  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  // 搜索
  const onSearch = (value: any) => {
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeSource);
        }
        return null;
      })
      .filter((item, i, self) => {
        return item && self.indexOf(item) === i;
      });
    const newArr: React.SetStateAction<any[]> = [];
    [...treeSource].map(_ => {
      if (JSON.stringify(_).indexOf(value) > -1) {
        newArr.push(_);
      }
      return _;
    });
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
    setSearchValue(value);
    setDataSource(newArr);
  };

  const loop = (data: any) => {
    return data.map((item: any) => {
      const index = searchValue ? item.title.indexOf(searchValue) : -1;
      const beforeStr = item.title ? item.title.substr(0, index) : '';
      const afterStr = item.title
        ? item.title.substr(index + searchValue.length)
        : '';
      const title = (
        <Tooltip placement="top" title={item.title} color={'#155BD4'}>
          {index > -1 ? (
            <span className={styles['dp-tree-span']}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span className={styles['dp-tree-span']}>{item.title}</span>
          )}
        </Tooltip>
      );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }
      return (searchValue && index > -1) || !searchValue
        ? {
            title,
            key: item.key,
          }
        : '';
    });
  };

  const height =
    type === 'modal' ? window.innerHeight - 400 : window.innerHeight - 260;
  const leftHeight = height + 100;

  return (
    <div className={styles['dp-tree-left']} style={{ height: leftHeight }}>
      <div className={styles['dp-tree-header']}>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="快速查询"
          onSearch={onSearch}
        />
        <div className={styles['dp-tree-name']}>{title}</div>
      </div>
      <div className={styles['dp-tree-body']}>
        <Tree
          showLine={true}
          blockNode
          showIcon={true}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={(selectedKeys, info) => {
            onChange && onChange(selectedKeys);
          }}
          selectedKeys={value || []}
          treeData={loop(dataSource)}
          height={height}
          {...resProps}
        />
      </div>
    </div>
  );
});

export default DpTree;
