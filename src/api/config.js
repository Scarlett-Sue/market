import { ksxf, yzt } from 'config';
export const host = ksxf + 'ksxf-synthesize';
const yztHost = host;
const superviseHost = ksxf + 'stxf-provider-supervise';
const userHost = ksxf + 'stxf-provider-user';
export const scksHost = ksxf + 'stxf-provider-bm';
export const url = {
  initGeojson: yztHost + '/map/mineAnalysis/initMap.do', // 获取矿山geojson
  getSearchParams: yztHost + '/map/projectInfo/getSearchParams.do', // 项目查询区县获取

  mineOwnerLogin: host + '/auth/login.do', // 登录
  login: host + '/auth/login.do', // 登录
  alterPass: host + '/auth/updatePassword.do', // 修改密码

  downloadFiles: host + '/attachment/listDownload.do',
  downloadFile: host + '/attachment/download.do',

};
