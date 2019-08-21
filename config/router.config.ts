export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        component: './Welcome',
      },
      {
        path: '/demo/standard-list',
        component: './Demo/StandardList',
      },
      {
        path: '/demo/form',
        component: './Demo/Form',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
