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
  async supplierDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.supplierDetail,
      params: params,
    });
    return res.data;
  },
  async supplierAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.supplierAdd,
      data: params,
    });
    return res;
  },
  async supplierUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.supplierUpdate,
      data: params,
    });
    return res;
  },
  async supplierRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.supplierRemove,
      data: params,
    });
    return res;
  },
  async supplierList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.supplierList,
      params: params,
    });
    return res.data;
  },
  async dealerDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.dealerDetail,
      params: params,
    });
    return res.data;
  },
  async dealerAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.dealerAdd,
      data: params,
    });
    return res;
  },
  async dealerUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.dealerUpdate,
      data: params,
    });
    return res;
  },
  async dealerRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.dealerRemove,
      data: params,
    });
    return res;
  },
  async dealerList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.dealerList,
      params: params,
    });
    return res.data;
  },
  async depotDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.depotDetail,
      params: params,
    });
    return res.data;
  },
  async depotAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.depotAdd,
      data: params,
    });
    return res;
  },
  async depotUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.depotUpdate,
      data: params,
    });
    return res;
  },
  async depotRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.depotRemove,
      data: params,
    });
    return res;
  },
  async depotList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.depotList,
      params: params,
    });
    return res.data;
  },
  async areaDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.areaDetail,
      params: params,
    });
    return res.data;
  },
  async areaAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.areaAdd,
      data: params,
    });
    return res;
  },
  async areaUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.areaUpdate,
      data: params,
    });
    return res;
  },
  async areaRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.areaRemove,
      data: params,
    });
    return res;
  },
  async areaList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.areaList,
      params: params,
    });
    return res.data;
  },
  async cargoDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.cargoDetail,
      params: params,
    });
    return res.data;
  },
  async cargoAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.cargoAdd,
      data: params,
    });
    return res;
  },
  async cargoUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.cargoUpdate,
      data: params,
    });
    return res;
  },
  async cargoRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.cargoRemove,
      data: params,
    });
    return res;
  },
  async cargoList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.cargoList,
      params: params,
    });
    return res.data;
  },
  async detailDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.detailDetail,
      params: params,
    });
    return res.data;
  },
  async detailAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.detailAdd,
      data: params,
    });
    return res;
  },
  async detailUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.detailUpdate,
      data: params,
    });
    return res;
  },
  async detailRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.detailRemove,
      data: params,
    });
    return res;
  },
  async detailList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.detailList,
      params: params,
    });
    return res.data;
  },
  async purchaseDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.purchaseDetail,
      params: params,
    });
    return res.data;
  },
  async purchaseAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.purchaseAdd,
      data: params,
    });
    return res;
  },
  async purchaseUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.purchaseUpdate,
      data: params,
    });
    return res;
  },
  async purchaseRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.purchaseRemove,
      data: params,
    });
    return res;
  },
  async purchaseList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.purchaseList,
      params: params,
    });
    return res.data;
  },
  async shipmentDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.shipmentDetail,
      params: params,
    });
    return res.data;
  },
  async shipmentAdd(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.shipmentAdd,
      data: params,
    });
    return res;
  },
  async shipmentUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.shipmentUpdate,
      data: params,
    });
    return res;
  },
  async shipmentRemove(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.shipmentRemove,
      data: params,
    });
    return res;
  },
  async shipmentList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.shipmentList,
      params: params,
    });
    return res.data;
  },
};
