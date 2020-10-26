import common from '@/api/common';
import * as R from 'ramda';
import { webConfig } from '@/config';

const state = {
  token: sessionStorage.getItem('token'),
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
};

const getters = {
  userType(state) {
    return R.path(['userInfo', 'type'], state);
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
      commit('SET_USER_TOKEN', data.token);
      commit('SET_USER_INFO', data.user);
    }
    return response;
  },
  async LOGINOUT({ commit }) {
    commit('SET_USER_TOKEN');
    commit('SET_USER_INFO');
    window.location.reload();
  },
  FAKE_LOGIN({ dispatch }, userInfo) {
    return dispatch('LOGIN', { userName: 'yanxiao', password: 123456 });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
