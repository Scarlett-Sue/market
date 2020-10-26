import { host } from 'config';
export const Host = host;
export const url = {
  login: host + '/user/login.do', // 登录

  userDetail: host + '/user/get.do',
  userAdd: host + '/user/add.do',
  userUpdate: host + '/user/update.do',
  userRemove: host + '/user/delete.do',
  userList: host + '/user/list.do',

  logList: host + '/log/list.do',
};
