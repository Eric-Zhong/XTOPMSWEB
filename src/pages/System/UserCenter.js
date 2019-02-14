import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {formatMessage} from 'umi/locale';
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
import CreateUserDialog from './components/CreateUserDailog';

import styles from './UserList.less';

@connect((usercenter, loading)=>({
  usercenter,
  loading: usercenter.loading.models.xtouser,
}))
@Form.create()
class UserCenterComponent extends PureComponent {

  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: formatMessage({id:'app.text.id'}),
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: formatMessage({id:'app.text.user_account'}),
      dataIndex: 'userName',
      sorter: true,
    },
    {
      title: formatMessage({id:'app.text.user_name'}),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: formatMessage({id:'app.text.surname'}),
      dataIndex: 'surname',
      sorter: true,
    },
    {
      title: formatMessage({id:'app.text.email'}),
      dataIndex: 'emailAddress',
      sorter: true,
    },
    {
      title: formatMessage({id:'app.text.status'}),
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
      title: formatMessage({id:'app.text.last_login_time'}),
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
      title: formatMessage({id:'app.text.creation_time'}),
      dataIndex: 'creationTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    /*
    ! 这里是初始化时的数据查询，默认值暂时设置成0,10
    */
    const pagination = {
      currentPage: 1, 
      pageSize: 10
    }
    dispatch({
      type: 'usercenter/query', // 调用 UserCenter Model 中定义的 Query effecter.
      payload: pagination
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    // * 分页、过滤、排序的查询条件
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
      type: 'usercenter/query',
      payload: params,
    });
  };

  render() {

    // 通过映射，从this.props中取数据并赋值
    const {
      usercenter: {usercenter, loading},
    } = this.props;

    const showCreateUserDialog = usercenter.showCreateUserDialog;
    const userIsCreating = usercenter.userIsCreating;
    const { selectedRows } = this.state;    

    return (
      <PageHeaderWrapper title={formatMessage({id: 'app.system.usercenter.title'})}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button 
                type='primary'
                onClick={this.onOpenCreateUserWindow}
                >{formatMessage({id:'app.text.new_create'})}</Button>
            </div>
            <StandardTable
                rowKey='id'
                selectedRows={selectedRows}
                loading={loading.models.usercenter}
                data={usercenter.data}
                columns={this.columns}
                onSelectRow={this.onRowSelected}
                onChange={this.handleStandardTableChange}
                size='small'
            />
            <CreateUserDialog
              visible={showCreateUserDialog}
              onCancel={this.onCloseCreateNewUserWindow}
              onOk={this.onSubmitCreateUser}
              confirmLoading={userIsCreating}
            ></CreateUserDialog>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  };


  // 选中 Row 时
  onRowSelected = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  onOpenCreateUserWindow = (e) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'usercenter/openCreateUserDialog',
      playload: []
    });
  };

  onCloseCreateNewUserWindow = (e) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'usercenter/closeCreateUserDialog',
      playload: []
    });
  };

  onSubmitCreateUser = (user) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usercenter/createUser', // 调用 UserCenter Model 中定义的 Query effecter.
      payload: user
    });
    this.onCloseCreateNewUserWindow(null);
  };

}

export default UserCenterComponent;
