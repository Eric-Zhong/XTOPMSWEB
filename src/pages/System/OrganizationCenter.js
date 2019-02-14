import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {formatMessage} from 'umi/locale';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Tree,
} from 'antd';
const {TreeNode} = Tree;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import styles from './UserList.less';

@connect((usercenter, loading)=>({
  usercenter,
  loading: usercenter.loading.models.xtouser,
}))
@Form.create()
class OrganizationCenterComponent extends PureComponent {

  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'usercenter/getOU',
      payload: []
    });
  }

  columns = [
    {
      title: formatMessage({id:'app.text.id'}),
      dataIndex: 'id',
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
      title: formatMessage({id:'app.text.user_account'}),
      dataIndex: 'userName',
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
  ];


  render() {

    const {
      usercenter: {usercenter, loading},
    } = this.props;

    const organizationTree = usercenter.organization;
    const organizationUsers = [];
    const { selectedRows } = this.state;
    
    return (
      <PageHeaderWrapper title={formatMessage({id: 'app.system.organization.title'})}>
        <Card bordered={false}>
          <Row>
            <Col span="6">
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button 
                  type='primary'
                  >{formatMessage({id:'app.text.new_create'})}</Button>
                  <Button 
                  type='primary'
                  >{formatMessage({id:'app.text.setting'})}</Button>
                </div>
              </div>
              <Tree
                defaultExpandAll
                showLine>
                <TreeNode title="集团总公司" key="1">
                <TreeNode title="北京" key="2"></TreeNode>
                <TreeNode title="上海" key="3"></TreeNode>
                </TreeNode>
              </Tree>
            </Col>
            <Col span="18">
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button 
                  type='primary'
                  >{formatMessage({id:'app.text.add'})}</Button>
                  <Button 
                  type='primary'
                  >{formatMessage({id:'app.text.delete'})}</Button>
                </div>
                <StandardTable
                rowKey='id'
                selectedRows={selectedRows}
                columns={this.columns}
                data={organizationUsers}
                size='small'
                />
              </div>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  };


}

export default OrganizationCenterComponent;
