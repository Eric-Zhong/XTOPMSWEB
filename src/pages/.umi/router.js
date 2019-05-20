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
        "name": "机会评审",
        "icon": "user",
        "routes": [
          {
            "path": "/evaluation/opportunity",
            "name": "机会登记-MVP",
            "component": dynamic({ loader: () => import('../Opportunity/OpportunityComponent'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
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
        "path": "/eai",
        "name": "应用集成",
        "icon": "user",
        "routes": [
          {
            "path": "/eai/accesstoken",
            "name": "Token 管理",
            "component": dynamic({ loader: () => import('../Background/AccessTokenComponent'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/eai/datasyncservice",
            "name": "数据同步服务",
            "component": dynamic({ loader: () => import('../Background/DataSyncServiceComponent'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/eai/productcategory",
            "name": "商品货号",
            "component": dynamic({ loader: () => import('../Background/AlibabaProductCategoryHome'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/eai/alibabacallbackhome",
            "name": "数据回传",
            "component": dynamic({ loader: () => import('../Background/AlibabaCallbackMessageHome'), loading: require('/Work/Dotnet/XTOPMSWEB/src/components/PageLoading/index').default }),
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
