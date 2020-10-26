import common from '@/api/common';
import mineOwnerLogin from '@/api/common';
import * as R from 'ramda';
import { webConfig } from '@/config';

const state = {
  token: sessionStorage.getItem('token'),
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
};

const getters = {
  userType(state) {
    return R.path(['userInfo', 'referenceInfo', 'dept', 'type'], state);
  },
  // 判断是否是区县经办
  submitPermission(state, getters) {
    if (getters.userStation) {
      return (
        R.find(R.propEq('fkStation', '04'), getters.userStation) &&
        getters.xzqhNo != '500000'
      );
    }
  },
};

const mutations = {
  SET_USER_TOKEN(state, token) {
    if (token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    } else {
      state.token = '';
      sessionStorage.removeItem('token');
    }
  },
  SET_USER_INFO(state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      state.userInfo = null;
      sessionStorage.removeItem('userInfo');
    }
  },
};

const actions = {
  async LOGIN({ commit }, loginInfo) {
    const response = await common.login({ ...loginInfo });
    if (response instanceof Error || !response) {
    } else {
      const { data } = response;
      let userType = R.path(
        ['userInfo', 'referenceInfo', 'dept', 'type'],
        state,
      );
      commit('SET_USER_TOKEN', data.referenceInfo.token);
      commit('SET_USER_INFO', data);
    }
    return response;
  },
  async LOGINOUT({ commit }) {
    commit('SET_USER_TOKEN');
    commit('SET_USER_INFO');
    window.location.reload();
  },
  FAKE_LOGIN({ dispatch }, userInfo) {
    return dispatch('LOGIN', { userName: '', password: '' });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
