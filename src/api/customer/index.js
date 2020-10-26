import $http from 'httpTool';
import { url } from '../config';
import qs from 'querystring';

export default {
  // 获取行政区划列表下拉框
  async getXZQH() {
    let res = await $http.fetch({
      method: 'get',
      url: url.xzqhList,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },

  // 获取常量列表
  async getDictInfo(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getDictInfo,
      params: params,
    });
    return res.data || [];
  },
  // 水方案补录
  async getWaterMakeupList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getWaterMakeupList,
      params: params,
    });
    return res.data;
  },
  async launchWaterMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchWaterMakeup,
      data: params,
    });
    return res;
  },
  async getWaterMakeupDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getWaterMakeupDetail,
      params: params,
    });
    return res.data;
  },
  async deleteWaterMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteWaterMakeup,
      data: qs.stringify(params),
    });
    return res;
  },
  // 市级方案补录
  async getSjMakeupList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getSjMakeupList,
      params: params,
    });
    return res.data;
  },
  async launchSjMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchSjMakeup,
      data: params,
    });
    return res;
  },
  async getSjMakeupDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getSjMakeupDetail,
      params: params,
    });
    return res.data;
  },
  async deleteSjMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteSjMakeup,
      data: qs.stringify(params),
    });
    return res;
  },

  // 区县方案补录
  async getQxMakeupList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getQxMakeupList,
      params: params,
    });
    return res.data;
  },
  async launchQxMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchQxMakeup,
      data: params,
    });
    return res;
  },
  async getQxMakeupDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getQxMakeupDetail,
      params: params,
    });
    return res.data;
  },
  async deleteQxMakeup(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteQxMakeup,
      data: qs.stringify(params),
    });
    return res;
  },

  // 基金基本信息
  async getFundBaseInfoList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundBaseInfoList,
      params: params,
    });
    return res.data;
  },
  async getFundBaseInfoEndList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundBaseInfoEndList,
      params: params,
    });
    return res.data;
  },
  async launchFundBaseInfo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchFundBaseInfo,
      data: params,
    });
    return res;
  },
  async getFundBaseInfoDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundBaseInfoDetail,
      params: params,
    });
    return res.data;
  },
  async deleteFundBaseInfo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteFundBaseInfo,
      data: qs.stringify(params),
    });
    return res;
  },

  // 基金支出信息
  async getFundExpendList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundExpendList,
      params: params,
    });
    return res.data;
  },
  async launchFundExpend(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchFundExpend,
      data: params,
    });
    return res;
  },
  async getFundExpendDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundExpendDetail,
      params: params,
    });
    return res.data;
  },
  async deleteFundExpend(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteFundExpend,
      data: qs.stringify(params),
    });
    return res;
  },

  // 基金计提信息
  async getFundProvisionInfoList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundProvisionInfoList,
      params: params,
    });
    return res.data;
  },
  async launchFundProvisionInfo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchFundProvisionInfo,
      data: params,
    });
    return res;
  },
  async getFundProvisionInfoDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getFundProvisionInfoDetail,
      params: params,
    });
    return res.data;
  },
  async deleteFundProvisionInfo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.deleteFundProvisionInfo,
      data: qs.stringify(params),
    });
    return res;
  },
  // 用户注册
  async mineOwnerRegister(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.mineOwnerRegister,
      data: qs.stringify(params),
    });
    return res;
  },
  // 用户信息修改
  async mineOwnerUpdate(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.mineOwnerUpdate,
      data: qs.stringify(params),
    });
    return res;
  },
  async getMineOwnerInfo(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getMineOwnerInfo,
      params: params,
    });
    return res.data;
  },
  // 基金流程处理
  async fundHandle(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.fundHandle,
      data: params,
    });
    return res;
  },
  // 行政区划列表
  async getMineOwnerXZQH(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getMineOwnerXZQH,
      params: params,
    });
    return res.data;
  },
  // 审核日志
  async getSelfLog(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLogFund,
      params: params,
    });
    return res.data;
  },
  // 总日志
  async moreLog(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfMoreLogFund,
      params: params,
    });
    return res.data;
  },
  // 导出基金信息查询
  async exportFundInfo(params) {
    let query = Object.keys(params)
      .map(function (key) {
        // body...
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
    const fullUrl = `${url.exportFundInfo}?${query}`;
    window.open(fullUrl);
  },
  // 获取当前企业权人的可用方案
  async getAllMakeupList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getAllMakeupList,
      params: params,
    });
    return res.data;
  },
  // 获取该基金所有支出计提
  async getProvisionAndExpendList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getProvisionAndExpendList,
      params: params,
    });
    return res.data;
  },
  // 获取短信验证码
  async getCheckCode(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getCheckCode,
      params: params,
    });
    return res;
  },
  // 修改密码
  async updatePassword(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.updatePassword,
      data: qs.stringify(params),
    });
    return res;
  },
  // 忘记密码
  async forgetPassword(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.forgetPassword,
      data: qs.stringify(params),
    });
    return res;
  },
  // 忘记密码
  async userUpdatePassword(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.userUpdatePassword,
      // data: qs.stringify(params),
      params: params,
    });
    return res;
  },
  // 年度信息查询
  async getYearFundInfo(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getYearFundInfo,
      params: params,
    });
    return res.data;
  },
  // 年度信息查询：年份列表
  async getYearFundInfoYearList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getYearFundInfoYearList,
      params: params,
    });
    return res.data;
  },
};
