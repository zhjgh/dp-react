/*
 * Description:
 * Author: zhanghj
 * Date: 2021-08-26 18:21:10
 * LastEditors: zhanghj
 * LastEditTime: 2021-08-30 16:48:33
 */

import request from '@/utils/request';

const apiPerfix = 'https://api.mocksys.com/api/v1/mock/20130';

type Keys = number | string;

type Params<T = unknown> = {
  [K in Keys]: T;
};

export async function getPage(params: Params) {
  return request(`${apiPerfix}/get/page`, {
    method: 'GET',
    params,
  });
}

export async function updateItem(params: Params) {
  return request('/update', {
    method: 'POST',
    data: params,
  });
}

export async function addItem(params: Params) {
  return request('/add', {
    method: 'POST',
    data: params,
  });
}

export async function delItem(params: Params) {
  return request('/del', {
    method: 'POST',
    data: params,
  });
}
