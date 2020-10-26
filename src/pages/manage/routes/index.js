const childRoutesName = [];
const childRoutesConf = childRoutesName.map(
  name => require(`./${name}`).default,
);
export default [
  {
    path: '/login',
    component: () => import('../components/login/login'),
  },
  {
    path: '/',
    component: () => import('../components/container/index'),
    props: route => ({ ...route.query }),
    redirect: '/home',
    children: [
      {
        path: 'develop',
        name: 'develop',
        component: () => import('@/components/develop/develop'),
      },
      {
        path: 'myself',
        name: 'myself',
        component: () => import('../views/myself/index'),
        redirect: 'myself/save',
        children: [
          {
            path: 'save',
            name: 'myselfSave',
            component: () => import('../views/myself/save'),
          },
        ],
      },
      {
        path: 'depot',
        name: 'depot',
        component: () => import('../views/depot/index'),
        children: [
          {
            path: 'save',
            name: 'depotSave',
            component: () => import('../views/depot/save'),
          },
        ],
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('../views/supplier/index'),
        children: [
          {
            path: 'save',
            name: 'supplierSave',
            component: () => import('../views/supplier/save'),
          },
        ],
      },
      {
        path: 'dealer',
        name: 'dealer',
        component: () => import('../views/dealer/index'),
        children: [
          {
            path: 'save',
            name: 'dealerSave',
            component: () => import('../views/dealer/save'),
          },
        ],
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/goods/index'),
        children: [
          {
            path: 'save',
            name: 'goodsSave',
            component: () => import('../views/goods/save'),
          },
        ],
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('../views/purchase/index'),
        children: [
          {
            path: 'save',
            name: 'purchaseSave',
            component: () => import('../views/purchase/save'),
          },
        ],
      },
      {
        path: 'shipment',
        name: 'shipment',
        component: () => import('../views/shipment/index'),
        children: [
          {
            path: 'save',
            name: 'shipmentSave',
            component: () => import('../views/shipment/save'),
          },
        ],
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/user/index'),
        children: [
          {
            path: 'save',
            name: 'userSave',
            component: () => import('../views/user/save'),
          },
        ],
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('../views/log/index'),
        children: [
        ],
      },
    ],
  },
]
  .concat(childRoutesConf)
  .concat({
    path: '*',
    name: '404',
    component: () => import('../views/404'),
  });
