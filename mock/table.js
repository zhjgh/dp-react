/*
 * Description:
 * Author: zhanghj
 * Date: 2021-08-27 12:02:12
 * LastEditors: zhanghj
 * LastEditTime: 2021-09-01 21:15:40
 */

let list = [
  {
    id: 1,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 2,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 3,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 4,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 5,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 6,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 7,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 8,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 9,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 10,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
  {
    id: 11,
    name: '张三',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    age: 30,
    birthDate: '2017-08-09',
    sex: 0,
  },
];

export default {
  'GET /api/list': (req, res) => {
    const { id, name, sex, birthDate } = req.query;
    let newList = list;
    if (id && id.length > 0) {
      newList = newList.filter(v => v.id == id);
    } else {
      newList = list;
    }
    res.json({
      state: '1',
      result: {
        list: newList,
        page: {
          total: newList.length,
        },
      },
    });
  },
  'POST /api/add': (req, res) => {
    console.log(req.body);
    list = list.concat(req.body).reverse();
    res.json({
      state: '1',
      result: {
        list,
        page: {
          total: list.length,
        },
      },
    });
  },
  'POST /api/update': (req, res) => {
    const { id, age, name, sex, birthDate } = req.body;
    const index = list.findIndex(item => item.id === id);
    const newItem = {
      id: id || list[index].id,
      age: age || list[index].age,
      name: name || list[index].name,
      sex: sex || list[index].sex,
      birthDate: birthDate || list[index].birthDate,
      avatar: list[index].avatar,
    };
    list.splice(index, 1);
    list = list.concat(newItem);
    res.json({
      state: '1',
      result: {
        list,
        page: {
          total: list.length,
        },
      },
    });
  },
  'POST /api/del': (req, res) => {
    const { id } = req.body;
    const index = list.findIndex(item => item.id === id);
    console.log(index);
    list.splice(index, 1);
    res.json({
      state: '1',
      result: {
        list,
        page: {
          total: list.length,
        },
      },
    });
  },
};
