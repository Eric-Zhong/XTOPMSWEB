/*
* Apache License, Version 2.0
*
* Copyright (c) 2019 Tigoole
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at:
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
/*
*
* Copyright (c) 2019 Tigoole
*
* Author: Eric-Zhong Xu
*
* Creation: 2019-04-10 13:15:49
 */


import React, { PureComponent } from "react";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Button, Table, Tag, Modal, Row, Rate} from 'antd';
import { connect } from "dva";
import moment from 'moment';
import OpportunityCreationComponent from './Components/OpportunityCreationComponent';
import { snowflakeId } from '@/utils/snowflake';



/**
 * @description Opportunity management home main page.
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-27
 * @class OpportunityIndexComponent
 * @extends {PureComponent}
 */
@connect(({
  opportunity,
  customer,
  user, 
  loading
})=>({
  opportunity,
  customer,
  user,
  loading,
}))
class OpportunityIndexComponent extends PureComponent{

  SERVICE_NAMESPACE = 'opportunity';
  CON_PAGE_TITLE = '机会登记';
  CON_PAGE_CONTENT = '机会的创建、登记、跟踪，以及机会下创建合同，创建项目业务操作。';

  tableOptions = {
    rowKey: 'key',
    bordered: true,
    size: 'small',
    // expandedRowRender,
    showHeader: true,
    // footer,
    // scroll: undefined,
    hasData: false,
    scroll: {
      x: 2500,
      y: 450,
    },
  }

  tablePagination = {
    current: 1,
    pageSize: 10,
    defaultPageSize: 10,
    pageSizeOptions: ['10','20','50','100','500'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total, range) => {
      return '总计: ' + total + ' 条';
    }
  }

  tableColumns = [
    {
      title: '机会名称',
      dataIndex: 'name',
      width: 150,
      fixed: 'left',
    },{
      title: '预计金额',
      dataIndex: 'amount',
      width: 100,
    },{
      title: '销售代表',
      dataIndex: 'salesId',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: '激活',
      dataIndex: 'isActive',
      width: 80,
      render: (cell, record, index) => {
        if(cell){
          return (
            <Tag color="green">已激活</Tag>
          );
        } else {
          return (
            <Tag color="red">未激活</Tag>
          );
        }
      }
    },{
      title: '业主方',
      dataIndex: 'ownerId',
      width: 200,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: '总包方',
      dataIndex: 'generalContractorId',
      width: 200,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: '代理方',
      dataIndex: 'agencyId',
      width: 200,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: 'ERP#',
      dataIndex: 'erpId',
      width: 200,
    },{
      title: '更新时间',
      dataIndex: 'lastModificationTime',
      width: 120,
      render: (cell, raw, index) => {
        if(cell){
          const v = moment(cell).fromNow();
          return v;
          }
      }
    },{
      title: '创建时间',
      dataIndex: 'creationTime',
      width: 120,
      render: (cell, raw, index) => {
        const v = moment(cell).fromNow();
        return v;
      }
    },{
      title: '系统编号',
      dataIndex: 'key',
      width: 280,
    }    
  ]

  /** ############################################# **/

  constructor(props){
    super(props);
    this.state = {
      newOpportunityId: snowflakeId(),  // generate a new snowflake id.
      rowSelection: {},                 // current selected row in the table.
      selectedRowKeys: [],              // selected row in the table.
      data: [],                         // table datasource.
      editEntity: {},                   // generate this entity when select a row. It's well send to edit dialog.
      editorVisible: false,         // edit dialog visible switch.
    }
  }


  /**
   * @description Search opportunity
   * @memberof OpportunityIndexComponent
   */
  handleOnSearch = () =>{
    this.componentDidMount();
  }


