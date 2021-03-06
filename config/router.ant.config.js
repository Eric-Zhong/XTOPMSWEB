/* 在这里配置菜单和权限 */
export default [
  // site default path to "/"
  // { path: '/', redirect: '/dashboard/analysis' },
  // XTOPMS User Management
  // dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: './Dashboard/Analysis',
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        component: './Dashboard/Monitor',
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: './Dashboard/Workplace',
      },
    ],
  },
  // forms
  {
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
      {
        path: '/form/basic-form',
        name: 'basicform',
        component: './Forms/BasicForm',
      },
      {
        path: '/form/step-form',
        name: 'stepform',
        component: './Forms/StepForm',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/form/step-form',
            redirect: '/form/step-form/info',
          },
          {
            path: '/form/step-form/info',
            name: 'info',
            component: './Forms/StepForm/Step1',
          },
          {
            path: '/form/step-form/confirm',
            name: 'confirm',
            component: './Forms/StepForm/Step2',
          },
          {
            path: '/form/step-form/result',
            name: 'result',
            component: './Forms/StepForm/Step3',
          },
        ],
      },
      {
        path: '/form/advanced-form',
        name: 'advancedform',
        authority: ['admin'],
        component: './Forms/AdvancedForm',
      },
    ],
  },
  // list
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        path: '/list/table-list',
        name: 'searchtable',
        component: './List/TableList',
      },
      {
        path: '/list/basic-list',
        name: 'basiclist',
        component: './List/BasicList',
      },
      {
        path: '/list/card-list',
        name: 'cardlist',
        component: './List/CardList',
      },
      {
        path: '/list/search',
        name: 'searchlist',
        component: './List/List',
        routes: [
          {
            path: '/list/search',
            redirect: '/list/search/articles',
          },
          {
            path: '/list/search/articles',
            name: 'articles',
            component: './List/Articles',
          },
          {
            path: '/list/search/projects',
            name: 'projects',
            component: './List/Projects',
          },
          {
            path: '/list/search/applications',
            name: 'applications',
            component: './List/Applications',
          },
        ],
      },
    ],
  },
  // profile
  {
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    routes: [
      // profile
      {
        path: '/profile/basic',
        name: 'basic',
        component: './Profile/BasicProfile',
      },
      {
        path: '/profile/advanced',
        name: 'advanced',
        authority: ['admin'],
        component: './Profile/AdvancedProfile',
      },
    ],
  },
  // result
  {
    name: 'result',
    icon: 'check-circle-o',
    path: '/result',
    routes: [
      // result
      {
        path: '/result/success',
        name: 'success',
        component: './Result/Success',
      },
      { path: '/result/fail', name: 'fail', component: './Result/Error' },
    ],
  },
  // account
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account/center',
        name: 'center',
        component: './Account/Center/Center',
        routes: [
          {
            path: '/account/center',
            redirect: '/account/center/articles',
          },
          {
            path: '/account/center/articles',
            component: './Account/Center/Articles',
          },
          {
            path: '/account/center/applications',
            component: './Account/Center/Applications',
          },
          {
            path: '/account/center/projects',
            component: './Account/Center/Projects',
          },
        ],
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: './Account/Settings/Info',
        routes: [
          {
            path: '/account/settings',
            redirect: '/account/settings/base',
          },
          {
            path: '/account/settings/base',
            component: './Account/Settings/BaseView',
          },
          {
            path: '/account/settings/security',
            component: './Account/Settings/SecurityView',
          },
          {
            path: '/account/settings/binding',
            component: './Account/Settings/BindingView',
          },
          {
            path: '/account/settings/notification',
            component: './Account/Settings/NotificationView',
          },
        ],
      },
    ],
  },
  // xeto develop platform
  {
    name: 'develop',
    path: '/develop',
    icon: 'user',
    routes: [
      {
        path: '/develop/basic01',
        name: '1.Basic layout',
        component: './Develop/Basic01Layout',
      },
      {
        path: '/develop/basic02',
        name: '2.Basic table',
        component: './Develop/Basic02Table',
      },
      {
        path: '/develop/basic03',
        name: '3.Basic form',
        component: './Develop/Basic03Form',
      },
      {
        path: '/develop/basic04',
        name: '4.Upload file',
        component: './Develop/Basic04UploadFile',
      },
      {
        path: '/develop/basic05',
        name: '5.Web API',
        component: './Develop/Basic05WebApi',
      },
      {
        path: '/develop/basic06',
        name: '6.Common Table',
        component: './_Template/T02_TableComponent',
      },
    ],
  },
  // component (XZ: 因为没有指定 path，所以，所有path没找到的，都会跳到 404 中)
  {
    component: '404',
  },
];