import $http from 'httpTool';
import axios from 'axios';
import { url } from '../config';
var CancelToken = axios.CancelToken;
import qs from 'querystring';

export default {
  async userDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.userDetail,
      params: params,
    });
    return res.data;
  },
  async userAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.userAdd,
      data: params,
    });
    return res;
  },
  async userUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.userUpdate,
      data: params,
    });
    return res;
  },
  async userRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.userRemove,
      data: params,
    });
    return res;
  },
  async userList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.userList,
      params: params,
    });
    return res.data;
  },
  async logList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.logList,
      params: params,
    });
    return res.data;
  },
};