  /**
   * @description Open create dialog
   * @memberof OpportunityIndexComponent
   */
  handleOnCreate = () =>{
    const {
      user:{
        currentUser
      }
    } = this.props;

    this.setState({
      newOpportunityId: snowflakeId(),
      editEntity: {
        _model: 'create',
        id: snowflakeId(),
        name: moment().format('YYYYMMDDHHMMSS.') + currentUser.name + ".创建的机会.",
        createUserName: currentUser.name,
        salesId: currentUser.id,
      },
      editorVisible: true,
    });
  }


  /**
   * @description delete the selected record
   * @memberof OpportunityIndexComponent
   */
  handleOnDelete = () => {
  }

  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  tableTitle = () => {
    const {loading} = this.props;
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row>
        <Button onClick={this.handleOnSearch} type="default" icon="search" loading={loading.effects[this.SERVICE_NAMESPACE + '/getAll']}>查询</Button>
        <Button onClick={this.handleOnCreate} type="default" icon="file-add" loading={loading.effects[this.SERVICE_NAMESPACE + '/create']} disabled={loading.global}>新建</Button>
        <Button onClick={this.handleOnDelete} type="danger" icon="delete" loading={loading.effects[this.SERVICE_NAMESPACE + '/remove']} disabled={!hasSelected || loading.global}>删除</Button>
        <Button icon="upload" disabled>导入</Button>
        <Button icon="download" disabled>导出</Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
        </span>
      </Row>
    );
  }


  /**
   * @description Handle the event when confirm to create opp in the creation dialog.
   * @memberof OpportunityIndexComponent
   */
  handleDoCreate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = fieldsValue;
      console.log(formData);
      dispatch({
        type: this.SERVICE_NAMESPACE + '/create',
        payload: formData,
      });

      this.setState({
        newOpportunityId: snowflakeId(),
        editorVisible: false,
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  /**
   * @description Update entity
   * @memberof OpportunityIndexComponent
   */
  handleDoUpdate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = fieldsValue;
      console.log(formData);
      dispatch({
        type: this.SERVICE_NAMESPACE + '/update',
        payload: formData,
      });

      this.setState({
        editorVisible: false,
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  onCancelToCreateOpportunity = () =>{
    this.setState({
      editorVisible: false,
    });
  }


  /**
   * @description 点击record时，弹出编辑对话框
   * @memberof AccessTokenComponent
   */
  handleOnEdit = (record) => {
    this.setState({
      editEntity: {
        _model: 'edit', 
        ...record
      },
      editorVisible: true,
    });
  }




  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + '/getAll',
      payload: {},
    });
  }


  /**
   * @description User selector.
   * @memberof OpportunityIndexComponent
   */
  onCustomerSearch = (value) => {
    console.log(value);
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/search',
      payload: {
        value: value,
        count: 20
      },
    });
  }

  /**
   * @description Output html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-10
   * @returns html
   * @memberof OpportunityIndexComponent
   */
  render() {

    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const {
      opportunity,
      customer,
      user: {
        currentUser
      }
    } = this.props;

    const data = (opportunity.data? opportunity.data.items: []);
    const totalCount = (opportunity.data? opportunity.data.totalCount: 0);

    const paginationOption = {
      ...this.tablePagination,
      total: totalCount,
    }

    return (
      <PageHeaderWrapper
      title={this.CON_PAGE_TITLE}
      content={this.CON_PAGE_CONTENT}
    >
        <Card>
          <Table
            title={this.tableTitle}
            columns={this.tableColumns}
            {...this.tableOptions}
            dataSource={data}
            pagination={paginationOption}
            rowSelection={rowSelection}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
          >
          </Table>
          <OpportunityCreationComponent
            data={this.state.editEntity}
            user={currentUser}
            visible={editorVisible}
            onDoCreate={this.handleDoCreate}
            onDoUpdate={this.handleDoUpdate}
            onCancel={this.onCancelToCreateOpportunity}
            onCustomerSearch={this.onCustomerSearch}
            customerSearchResult={customer.customerSearchResult}
          ></OpportunityCreationComponent>
        </Card>
      </PageHeaderWrapper>
    );
  }

}

export default OpportunityIndexComponent;