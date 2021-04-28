import axios from 'axios';

const API = {
  login: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: 'https://platform-gw-test.dragonpass.com.cn/boss/user/login',
        data: {
          lg: 'zh-cn',
          sysCode: 'platform-sys',
          ...req,
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  queryLanguage: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/base/language/findPage',
        data: {
          page: req.current,
          ...req,
        },
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  addLanguage: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/base/language/add',
        data: req,
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  updateLanguage: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/base/language/update',
        data: req,
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  deleteLanguage: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/base/language/delete',
        data: req,
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  listAgreementInputSelect: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/cust/agreement/listAgreementInputSelect',
        data: req,
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  listProjectInputSelect: async function(req: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url:
          'https://platform-gw-test.dragonpass.com.cn/boss/pass/customer/listProjectInputSelect',
        data: req,
        headers: {
          Token: localStorage.getItem('token'),
        },
      })
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
};

export default API;
