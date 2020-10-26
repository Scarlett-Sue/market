const config = {
  webConfig: {
    title: 'test',
    copyright: 'Copyright',
  },
  dev: {
    baseURL: '/mock',
  },
  prod: {
    baseURL: '/',
  },
  path: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PATH : '',
};

export const webConfig = config;
export default (process.env.NODE_ENV === 'production'
  ? config.prod
  : config.dev);
