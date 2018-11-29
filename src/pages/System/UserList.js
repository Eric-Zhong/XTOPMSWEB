/*
DVA Tutorial: 2.定义 View Component

2.1 用 class 来定义 component. class myComponent extends React.PureComponent {...}
2.2 定义及初始化 props
2.2.1 用 constructor(props) 构造函数进行初始化，props 为 model 中定义的 props，并且 readonly. 如果不初始化state以及不绑定method时，可以不定义constructor.
2.2.1.1 初始化当前 component 的 state. 直接用 this.state 进行赋值
2.2.1.2 初始化当前 component 的 event. 直接用 this.eventName = this.event.bind(this) 进行定义
2.2.1.3 注：非 constructor 函数中如果要修改 this.state 时，只能使用 this.setState() 来执行。不能用 this.state = ...
2.2.1.4 注：尽量不要将 props 中的数据传给 state, 如 this.state = {color: props.color}. component 中可以直接用 props.color进行访问.
2.2.1.5 注：state 使用 props 中需要注意的问题，参考 https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html 
2.3 用 static propType = {} 来定义 component 中的每个 prop 的类型
2.4 用 static defaultProps = {} 来为 prop 定义默认值
2.5 在 componentDidMount() 里，定义当 DOM 已经完全加载后，需要加载的数据.
2.5.1 使用 this.setState() 来改变 this.state 中的数据，同时它会触发 render() 的执行.
2.5.2 技巧：如果在 componentDidMount() 中才初始化 this.state 中的数据，会造成两次 render(). 所以，初始化的动作最好放在 constructor() 中完成.
2.6 在 componentDidUpdate(prevProps) 里，定义当 props 发生状态改变时需要执行的方法. 如 this.props.userId !== prevProps.userId 时，将执行这里的代码.
2.7 在 componentDidUnmount() 里，定义 component 被销毁时需要执行的代码. 这里就不要再执行 this.setState() 了.
2.8 在 shouldComponentUpdate(nextProps, nextState) 中定义 React component 是否判断成被更新
2.9 在 static getDerivedStateFromProps(props, state) 定义在 render 之前的判断，并返回需要更新的 state, 如果不更新，返回 null.
2.10 在 getSnapshotBeforeUpdate(preProps, prevState) TBD // TODO: 没找到更容易理解的说法
2.11 在 static getDerivedStateFromError(err) 中定义如果子 component 出错时的异常处理.
2.12 在 componentDidCatch(error, info) 中定义子 component 出错时的异常处理逻辑.

Component Instance Properties
props：从父component传入的props
state：自己的数据区

setState() 写法
1.
this.setState((state, props)=>{
  return {count: state.counter + props.step};
});
2.
this.setState({count: 2});
3.
this.setState((state)=>{
  return {count: state.count + 1};
});

forceUpdate() : 通知 component 必须执行 render().



KB Reference：

谈一谈创建React Component的几种方式
https://www.cnblogs.com/Unknw/p/6431375.html

React 的 PureComponent Vs Component
https://www.jianshu.com/p/c41bbbc20e65
*/

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UserList.less';

/* eslint react/no-multi-comp:0 */
// @connect(({ userList }) => ({
//   userList: userList,
// }))

// 如果理解 @connect
// 这个解答简单解释了 @connect 的使用方式 https://segmentfault.com/q/1010000014722170 
// 这个解释了 connect 的使用方法 https://www.jb51.net/article/132802.htm 

/*
Connect 最普通的写法是：

function mapStateToProps(state){
  return state.main;
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(action,dispatch); // bindActionCreators(..) 是 Redux 中的函数
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

使用 @connect 写法，实际它只是实现了 connect(mapStateToProps);  mapDispatchToProps 已经默认集成。
在 Umi 中，就可以写成如下：
@connect(mapStateToProps)

为了美化，还可以再简化
@connect((state)=>{
  state.main
})

如何使用 @connect 看这里： https://blog.csdn.net/zl1zl2zl3/article/details/81357146
*/

// 见 @connect 是如何完成 connect 操作的
/*
connect 有两个参数, mapStateToProps, mapDispatchToProps. 一个将状态绑定到组件的props, 一个将方法绑定到组件的props

以下是简写方式，将名称为 model 的实体中的 state 绑定到当前组件的 props 上。
@connect((model)=>{
  model
})
*/
@connect((xtouser, loading)=>({ // 将 xtouser 这个 model 中定义的 state 绑定到当前组件的 this.props 上. 
  xtouser,
  loading: false,
}))
@Form.create()
class TableList extends PureComponent {

  // 2.2
  state = {
    selectedRows: [],
  };

  // StandardTable 的 Column 定义
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      // dataIndex: 'lastLoginTime',
      render: (text, record) => {
        let status = 'Unknow';
        if(text){
          status = 'Activie';
        }else{
          status = 'In-Active';
        }
        return status;
      }
    },
    {
      title: 'Last Login Time',
      dataIndex: 'lastLoginTime',
      sorter: true,
      render: (val) => {
        if(val)
          return <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>;
        else
          return <span>-</span>
      },
    },
    {
      title: 'Creation Time',
      dataIndex: 'creationTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
  ];

  // 2.5
  // React 当所有 DOM 都已经初始化好后，执行这个事件
  // 一般用它来初始化 UI 上组件的值
  componentDidMount() {
    // 从 Parent Component 传入的 props 中，获取定义的 dispatch 函数
    const { dispatch } = this.props;
    // DOM 都 Mount 后，调用 Model 的 effecter 去执行相关数据的获取 
    // 发送一个 Action 给 Model 的 effecters, 通过 type 来被别是哪个具体的 function.
    // 参数 model = xtouser
    // 参数 effecter = query
    dispatch({
      type: 'xtouser/query',
      payload: {
        skipCount: 0,
        maxResultCount: 100
      }
    });
    // console.log('Pages.System.UserList.ComponentDidMount()');
    // console.log(this.state);
    // console.log(this.props);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'xtouser/query',
      payload: params,
    });
  };

  render() {

    // 从当前 props 中获取需要的 信息，此信息在 render 是不能被修改的
    const {
      xtouser: {model},
      loading,
    } = this.props;

    const { selectedRows } = this.state;    

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              rowKey='id'
              selectedRows={selectedRows}
              loading={loading}
              data={model.data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
