import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {formatMessage} from 'umi/locale';
import {
  Card,
  Form,
  Icon,
  Button,
  Tree
} from 'antd';
const {TreeNode} = Tree; 

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CreateUserDialog from './components/CreateUserDailog';

import styles from './UserList.less';
import { debug } from 'util';

@connect((usercenter, loading)=>({
  usercenter,
  loading: usercenter.loading.models.xtouser,
}))
@Form.create()
class OrganizationUnitComponent extends PureComponent {

  state = {
    selectedRows: [],
    organizationUnit: [],
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
    dispatch({
      type: 'usercenter/getOU',
      payload: []
    });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.displayName + '(' + item.childrenCount + ')'} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.displayName} key={item.id} dataRef={item} />;
  })

  render() {

    // 通过映射，从this.props中取数据并赋值
    const {
      usercenter: {usercenter, loading},
    } = this.props;

    const organization = [usercenter.organization];

    return (
      <PageHeaderWrapper title={formatMessage({id: 'app.system.usercenter.title'})}>
        <Card bordered={false}>
          <Tree
            showLine
          >
          </Tree>
        </Card>
      </PageHeaderWrapper>
    );
  };


}

export default OrganizationUnitComponent;
