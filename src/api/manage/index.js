import $http from 'httpTool';
import axios from 'axios';
import { url } from '../config';
var CancelToken = axios.CancelToken;
import qs from 'querystring';

export default {
  // 批量下载附件
  async downloadFiles(params) {
    // let res = await $http.fetch({
    //   method: 'post',
    //   url: url.downloadFiles,
    //   data: params,
    //   responseType: 'blob',
    // });
    let res = url.downloadFiles;
    // let query = Object.keys(params)
    //   .map(function(key) {
    //     // body...
    //     return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    //   })
    //   .join('&');
    res = res + '?jsonStr=' + encodeURIComponent(JSON.stringify(params));
    return res;
  },
  async downloadFile(params) {
    // let res = await $http.fetch({
    //   method: 'get',
    //   url: url.downloadFile,
    //   params: params,
    //   responseType: 'blob',
    // });
    let query = Object.keys(params)
      .map(function(key) {
        // body...
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
    let res = url.downloadFile + '?' + query;
    return res;
  },
  // 获取待办数量列表
  async getToDoCount() {
    let res = await $http.fetch({
      method: 'get',
      url: url.toDoCount,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },
  // 获取基本信息二级地类列表下拉框
  async getEJDLLIST() {
    let res = await $http.fetch({
      method: 'get',
      url: url.EJDLList,
      params: { pageSize: 1000 },
    });
    return (res.data && res.data.dataList) || [];
  },
  // 获取行政区划列表下拉框
  async getXZQH() {
    let res = await $http.fetch({
      method: 'get',
      url: url.xzqhList,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },
  // 获取项目级别列表下拉框
  async getXMJB() {
    let res = await $http.fetch({
      method: 'get',
      url: url.xmjbList,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },
  // 获取项目性质列表下拉框
  async getXMXZ() {
    let res = await $http.fetch({
      method: 'get',
      url: url.xmxzList,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },
  // 获取矿山类别列表下拉框
  async getKSLB() {
    let res = await $http.fetch({
      method: 'get',
      url: url.kslbList,
      params: { pageSize: 1000 },
    });
    return res.data || [];
  },
  // 获取矿山列表
  async getKS(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.ksList,
      params: params,
    });
    return res.data || [];
  },
  // 获取耕地等级列表
  async getGDDJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.gddjList,
      params: params,
    });
    return res.data || [];
  },
  // 开采方式列表
  async getKCFS(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.kcfsList,
      params: params,
    });
    return res.data || [];
  },
  // 认定类型列表
  async getRDLX(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.rdlxList,
      params: params,
    });
    return res.data || [];
  },
  // 矿种列表
  async getKZ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.kzList,
      params: params,
    });
    return res.data || [];
  },
  // 土地权属性质
  async getTDQSXZ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.tdqsxzList,
      params: params,
    });
    return res.data || [];
  },
  // 所属分区
  async getSSFQ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.ssfqList,
      params: params,
    });
    return res.data || [];
  },
  // 企业性质/工程类型
  async getGCLX(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.gclxList,
      params: params,
    });
    return res.data || [];
  },
  // 项目类型
  async getXMLX(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.xmlxList,
      params: params,
    });
    return res.data || [];
  },
  // 地震隐患
  async getDZYH(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.dzyhList,
      params: params,
    });
    return res.data || [];
  },
  // 资金来源
  async getZJLY(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.zjlyList,
      params: params,
    });
    return res.data || [];
  },
  // 资金来源
  async getGBLX(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.gblxList,
      params: params,
    });
    return res.data || [];
  },

  // 历史遗留县级
  // 历史遗留县级上传附件
  async uploadLSYLXJ(params, uploader, cancel) {
    let formData = new FormData();
    formData.append('file', params.file);
    let res = await $http.fetch({
      method: 'post',
      url: url.uploadLSYLXJ,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      cancelToken: new CancelToken(function executor(c) {
        if (cancel[params.file.uid]) {
          cancel[params.file.uid]();
          delete cancel[params.file.uid];
        }
        cancel[params.file.uid] = c;
      }),
      onUploadProgress: progressEvent => {
        let percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
        uploader.onProgress({ percent: percent });
      },
    });
    uploader.onSuccess();
    return res.data;
  },
  // 历史遗留县级上传附件
  async removeFJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.removeFJ,
      params: params,
    });
    return res;
  },
  // 发起流程
  async launchFlow(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launch,
      data: params,
    });
    return res;
  },
  async suspendFlow(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.suspend,
      params: params,
    });
    return res;
  },
  async activeFlow(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.active,
      params: params,
    });
    return res;
  },
  // 回退流程
  async backFlow(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.backFlow,
      params: params,
    });
    return res;
  },
  // 处理历史遗留县级
  async hanleLSYLXJ(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleLSYLXJ,
      data: params,
    });
    return res;
  },
  // 获取历史遗留县级详情
  async lsylDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.lsylDetail,
      params: params,
    });
    return res.data;
  },
  // 获取我发起的
  async getSelfLunch(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLunch,
      params: params,
    });
    return res.data;
  },

  // 获取我待办的
  async getSelfTodo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodo,
      data: params,
    });
    return res.data;
  },
  // 获取我处理的
  async getSelfHandle(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandle,
      params: params,
    });
    return res.data;
  },
  // 处理历史遗留县级所有项目
  async allLSYLXJ(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.allLSYLXJ,
      data: params,
    });
    return res.data;
  },
  // 发起变更
  async selfFQBG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfFQBG,
      data: params,
    });
    return res;
  },
  // 报送单位变更列表
  async selfBSDWDB(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfBSDWDB,
      data: params,
    });
    return res.data || [];
  },
  // 报送单位变更列表
  async selfCXFQGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfCXFQGH,
      data: params,
    });
    return res;
  },
  // 竣工验收时查看报送进度
  async selfJD(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfJD,
      params: params,
    });
    return res.data;
  },

  // 历史遗留市级
  // 发起流程
  async launchLSYLSJ(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchLSYLSJ,
      data: params,
    });
    return res;
  },
  // 获取我发起的
  async getSelfLunchSJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLunchSJ,
      params: params,
    });
    return res.data;
  },

  // 获取我待办的
  async getSelfTodoSJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfTodoSJ,
      params: params,
    });
    return res.data;
  },
  // 获取我处理的
  async getSelfHandleSJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleSJ,
      params: params,
    });
    return res.data;
  },
  // 获取历史遗留市级详情
  async sjDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.sjDetail,
      params: params,
    });
    return res.data;
  },
  // 处理历史遗留市级
  async hanleLSYLSJ(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleLSYLSJ,
      data: params,
    });
    return res;
  },

  // 自然认定
  // 发起流程
  async launchZRRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchZRRD,
      data: params,
    });
    return res;
  },
  async getSelfTodoZRRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodoZRRD,
      data: params,
    });
    return res.data;
  },
  async zrrdDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.zrrdDetail,
      params: params,
    });
    return res.data;
  },
  async handleZRRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleZRRD,
      data: params,
    });
    return res;
  },
  // 获取我发起的
  async getSelfLaunchZRRD(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchZRRD,
      params: params,
    });
    return res;
  },
  // 获取我处理的
  async getSelfHandleZRRD(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleZRRD,
      params: params,
    });
    return res;
  },
  // 关闭未治理矿山
  async getGbksList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.gbksList,
      params: params,
    });
    return res.data;
  },

  // 新增历史遗留及矿山关闭
  // 发起流程
  async launchLSYLJKSGB(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchLSYLJKSGB,
      data: params,
    });
    return res;
  },
  // 待办
  async getSelfTodoLSYLJKSGB(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodoLSYLJKSGB,
      data: params,
    });
    return res.data;
  },
  // 详情
  async lsyljgbksDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.lsyljgbksDetail,
      params: params,
    });
    return res.data;
  },
  // 处理
  async handleLSYLJKSGB(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleLSYLJKSGB,
      data: params,
    });
    return res;
  },
  // 获取我发起的
  async getSelfLaunchXZKS(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchXZKS,
      params: params,
    });
    return res;
  },
  // 获取我处理的
  async getSelfHandleXZKS(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleXZKS,
      params: params,
    });
    return res;
  },

  // 区县复垦方案
  // 发起流程
  async launchQXFKFA(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchQXFKFA,
      data: params,
    });
    return res;
  },
  // 待办
  async getSelfTodoQXFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfTodoQXFKFA,
      params: params,
    });
    return res.data;
  },
  // 详情
  async qxfkfaDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.qxfkfaDetail,
      params: params,
    });
    return res.data;
  },
  // 处理
  async handleQXFKFA(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleQXFKFA,
      data: params,
    });
    return res;
  },
  // 获取我发起的
  async getSelfLaunchQXFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchQXFKFA,
      params: params,
    });
    return res;
  },
  // 获取我处理的
  async getSelfHandleQXFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleQXFKFA,
      params: params,
    });
    return res;
  },
  // 市级复垦方案
  // 发起流程
  async launchSJFKFA(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchSJFKFA,
      data: params,
    });
    return res;
  },
  // 待办
  async getSelfTodoSJFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfTodoSJFKFA,
      params: params,
    });
    return res.data;
  },
  // 详情
  async sjfkfaDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.sjfkfaDetail,
      params: params,
    });
    return res.data;
  },
  // 处理
  async handleSJFKFA(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleSJFKFA,
      data: params,
    });
    return res;
  },
  // 获取我发起的
  async getSelfLaunchSJFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchSJFKFA,
      params: params,
    });
    return res;
  },
  // 获取我处理的
  async getSelfHandleSJFKFA(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleSJFKFA,
      params: params,
    });
    return res;
  },
  /**
   * 区县竣工
   */
  async getGHWC(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getGHWC,
      params: params,
    });
    return res;
  },
  async launchXJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchXJJG,
      data: params,
    });
    return res;
  },
  // 待办
  async getSelfTodoXJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodoXJJG,
      data: params,
    });
    return res.data;
  },
  // 详情
  async XJJGDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.xjjgDetail,
      params: params,
    });
    return res.data;
  },
  // 处理
  async hanleXJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleXJJG,
      data: params,
    });
    return res;
  },
  // 我发起的
  async getSelfLaunchXJJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchXJJG,
      params: params,
    });
    return res;
  },
  //我处理的
  async getSelfHandlexXJJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleXJJG,
      params: params,
    });
    return res;
  },
  /**
   * 市级竣工
   */
  // 规划完成
  async getGHWCSJ(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getGHWCSJ,
      params: params,
    });
    return res;
  },
  // 发起
  async launchSJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchSJJG,
      data: params,
    });
    return res;
  },
  // 待办
  async getSelfTodoSJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodoSJJG,
      data: params,
    });
    return res.data;
  },
  // 详情
  async SJJGDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.sjjgDetail,
      params: params,
    });
    return res.data;
  },
  // 处理
  async hanleSJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.hanleSJJG,
      data: params,
    });
    return res;
  },
  //我发起的
  async getSelfLaunchSJJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLaunchSJJG,
      params: params,
    });
    return res;
  },
  //我处理的
  async getSelfHandleSJJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfHandleSJJG,
      params: params,
    });
    return res;
  },
  // 所有项目
  async getSelfAll(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfAll,
      data: params,
    });
    return res.data;
  },
  async getSelfLog(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfLog,
      params: params,
    });
    return res.data;
  },
  async moreLog(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.moreLog,
      params: params,
    });
    return res.data;
  },
  async getSelfImage(params) {
    let res = await $http.fetch({
      responseType: 'arraybuffer',
      method: 'get',
      url: url.selfImage,
      params: params,
    });
    return res;
  },
  //数量统计
  async getSelfStatistic(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfStatistic,
      params: params,
    });
    return res.data;
  },
  //数量统计
  async deleteSelf(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.selfDelete,
      params: params,
    });
    return res;
  },

  // 区县竣工
  //发起流程
  async launchQxJg(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchLsylgkjbxxJg,
      data: params,
    });
    return res;
  },
  async handleQxJg(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleLsylgkjbxxJg,
      data: params,
    });
    return res;
  },
  // 区县竣工详情
  async getQxjgDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getLsylgkjbxxJgDetail,
      params,
    });
    return res;
  },
  // 区县指标确认
  async launchQxZbqr(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchLsylgkjbxxZbqr,
      data: params,
    });
    return res;
  },
  async handleQxZbqr(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleLsylgkjbxxZbqr,
      data: params,
    });
    return res;
  },
  async getQxZbqrDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getLsylgkjbxxZbqrDetail,
      params,
    });
    const { meta, data } = res;
    if (meta && meta.success) {
      return data;
    }
  },

  // 其他部门实施
  async launchQtbmss(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchLsylQtbmssb,
      data: params,
    });

    return res;
  },

  async getQtbmssbDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.qtbmssbDetail,
      params,
    });
    return res.data;
  },

  async getQtbmssbSelfTodo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.qtbmssSelfTodo,
      data: params,
    });
    return res.data;
  },
  // 所有项目
  async getSelfAllQtbmss(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.getSelfAllQtbmss,
      data: params,
    });
    return res.data;
  },

  async handleQtbmss(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleQtbmss,
      data: params,
    });
    return res;
  },

  // 矿山再利用
  async getKszlySelfTodo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.kszlySelfTodo,
      data: params,
    });
    return res.data;
  },

  async getKszlyDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.kszlyDetail,
      params,
    });
    return res.data;
  },

  async launchKszly(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchKszly,
      data: params,
    });

    return res;
  },

  async handleKszly(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleKszly,
      data: params,
    });
    return res;
  },
  // 违法查处认定
  async getWFRDSelfTodo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.wfrdSelfTodo,
      data: params,
    });
    return res.data;
  },

  async getWFRDDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.wfrdDetail,
      params,
    });
    return res.data;
  },

  async launchWFRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchWFRD,
      data: params,
    });

    return res;
  },

  async handleWFRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleWFRD,
      data: params,
    });
    return res;
  },

  // 访问日志
  async getVisitLog(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getVisitLog,
      params: params,
    });
    return res.data || [];
  },

  // 市级项目
  // 所有项目
  async getAllSJXM(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.allSJXM,
      data: params,
    });
    return res.data;
  },
  // 待处理项目
  async getSelfSJXMTodo(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfSJXMTodo,
      data: params,
    });
    return res.data;
  },
  // 发起规划
  async launchXJXMGHFlow(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchSJXMGH,
      data: params,
    });
    return res;
  },
  // 处理规划
  async handleSJXMGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleSJXMGH,
      data: params,
    });
    return res;
  },
  // 规划详情
  async getSjxmghDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.sjxmghDetail,
      params: params,
    });
    return res.data;
  },
  // 发起竣工
  async launchSjxmjg(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchSJXMJG,
      data: params,
    });
    return res;
  },
  // 处理竣工
  async handleSjxmjg(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleSJXMJG,
      data: params,
    });
    return res;
  },
  // 竣工详情
  async getSjxmjgDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.sjxmjgDetail,
      params,
    });
    return res;
  },
  // 区县预览
  async getGeoJson(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getGeoJson,
      params: params,
    });
    return res.data;
  },
  // 市级预览
  async getSJGeoJson(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getSJGeoJson,
      params: params,
    });
    return res.data;
  },
  // 企业预览
  async getQYGeoJson(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getQYGeoJson,
      params: params,
    });
    return res.data;
  },
  // 查询矿山状态
  async getKsStage(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getKsStage,
      params: params,
    });
    return res.data;
  },

  // 草稿

  // 发起流程
  // 自然认定
  async saveDraftZRRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftZRRD,
      data: params,
    });
    return res;
  },
  // 再利用
  async saveDraftZLY(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftZLY,
      data: params,
    });
    return res;
  },
  // 其他部门实施
  async saveDraftQTBMSS(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftQTBMSS,
      data: params,
    });
    return res;
  },
  // 区县规划
  async saveDraftQXGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftQXGH,
      data: params,
    });
    return res;
  },
  // 区县竣工
  async saveDraftQXJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftQXJG,
      data: params,
    });
    return res;
  },
  // 企业规划
  async saveDraftQYGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftQYGH,
      data: params,
    });
    return res;
  },
  // 企业竣工
  async saveDraftQYJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftQYJG,
      data: params,
    });
    return res;
  },
  // 市级规划
  async saveDraftSJGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftSJGH,
      data: params,
    });
    return res;
  },
  // 市级竣工
  async saveDraftSJJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftSJJG,
      data: params,
    });
    return res;
  },
  // 新增矿山
  async saveDraftXZKS(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftXZKS,
      data: params,
    });
    return res;
  },
  // 新增矿山
  async saveDraftWFRD(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.saveDraftWFRD,
      data: params,
    });
    return res;
  },

  // 是否存在区县竣工草稿
  async isHasDraftQXJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.isHasDraftQXJG,
      params: params,
    });
    return res.data;
  },
  // 是否存在市级竣工草稿
  async isHasDraftSJJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.isHasDraftSJJG,
      params: params,
    });
    return res.data;
  },
  // 是否存在企业竣工草稿
  async isHasDraftQYJG(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.isHasDraftQYJG,
      params: params,
    });
    return res.data;
  },
  async getAreaList() {
    let res = await $http.fetch({
      method: 'get',
      url: url.getAreaList,
      params: { isLan: false },
    });
    return res.data;
  },
  // 指标交易分页
  async getZbjyList(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getZbjyPage,
      params,
    });
    return res;
  },

  async getZbjyDetail(xmbh) {
    let res = await $http.fetch({
      method: 'get',
      url: url.getZbjyDetail,
      params: { xmbh },
    });
    return res;
  },

  // 企业规划发起流程
  async launchQYGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchQYGH,
      data: params,
    });
    return res;
  },
  // 企业规划处理
  async handleQYGH(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleQYGH,
      data: params,
    });
    return res;
  },
  // 获取我待办的
  async getSelfTodoQY(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfTodoQY,
      data: params,
    });
    return res.data;
  },
  // 所有项目
  async getSelfAllQY(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.selfAllQY,
      data: params,
    });
    return res.data;
  },
  async qyghDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.qyghDetail,
      params: params,
    });
    return res.data;
  },
  async qyjgDetail(params) {
    let res = await $http.fetch({
      method: 'get',
      url: url.qyjgDetail,
      params: params,
    });
    return res;
  },
  // 企业竣工发起流程
  async launchQYJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.launchQYJG,
      data: params,
    });
    return res;
  },
  // 企业竣工处理
  async handleQYJG(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.handleQYJG,
      data: params,
    });
    return res;
  },

  // 根据geojson获取面积
  async getArea(params) {
    let res = await $http.fetch({
      method: 'post',
      url: url.getArea,
      data: qs.stringify(params),
    });
    return res.data;
  },
};
