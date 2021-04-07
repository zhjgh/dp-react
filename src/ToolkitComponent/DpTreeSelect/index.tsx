import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';

export interface IDpTreeSelectProps extends TreeSelectProps<any> {}

const DpTreeSelect = forwardRef(
  (props: IDpTreeSelectProps, ref: ForwardedRef<any>) => {
    const { value, maxTagCount = 2, ...restProps } = props;

    return (
      <span ref={ref}>
        <TreeSelect maxTagCount={maxTagCount} {...restProps} />
      </span>
    );
  },
);

export default DpTreeSelect;
