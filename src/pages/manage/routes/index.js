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
        props: route => ({ ...route.query }),
      },
      {
        path: 'myself',
        name: 'myself',
        component: () => import('../views/myself/index'),
        props: route => ({ ...route.query }),
        redirect: 'myself/save',
        children: [
          {
            path: 'save',
            name: 'myselfSave',
            component: () => import('../views/myself/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'depot',
        name: 'depot',
        component: () => import('../views/depot/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'depotSave',
            component: () => import('../views/depot/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'area',
        name: 'area',
        component: () => import('../views/area/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'areaSave',
            component: () => import('../views/area/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('../views/supplier/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'supplierSave',
            component: () => import('../views/supplier/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'dealer',
        name: 'dealer',
        component: () => import('../views/dealer/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'dealerSave',
            component: () => import('../views/dealer/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/goods/index'),
        props: route => ({ ...route.query }),
        children: [
        ],
      },
      {
        path: 'content',
        name: 'content',
        component: () => import('../views/content/index'),
        props: route => ({ ...route.query }),
        children: [
        ],
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('../views/purchase/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'purchaseSave',
            component: () => import('../views/purchase/save'),
            props: route => ({ ...route.query }),
          },
          {
            path: 'detail',
            name: 'purchaseDetail',
            component: () => import('../views/purchase/detail'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'shipment',
        name: 'shipment',
        component: () => import('../views/shipment/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'shipmentSave',
            component: () => import('../views/shipment/save'),
            props: route => ({ ...route.query }),
          },
          {
            path: 'detail',
            name: 'shipmentDetail',
            component: () => import('../views/shipment/detail'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/user/index'),
        props: route => ({ ...route.query }),
        children: [
          {
            path: 'save',
            name: 'userSave',
            component: () => import('../views/user/save'),
            props: route => ({ ...route.query }),
          },
        ],
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('../views/log/index'),
        props: route => ({ ...route.query }),
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
