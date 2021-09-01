/*
 * Description:
 * Author: zhanghj
 * Date: 2021-08-26 18:21:10
 * LastEditors: zhanghj
 * LastEditTime: 2021-08-30 16:48:33
 */

import request from '@/utils/request';

export async function getList(params) {
  return request('/list', {
    method: 'GET',
    params,
  });
}

export async function updateItem(params) {
  return request('/update', {
    method: 'POST',
    data: params,
  });
}

export async function addItem(params) {
  return request('/add', {
    method: 'POST',
    data: params,
  });
}

export async function delItem(params) {
  return request('/del', {
    method: 'POST',
    data: params,
  });
}
