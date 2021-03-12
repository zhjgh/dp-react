/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-05 10:24:16
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-05 14:03:57
 */

// @ts-nocheck
import React, { useState } from 'react';
import { Button } from 'antd';
import { IExportProps } from './index.d';
import Mock from 'mockjs';
import FileSaver from 'file-saver';
import axios from 'axios';

// 创建指定数量的数据（模拟后端接口）
export const getData = async (limit: number) => {
  return new Promise((resolve, reject) => {
    try {
      const Random = Mock.Random;

      // 创建指定个数的随机数据
      const data = new Array(limit).fill('').map((_, index) => {
        return {
          id: `200820-${index}`,
          username: Random.cname(),
          url: Random.url('http'),
          price: Random.float(0, 110000, 0, 2),
          createAt: Random.datetime('yyyy-MM-dd HH:mm:ss'),
        };
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const Export: React.FC<IExportProps> = props => {
  const [pending, setPending] = useState(false);
  const { total, size, onProcess } = props;

  // 导出数据为 CSV 格式
  const exportCsv = async (total, size, onProcess = process => {}) => {
    try {
      if (!total) throw '无数据';
      // 分片
      const step = Math.ceil(total / size);
      // CSV 缓存
      let cvsArray = [];
      // 创建表头[一般表头由外部传入]
      cvsArray.push(
        ['编号', '用户名', '官网', '报价', '创建日期'].join() + '\n'
      );
      // 遍历分片
      for (let i = 0; i < step; i++) {
        await new Promise(async (resolve, reject) => {
          try {
            const data = await getData(size);
            data.map((row: any) => {
              cvsArray.push(Object.values(row).join() + '\n');
            });
            const process = (i / step) * 100;
            console.log(`进度 ${Math.round(process)}%`);
            await new Promise(_resolve => {
              setTimeout(() => {
                _resolve(true);
              }, 50);
            });
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      }
      // 遍历完成时，固定进度为 100%
      onProcess(100);
      const blob = new Blob([String.fromCharCode(0xfeff), ...cvsArray], {
        type: 'text/plain;charset=utf-8',
      });
      await FileSaver.saveAs(blob, 'file.csv');
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onExport = async () => {
    try {
      setPending(true);
      await exportCsv(10000 * 120, 2000, process => {
        // 进度条更新
        console.log('process', process);
        // this.csvProcess = process;
      });
    } catch (error) {
      alert(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button onClick={() => onExport()} disabled={pending}>
      导出CSV表格
    </Button>
  );
};

Export.defaultProps = {
  total: 0,
  size: 1000,
};

export default Export;
