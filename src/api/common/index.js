import $http from 'httpTool';
import { url } from '../config';
import qs from 'querystring';
import crypto from 'crypto';
export default {
  login(user) {
    const md5 = crypto.createHash('md5');
    md5.update(user.password);
    user.password = md5.digest('hex');
    return $http.fetch({
      method: 'post',
      url: url.login,
      data: qs.stringify(user),
    });
  },
  async mineOwnerLogin(params) {
    const md5 = crypto.createHash('md5');
    md5.update(params.password);
    params.password = md5.digest('hex');
    let res = await $http.fetch({
      method: 'post',
      url: url.mineOwnerLogin,
      data: qs.stringify(params),
    });
    return res;
  },
  alterPass({ oldPassword, newPassword }) {
    const md5 = crypto.createHash('md5');
    md5.update(oldPassword);
    oldPassword = md5.digest('hex');
    const new_md5 = crypto.createHash('md5');
    new_md5.update(oldPassword);
    oldPassword = new_md5.digest('hex');
    return $http.post(
      url.alterPass,
      qs.stringify({ oldPassword, newPassword }),
    );
  },
};
