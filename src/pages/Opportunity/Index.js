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



@connect(({
  opportunity,
  customer,
  user, 
  loading
})=>({
  opportunity,
  customer,
  user,
  loading: loading.model,
}))
class OpportunityIndexComponent extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      newOpportunityId: snowflakeId(),
      rowSelection: {},
      selectedRowKeys: [],
      data: [],
      showCreationDialog: true,
    }
  }


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


  handleOnCreate = () =>{
    this.setState({
      showCreationDialog: true,
    });
  }


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

    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row>
        <Button type="default" icon="search" disabled>查询</Button>
        <Button onClick={this.handleOnCreate} type="default" icon="file-add">新建</Button>
        <Button onClick={this.handleOnDelete} type="danger" icon="delete">删除</Button>
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
  onConfirmToCreateOpportunity = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = fieldsValue;
      console.log(formData);
      dispatch({
        type: "opportunity/create",
        payload: formData,
      });

      this.setState({
        newOpportunityId: snowflakeId(),
        showCreationDialog: false,
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  onCancelToCreateOpportunity = () =>{
    this.setState({
      newOpportunityId: snowflakeId(),
      showCreationDialog: false,
    });
  }


  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'opportunity/getAll',
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
    const showCreationDialog = this.state.showCreationDialog;

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
        title="机会登记"
        content="机会的创建、登记、跟踪，以及机会下创建合同，创建项目业务操作。"
      >
        <Card>
          <Table
            title={this.tableTitle}
            columns={this.tableColumns}
            {...this.tableOptions}
            dataSource={data}
            pagination={paginationOption}
            rowSelection={rowSelection}
          >
          </Table>
          <OpportunityCreationComponent
            newId={this.state.newOpportunityId}
            user={currentUser}
            visible={showCreationDialog}
            onOk={this.onConfirmToCreateOpportunity}
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