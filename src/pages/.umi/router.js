import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Work/Projects/XTO/web/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Login'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Register'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/RegisterResult'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/exception",
    "name": "exception",
    "icon": "warning",
    "routes": [
      {
        "path": "/exception/403",
        "name": "not-permission",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/403'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/exception/404",
        "name": "not-find",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/exception/500",
        "name": "server-error",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/500'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/exception/trigger",
        "name": "trigger",
        "hideInMenu": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/TriggerException'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/eai/alibabacallbackhome",
        "exact": true
      },
      {
        "path": "/my",
        "name": "个人中心",
        "icon": "user",
        "routes": [
          {
            "path": "/my/index",
            "name": "我的指挥舱",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/my/task",
            "name": "我的任务",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/my/approval",
            "name": "我的审批",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/my/report",
            "name": "我的报告",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/my/tools",
            "name": "我的工具",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/monitor",
        "name": "执行监控",
        "icon": "user",
        "routes": [
          {
            "path": "/monitor/bid",
            "name": "投标分析-MVP",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Monitor/models/BidModel.js').then(m => { return { namespace: 'BidModel',...m.default}})
],
  component: () => import('../Monitor/Bid'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/contract",
            "name": "合同分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/salesorder",
            "name": "订单分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/payment",
            "name": "收付款分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/schedule",
            "name": "进度分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/cost",
            "name": "成本分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/monitor/quality",
            "name": "质量分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "http://xtoapi.biztalkgroup.com/hangfire",
            "name": "后台服务",
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/marketing",
        "name": "市场拓展",
        "icon": "user",
        "routes": [
          {
            "path": "/marketing/news",
            "name": "市场动态",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/marketing/strategy",
            "name": "销售策略",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/marketing/activity",
            "name": "市场活动",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/marketing/customer",
            "name": "客户管理-MVP",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Customer/models/CustomerModel.js').then(m => { return { namespace: 'CustomerModel',...m.default}})
],
  component: () => import('../Customer/Index'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/evaluation",
        "name": "机会评审",
        "icon": "user",
        "routes": [
          {
            "path": "/evaluation/opportunity",
            "name": "机会登记-MVP",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Opportunity/models/OpportunityModel.js').then(m => { return { namespace: 'OpportunityModel',...m.default}})
],
  component: () => import('../Opportunity/OpportunityComponent'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/evaluation/decision",
            "name": "立项决策",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/evaluation/biddecision",
            "name": "投标决策",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/evaluation/analysis",
            "name": "需求分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/evaluation/risk",
            "name": "风险识别",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/bidding",
        "name": "项目投标",
        "icon": "user",
        "routes": [
          {
            "path": "/bidding/bidproparation",
            "name": "投标准备",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/bizproposal",
            "name": "商务方案",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/techproposal",
            "name": "技术方案",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/division",
            "name": "偏差分析",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/issue",
            "name": "问题澄清",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/riskidentification",
            "name": "风险识别",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/bidsolution",
            "name": "投标方案",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/biddocument",
            "name": "投标文件",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/bidding/bidresult",
            "name": "评标结果",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/contract",
        "name": "项目合同",
        "icon": "user",
        "routes": [
          {
            "path": "/contract/approval",
            "name": "合同审签",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/contract/negotiation",
            "name": "合同谈判",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/contract/stamp",
            "name": "合同签订",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/contract/change",
            "name": "合同变更",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/contract/handover",
            "name": "合同移交",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/initiation",
        "name": "项目启动",
        "icon": "user",
        "routes": [
          {
            "path": "/initiation/handover",
            "name": "合同交接",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/initiation/meeting",
            "name": "项目启动",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/initiation/schedule",
            "name": "项目计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/initiation/cost",
            "name": "成本计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/initiation/quality",
            "name": "质量计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/initiation/payment",
            "name": "收款计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/design",
        "name": "产品设计",
        "icon": "user",
        "routes": [
          {
            "path": "/design/measurement",
            "name": "现场测量",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/technology",
            "name": "工艺设计",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/mechanical",
            "name": "结构设计",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/electrical",
            "name": "电气设计",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "系统设计",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "长交期物料",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "客供件",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/design/ecn",
            "name": "工程变更通知",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/manufacture",
        "name": "生产制造",
        "icon": "user",
        "routes": [
          {
            "path": "/manufacture/manufactureplan",
            "name": "排产计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/manufacture/materialplan",
            "name": "物料计划",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/manufacture/selfmanufactured",
            "name": "半成品",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/manufacture/fas",
            "name": "总装",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/quality",
        "name": "成品检验",
        "icon": "user",
        "routes": [
          {
            "path": "/quality/fat",
            "name": "FAT",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/quality/qc",
            "name": "出厂验收",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/quality/stock",
            "name": "成品入库",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/delivery",
        "name": "包装发货",
        "icon": "user",
        "routes": [
          {
            "path": "/delivery/credit",
            "name": "客户信控",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/delivery/packing",
            "name": "装箱",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/delivery/delivery",
            "name": "发货",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/delivery/logistics",
            "name": "物流跟踪",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/acceptance",
        "name": "客户验收",
        "icon": "user",
        "routes": [
          {
            "path": "/acceptance/obi",
            "name": "开箱检验",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/acceptance/checking",
            "name": "安全调试",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/close",
        "name": "订单结算",
        "icon": "user",
        "routes": [
          {
            "path": "/close/warranty",
            "name": "质保",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/close/finance",
            "name": "财务关闭",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Develop/models/DefaultModel.js').then(m => { return { namespace: 'DefaultModel',...m.default}})
],
  component: () => import('../Develop/404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/eai",
        "name": "应用集成",
        "icon": "user",
        "routes": [
          {
            "path": "/eai/accesstoken",
            "name": "Token 管理",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Background/models/AccessTokenModel.js').then(m => { return { namespace: 'AccessTokenModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaCallbackModel.js').then(m => { return { namespace: 'AlibabaCallbackModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaMessageModel.js').then(m => { return { namespace: 'AlibabaMessageModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaProductCategoryModel.js').then(m => { return { namespace: 'AlibabaProductCategoryModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/DataSyncServiceModel.js').then(m => { return { namespace: 'DataSyncServiceModel',...m.default}})
],
  component: () => import('../Background/AccessTokenComponent'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/eai/datasyncservice",
            "name": "数据同步服务",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Background/models/AccessTokenModel.js').then(m => { return { namespace: 'AccessTokenModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaCallbackModel.js').then(m => { return { namespace: 'AlibabaCallbackModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaMessageModel.js').then(m => { return { namespace: 'AlibabaMessageModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaProductCategoryModel.js').then(m => { return { namespace: 'AlibabaProductCategoryModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/DataSyncServiceModel.js').then(m => { return { namespace: 'DataSyncServiceModel',...m.default}})
],
  component: () => import('../Background/DataSyncServiceComponent'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/eai/productcategory",
            "name": "商品货号",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Background/models/AccessTokenModel.js').then(m => { return { namespace: 'AccessTokenModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaCallbackModel.js').then(m => { return { namespace: 'AlibabaCallbackModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaMessageModel.js').then(m => { return { namespace: 'AlibabaMessageModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaProductCategoryModel.js').then(m => { return { namespace: 'AlibabaProductCategoryModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/DataSyncServiceModel.js').then(m => { return { namespace: 'DataSyncServiceModel',...m.default}})
],
  component: () => import('../Background/AlibabaProductCategoryHome'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/eai/alibabacallbackhome",
            "name": "数据接收",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Background/models/AccessTokenModel.js').then(m => { return { namespace: 'AccessTokenModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaCallbackModel.js').then(m => { return { namespace: 'AlibabaCallbackModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaMessageModel.js').then(m => { return { namespace: 'AlibabaMessageModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaProductCategoryModel.js').then(m => { return { namespace: 'AlibabaProductCategoryModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/DataSyncServiceModel.js').then(m => { return { namespace: 'DataSyncServiceModel',...m.default}})
],
  component: () => import('../Background/AlibabaCallbackHome'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/eai/alibabamessagehome",
            "name": "数据回传",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/Background/models/AccessTokenModel.js').then(m => { return { namespace: 'AccessTokenModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaCallbackModel.js').then(m => { return { namespace: 'AlibabaCallbackModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaMessageModel.js').then(m => { return { namespace: 'AlibabaMessageModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/AlibabaProductCategoryModel.js').then(m => { return { namespace: 'AlibabaProductCategoryModel',...m.default}}),
  import('/Work/Projects/XTO/web/src/pages/Background/models/DataSyncServiceModel.js').then(m => { return { namespace: 'DataSyncServiceModel',...m.default}})
],
  component: () => import('../Background/AlibabaCallbackMessageHome'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "http://xtoapi.biztalkgroup.com/hangfire",
            "name": "后台服务",
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/system",
        "name": "Organization",
        "icon": "user",
        "authority": [
          "admin"
        ],
        "routes": [
          {
            "path": "/system/organizations",
            "name": "Organization",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/System/models/UserCenterModel.js').then(m => { return { namespace: 'UserCenterModel',...m.default}})
],
  component: () => import('../System/OrganizationCenter'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/system/center",
            "name": "User",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Work/Projects/XTO/web/src/pages/System/models/UserCenterModel.js').then(m => { return { namespace: 'UserCenterModel',...m.default}})
],
  component: () => import('../System/UserManagement'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('/Work/Projects/XTO/web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Work/Projects/XTO/web/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
