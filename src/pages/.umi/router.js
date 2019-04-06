import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Work/Dotnet/XTOPMSWEB/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
        "component": dynamic({ loader: () => import('../Exception/403'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/exception/404",
        "name": "not-find",
        "component": dynamic({ loader: () => import('../Exception/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/exception/500",
        "name": "server-error",
        "component": dynamic({ loader: () => import('../Exception/500'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/exception/trigger",
        "name": "trigger",
        "hideInMenu": true,
        "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/my/task",
            "name": "我的任务",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/my/approval",
            "name": "我的审批",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/my/report",
            "name": "我的报告",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/my/tools",
            "name": "我的工具",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Monitor/Bid'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/contract",
            "name": "合同分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/salesorder",
            "name": "订单分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/payment",
            "name": "收付款分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/schedule",
            "name": "进度分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/cost",
            "name": "成本分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/monitor/quality",
            "name": "质量分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/marketing/strategy",
            "name": "销售策略",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/marketing/activity",
            "name": "市场活动",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/marketing/customer",
            "name": "客户管理-MVP",
            "component": dynamic({ loader: () => import('../Customer/Index'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/evaluation",
        "name": "项目确立",
        "icon": "user",
        "routes": [
          {
            "path": "/evaluation/register",
            "name": "机会登记",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/evaluation/decision",
            "name": "立项决策",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/evaluation/biddecision",
            "name": "投标决策",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/evaluation/analysis",
            "name": "需求分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/evaluation/risk",
            "name": "风险识别",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/bizproposal",
            "name": "商务方案",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/techproposal",
            "name": "技术方案",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/division",
            "name": "偏差分析",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/issue",
            "name": "问题澄清",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/riskidentification",
            "name": "风险识别",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/bidsolution",
            "name": "投标方案",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/biddocument",
            "name": "投标文件",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/bidding/bidresult",
            "name": "评标结果",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/contract/negotiation",
            "name": "合同谈判",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/contract/stamp",
            "name": "合同签订",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/contract/change",
            "name": "合同变更",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/contract/handover",
            "name": "合同移交",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/initiation/meeting",
            "name": "项目启动",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/initiation/schedule",
            "name": "项目计划",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/initiation/cost",
            "name": "成本计划",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/initiation/quality",
            "name": "质量计划",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/initiation/payment",
            "name": "收款计划",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/technology",
            "name": "工艺设计",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/mechanical",
            "name": "结构设计",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/electrical",
            "name": "电气设计",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "系统设计",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "长交期物料",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/marketactivities",
            "name": "客供件",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/design/ecn",
            "name": "工程变更通知",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/manufacture/materialplan",
            "name": "物料计划",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/manufacture/selfmanufactured",
            "name": "半成品",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/manufacture/fas",
            "name": "总装",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/quality/qc",
            "name": "出厂验收",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/quality/stock",
            "name": "成品入库",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/delivery/packing",
            "name": "装箱",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/delivery/delivery",
            "name": "发货",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/delivery/logistics",
            "name": "物流跟踪",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/acceptance/checking",
            "name": "安全调试",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/close/finance",
            "name": "财务关闭",
            "component": dynamic({ loader: () => import('../Develop/404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "path": "/system/ou",
            "name": "OU",
            "component": dynamic({ loader: () => import('../System/OrganizationUnit'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/system/organizations",
            "name": "Organization",
            "component": dynamic({ loader: () => import('../System/OrganizationCenter'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/system/usercenter/",
            "name": "User",
            "component": dynamic({ loader: () => import('../System/UserCenter'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": dynamic({ loader: () => import('../Dashboard/Analysis'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": dynamic({ loader: () => import('../Dashboard/Monitor'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": dynamic({ loader: () => import('../Forms/BasicForm'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "stepform",
            "component": dynamic({ loader: () => import('../Forms/StepForm'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form",
                "redirect": "/form/step-form/info",
                "exact": true
              },
              {
                "path": "/form/step-form/info",
                "name": "info",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step1'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "confirm",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step2'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "result",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step3'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/form/advanced-form",
            "name": "advancedform",
            "authority": [
              "admin"
            ],
            "component": dynamic({ loader: () => import('../Forms/AdvancedForm'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": dynamic({ loader: () => import('../List/TableList'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": dynamic({ loader: () => import('../List/BasicList'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": dynamic({ loader: () => import('../List/CardList'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": dynamic({ loader: () => import('../List/List'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/list/search",
                "redirect": "/list/search/articles",
                "exact": true
              },
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": dynamic({ loader: () => import('../List/Articles'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": dynamic({ loader: () => import('../List/Projects'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": dynamic({ loader: () => import('../List/Applications'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": dynamic({ loader: () => import('../Profile/BasicProfile'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/profile/advanced",
            "name": "advanced",
            "authority": [
              "admin"
            ],
            "component": dynamic({ loader: () => import('../Profile/AdvancedProfile'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": dynamic({ loader: () => import('../Result/Success'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": dynamic({ loader: () => import('../Result/Error'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": dynamic({ loader: () => import('../Account/Center/Center'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/account/center",
                "redirect": "/account/center/articles",
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": dynamic({ loader: () => import('../Account/Center/Articles'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": dynamic({ loader: () => import('../Account/Center/Applications'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": dynamic({ loader: () => import('../Account/Settings/Info'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": dynamic({ loader: () => import('../Account/Settings/BaseView'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": dynamic({ loader: () => import('../Account/Settings/SecurityView'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": dynamic({ loader: () => import('../Account/Settings/BindingView'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": dynamic({ loader: () => import('../Account/Settings/NotificationView'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "develop",
        "path": "/develop",
        "icon": "user",
        "routes": [
          {
            "path": "/develop/basic01",
            "name": "1.Basic layout",
            "component": dynamic({ loader: () => import('../Develop/Basic01Layout'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/develop/basic02",
            "name": "2.Basic table",
            "component": dynamic({ loader: () => import('../Develop/Basic02Table'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/develop/basic03",
            "name": "3.Basic form",
            "component": dynamic({ loader: () => import('../Develop/Basic03Form'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/develop/basic04",
            "name": "4.Upload file",
            "component": dynamic({ loader: () => import('../Develop/Basic04UploadFile'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/develop/basic05",
            "name": "4.Web API",
            "component": dynamic({ loader: () => import('../Develop/Basic05WebApi'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Work/Dotnet/XTOPMSWEB/node_modules/.1.2.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
