import ant_router from './router.ant.config';

/* 在这里配置菜单和权限 */
export default [
  // user login & register
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // exception
  {
    path: '/exception',
    name: 'exception',
    icon: 'warning',
    routes: [
      // exception
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: './Exception/500',
      },
      {
        path: '/exception/trigger',
        name: 'trigger',
        hideInMenu: true,
        component: './Exception/TriggerException',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'], // 在这里控制访问权限
    routes: [
      // site default path to "/"
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/my',
        name: '个人中心',
        icon: 'user',
        routes: [
          {
            path: '/my/index',
            name: '我的指挥舱',
            component: './Develop/404',
          },
          {
            path: '/my/task',
            name: '我的任务',
            component: './Develop/404',
          },
          {
            path: '/my/approval',
            name: '我的审批',
            component: './Develop/404',
          },
          {
            path: '/my/report',
            name: '我的报告',
            component: './Develop/404',
          },
          {
            path: '/my/tools',
            name: '我的工具',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/monitor',
        name: '执行监控',
        icon: 'user',
        routes: [
          {
            path: '/monitor/bid',
            name: '投标分析-MVP',
            component: './Monitor/Bid',
          },
          {
            path: '/monitor/contract',
            name: '合同分析',
            component: './Develop/404',
          },
          {
            path: '/monitor/salesorder',
            name: '订单分析',
            component: './Develop/404',
          },
          {
            path: '/monitor/payment',
            name: '收付款分析',
            component: './Develop/404',
          },
          {
            path: '/monitor/schedule',
            name: '进度分析',
            component: './Develop/404',
          },
          {
            path: '/monitor/cost',
            name: '成本分析',
            component: './Develop/404',
          },
          {
            path: '/monitor/quality',
            name: '质量分析',
            component: './Develop/404',
          },
          {
            path: 'http://xtoapi.biztalkgroup.com/hangfire',
            name: '后台服务',
            // component: './Develop/404',
          },
        ]
      },
      // ################### 市场阶段 ##################
      {
        path: '/marketing',
        name: '市场拓展',
        icon: 'user',
        routes: [
          {
            path: '/marketing/news',
            name: '市场动态',
            component: './Develop/404',
          },
          {
            path: '/marketing/strategy',
            name: '销售策略',
            component: './Develop/404',
          },
          {
            path: '/marketing/activity',
            name: '市场活动',
            component: './Develop/404',
          },
          {
            path: '/marketing/customer',
            name: '客户管理-MVP',
            component: './Customer/Index',
          },
        ]
      },
      // ################### 市场阶段 ##################
      {
        path: '/evaluation',
        name: '机会评审',
        icon: 'user',
        routes: [
          {
            path: '/evaluation/opportunity',
            name: '机会登记-MVP',
            component: './Opportunity/OpportunityComponent',
          },
          {
            path: '/evaluation/decision',
            name: '立项决策',
            component: './Develop/404',
          },
          {
            path: '/evaluation/biddecision',
            name: '投标决策',
            component: './Develop/404',
          },
          {
            path: '/evaluation/analysis',
            name: '需求分析',
            component: './Develop/404',
          },
          {
            path: '/evaluation/risk',
            name: '风险识别',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/bidding',
        name: '项目投标',
        icon: 'user',
        routes: [
          {
            path: '/bidding/bidproparation', 
            name: '投标准备',
            component: './Develop/404',
          },
          {
            path: '/bidding/bizproposal',
            name: '商务方案',
            component: './Develop/404',
          },
          {
            path: '/bidding/techproposal',
            name: '技术方案',
            component: './Develop/404',
          },
          {
            path: '/bidding/division',
            name: '偏差分析',
            component: './Develop/404',
          },
          {
            path: '/bidding/issue',
            name: '问题澄清',
            component: './Develop/404',
          },
          {
            path: '/bidding/riskidentification',
            name: '风险识别',
            component: './Develop/404',
          },
          {
            path: '/bidding/bidsolution',
            name: '投标方案',
            component: './Develop/404',
          },
          {
            path: '/bidding/biddocument',
            name: '投标文件',
            component: './Develop/404',
          },
          {
            path: '/bidding/bidresult',
            name: '评标结果',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/contract',
        name: '项目合同',
        icon: 'user',
        routes: [
          {
            path: '/contract/approval',
            name: '合同审签',
            component: './Develop/404',
          },
          {
            path: '/contract/negotiation',
            name: '合同谈判',
            component: './Develop/404',
          },
          {
            path: '/contract/stamp',
            name: '合同签订',
            component: './Develop/404',
          },
          {
            path: '/contract/change',
            name: '合同变更',
            component: './Develop/404',
          },
          {
            path: '/contract/handover',
            name: '合同移交',
            component: './Develop/404',
          },
        ]
      },
      // #################################
      {
        path: '/initiation',
        name: '项目启动',
        icon: 'user',
        routes: [
          {
            path: '/initiation/handover',
            name: '合同交接',
            component: './Develop/404',
          },
          {
            path: '/initiation/meeting',
            name: '项目启动',
            component: './Develop/404',
          },
          {
            path: '/initiation/schedule',
            name: '项目计划',
            component: './Develop/404',
          },
          {
            path: '/initiation/cost',
            name: '成本计划',
            component: './Develop/404',
          },
          {
            path: '/initiation/quality',
            name: '质量计划',
            component: './Develop/404',
          },
          {
            path: '/initiation/payment',
            name: '收款计划',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/design',
        name: '产品设计',
        icon: 'user',
        routes: [
          {
            path: '/design/measurement',
            name: '现场测量',
            component: './Develop/404',
          },
          {
            path: '/design/technology',
            name: '工艺设计',
            component: './Develop/404',
          },
          {
            path: '/design/mechanical',
            name: '结构设计',
            component: './Develop/404',
          },
          {
            path: '/design/electrical',
            name: '电气设计',
            component: './Develop/404',
          },
          {
            path: '/design/marketactivities',
            name: '系统设计',
            component: './Develop/404',
          },
          {
            path: '/design/marketactivities',
            name: '长交期物料',
            component: './Develop/404',
          },
          {
            path: '/design/marketactivities',
            name: '客供件',
            component: './Develop/404',
          },
          {
            path: '/design/ecn',
            name: '工程变更通知',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/manufacture',
        name: '生产制造',
        icon: 'user',
        routes: [
          {
            path: '/manufacture/manufactureplan',
            name: '排产计划',
            component: './Develop/404',
          },
          {
            path: '/manufacture/materialplan',
            name: '物料计划',
            component: './Develop/404',
          },
          {
            path: '/manufacture/selfmanufactured',
            name: '半成品',
            component: './Develop/404',
          },
          {
            path: '/manufacture/fas', // final assemble schedule
            name: '总装',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/quality',
        name: '成品检验',
        icon: 'user',
        routes: [
          {
            path: '/quality/fat',
            name: 'FAT',
            component: './Develop/404',
          },
          {
            path: '/quality/qc',
            name: '出厂验收',
            component: './Develop/404',
          },
          {
            path: '/quality/stock',
            name: '成品入库',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/delivery',
        name: '包装发货',
        icon: 'user',
        routes: [
          {
            path: '/delivery/credit',
            name: '客户信控',
            component: './Develop/404',
          },
          {
            path: '/delivery/packing',
            name: '装箱',
            component: './Develop/404',
          },
          {
            path: '/delivery/delivery',
            name: '发货',
            component: './Develop/404',
          },
          {
            path: '/delivery/logistics',
            name: '物流跟踪',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/acceptance',
        name: '客户验收',
        icon: 'user',
        routes: [
          {
            path: '/acceptance/obi', // open-box inspection
            name: '开箱检验',
            component: './Develop/404',
          },
          {
            path: '/acceptance/checking',
            name: '安全调试',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/close',
        name: '订单结算',
        icon: 'user',
        routes: [
          {
            path: '/close/warranty',
            name: '质保',
            component: './Develop/404',
          },
          {
            path: '/close/finance',
            name: '财务关闭',
            component: './Develop/404',
          },
        ]
      },
      {
        path: '/eai',
        name: '应用集成',
        icon: 'user',
        routes: [
          {
            path: '/eai/accesstoken',
            name: 'Token 管理',
            component: './Background/AccessTokenComponent',
          },
          {
            path: '/eai/datasyncservice',
            name: '数据同步服务',
            component: './Background/DataSyncServiceComponent',
          },
          {
            path: '/eai/productcategory',
            name: '商品货号',
            component: './Background/AlibabaProductCategoryHome',
          },
          {
            path: '/eai/alibabacallbackhome',
            name: '数据回传',
            component: './Background/AlibabaCallbackMessageHome',
          },
        ]
      },
      ...ant_router,
      // component (XZ: 因为没有指定 path，所以，所有path没找到的，都会跳到 404 中)
      {
        component: '404',
      },
    ],
  },
];
