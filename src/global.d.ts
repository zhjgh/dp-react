/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-04-06 09:14:53
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-04-06 11:16:22
 */

export interface ICommonProps {
  onChange?(v: any): void;
}

export interface IRequestProps extends ICommonProps {
  method?: any; // 请求方式
  reqUrl?: string; // 请求地址
  headers?: any; // 请求头
  reqParams?: {
    // 请求参数
    [key: string]: string;
  };
  reqPromise?(): void; // 异步请求
}
