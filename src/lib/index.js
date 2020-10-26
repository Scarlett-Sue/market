import Vue from 'vue';
import axios from './axios';
Object.defineProperties(Vue.prototype, {
  $http: {
    get() {
      return axios;
    },
  },
});

// 使用ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//使用ramda
import * as R from 'ramda';
Object.defineProperties(Vue.prototype, {
  $R: {
    get() {
      return R;
    },
  },
});

// 引入animate.css
import animate from 'animate.css';
Vue.use(animate);

// //使用lodash
// import lodash from 'lodash';
// Object.defineProperties(Vue.prototype, {
//   $_: {
//     get() {
//       return lodash;
//     },
//   },
// });
// //lodash fp
// import fp from 'lodash/fp';
// Object.defineProperties(Vue.prototype, {
//   $fp: {
//     get() {
//       return fp;
//     },
//   },
// });
