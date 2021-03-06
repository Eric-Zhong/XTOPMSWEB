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
import {Card, Button, Table, Tag, Modal, Row, Rate, Tooltip} from 'antd';
import { connect } from "dva";
import moment from 'moment';
import OpportunityEditorDialog from './Components/OpportunityEditorDialog';
import { snowflakeId } from '@/utils/snowflake';
import Ellipsis from "@/components/Ellipsis";


/**
 * @description Opportunity management home main page.
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-27
 * @class OpportunityComponent
 * @extends {PureComponent}
 */
@connect(({
  user,
  opportunity,
  customer,
  userQuickSearch,
  loading
})=>({
  user,
  opportunity,
  customer,
  userQuickSearch,
  loading: loading
}))
class OpportunityComponent extends PureComponent{

  SERVICE_NAMESPACE = 'opportunity';
  CON_PAGE_TITLE = '机会登记';
  CON_PAGE_CONTENT = '机会的创建、登记、跟踪，以及机会下创建合同，创建项目业务操作。';

  CON_TABLE_OPTION = {
    rowKey: 'key',
    bordered: true,
    size: 'small',
    showHeader: true,
    hasData: false,
    scroll: {
      x: 2700,
      // y: 450,
    },
  }


  CON_TABLE_PAGINATION_OPTION = {
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

  CON_COLUMNS_OPTION = [
    {
      title: '机会名称',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      sorter: true,
      render: (cell, record, index) => {
        return (
          <Ellipsis lines={1} tooltip>{cell}</Ellipsis>
        );
      }
    },{
      title: '预计金额',
      dataIndex: 'amount',
      width: 100,
      sorter: true,
    },{
      title: '销售代表',
      dataIndex: 'sales',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Tooltip title={
            cell ? 
            // 'Title:' + (cell.title ?? '无') + '; Email: ' + (cell.emailAddress ?? '无') + '; Phone: ' + (cell.phone ?? '无')
            (cell.emailAddress ?? '') + ' ' + (cell.phone ?? '') + ' ' + (cell.title ?? '')
            :''}
          >{cell?cell.name:''}</Tooltip>
        );
      }
    },{
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: '是否公开',
      dataIndex: 'isActive',
      width: 80,
      render: (cell, record, index) => {
        if(cell){
          return (
            <Tag color="green">公开</Tag>
          );
        } else {
          return (
            <Tag color="red">隐藏</Tag>
          );
        }
      }
    },{
      title: '交货日期',
      dataIndex: 'deliveryDate',
      width: 120,
      sorter: true,
      render: (cell, raw, index) => {
        if(cell){
          const v = moment(cell).fromNow();
          return v;
        }
      }
    },{
      title: '投标日期',
      dataIndex: 'bidDeadline',
      width: 120,
      sorter: true,
      render: (cell, raw, index) => {
        if(cell){
          const v = moment(cell).fromNow();
          return v;
        }
      }
    },{
      title: '行业分类',
      dataIndex: 'businessCategory',
      width: 200,
      render: (cell, record, index) => {
        return (
          <Tooltip title={cell?cell.fullPath:''}>{cell?cell.name:''}</Tooltip>
        );
      }
    },{
      title: '业主方',
      dataIndex: 'owner',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Ellipsis lines={1} tooltip>{cell ? cell.name: ''}</Ellipsis>
        );
      }
    },{
      title: '总包方',
      dataIndex: 'generalContractor',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Ellipsis lines={1} tooltip>{cell ? cell.name: ''}</Ellipsis>
        );
      }
    },{
      title: '代理方',
      dataIndex: 'agency',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Ellipsis lines={1} tooltip>{cell ? cell.name: ''}</Ellipsis>
        );
      }
    },{
      title: '区域',
      dataIndex: 'region',
      width: 100,
    },{
      title: '省份',
      dataIndex: 'province',
      width: 100,
    },{
      title: '城市',
      dataIndex: 'city',
      width: 100,
    },{
      title: 'ERP#',
      dataIndex: 'erpId',
      width: 200,
      sorter: true,
    },{
      title: '更新时间',
      dataIndex: 'lastModificationTime',
      width: 120,
      sorter: true,
      render: (cell, raw, index) => {
        if(cell){
          const v = moment(cell).fromNow();
          return v;
        }
      }
    },{
      title: '更新人',
      dataIndex: 'lastModifierUser',
      width: 120,
      render: (cell, record, index) => {
        return cell ? cell.name : "";
      }
    },{
      title: '创建时间',
      dataIndex: 'creationTime',
      width: 120,
      sorter: true,
      render: (cell, raw, index) => {
        if(cell){
          const v = moment(cell).fromNow();
          return v;
        }
      }
    },{
      title: '创建人',
      dataIndex: 'creatorUser',
      width: 120,
      render: (cell, record, index) => {
        return cell ? cell.name : "";
      }
    },{
      title: '系统编号',
      dataIndex: 'key',
      // width: 280,
      sorter: true,
    }    
  ]

  /** ############################################# **/

  constructor(props){
    super(props);
    this.state = {
      rowSelection: {},                 // current selected row in the table.
      selectedRowKeys: [],              // selected row in the table.
      data: [],                         // table datasource.
      editEntity: {},                   // generate this entity when select a row. It's well send to edit dialog.
      editorVisible: false,             // edit dialog visible switch.
      pagination: this.CON_TABLE_PAGINATION_OPTION,
      filters: null,
      sorter: '',
    };
  }


  /**
   * @description Search opportunity
   * @memberof OpportunityComponent
   */
  handleOnSearch = () =>{
    this.componentDidMount();
  }


  /**
   * @description Open create dialog
   * @memberof OpportunityComponent
   */
  handleOnCreate = () =>{
    const {
      user:{
        currentUser
      }
    } = this.props;

    const newId = snowflakeId();

    this.setState({
      editEntity: {
        _model: 'create',
        id: newId,
        key: newId,
        name: moment().format('YYYYMMDDHHMMSS.') + currentUser.name + ".创建的机会.",
        createUserName: currentUser.name,
        sales: currentUser,
      },
      editorVisible: true,
    });
  }


  /**
   * @description delete the selected record
   * @memberof OpportunityComponent
   */
  handleOnDelete = () => {
    const { dispatch } = this.props;
    const customerIds = this.state.selectedRowKeys;
    const onOk = this.handleDeleteConfirmOk; 
    confirm({
      title: '请确认是否删除',
      content: '请确认真的要删除吗？',
      onOk,
      onCancel() {},
    });
  }


  handleDeleteConfirmOk = () =>{
    const { dispatch } = this.props;
    const selectedIds = this.state.selectedRowKeys;
    selectedIds.map((element, index)=>{
      const id = element;
      dispatch({
        type: this.SERVICE_NAMESPACE + '/remove',
        payload: {id: id},
      });          
    });
    this.setState({
      selectedRowKeys: []
    });
    const { pagination, filters, sorter } = this.state;
    const payload = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters: filters,
      sorter: sorter,
    }
    // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => dispatch({
      type: this.SERVICE_NAMESPACE + '/query',
      payload: payload,
    }), 500);
  }
  

  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  /**
   * @description the content in the table header.
   * @memberof OpportunityComponent
   */
  tableTitle = () => {
    const {loading} = this.props;
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row>
        <Button onClick={this.handleOnSearch} type="default" icon="search" loading={loading.effects[this.SERVICE_NAMESPACE + '/query']}>查询</Button>
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
   * @memberof OpportunityComponent
   */
  handleDoCreate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const entityData 
        = Object.assign(
          formData,
          {
            salesId: formData.sales.userId,
            ownerId: formData.owner.ownerId,
            generalContractorId: formData.generalContractor.generalContractorId,
            agencyId: formData.agency.agencyId,
            businessCategoryId: categoryId,
          }
        );
      dispatch({
        type: this.SERVICE_NAMESPACE + '/create',
        payload: entityData,
      });

      this.setState({
        editorVisible: false,
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  /**
   * @description Update entity
   * @memberof OpportunityComponent
   */
  handleDoUpdate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      
      if (err) return;
      const formData = fieldsValue;
      const categoryId = formData.bizCategory ? formData.bizCategory.pop() : null;
      const createOpportunityContent = Object.assign(
        formData,
        {
          salesId: formData.sales.userId,
          ownerId: formData.owner ? formData.owner.customerId : null,
          generalContractorId: formData.generalContractor ? formData.generalContractor.customerId : null,
          agencyId: formData.agency ? formData.agency.customerId : null,
          businessCategoryId: categoryId,
        }
      );
      dispatch({
        type: this.SERVICE_NAMESPACE + '/update',
        payload: createOpportunityContent,
      });

      this.setState({
        editorVisible: false,
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  /**
   * @description close editor dialog
   * @memberof OpportunityComponent
   */
  handleOnCloseEditorDialog = () =>{
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


  /**
   * @description Handle table on change.
   * @author Eric-Zhong Xu
   * @copyright Tigoole
   * @date 2019-04-08
   * @memberof CustomerIndexComponent
   */
  handleTableOnChange = (pagination, filters, sorter, extra) => {
    const { dispatch } = this.props;
    this.setState({
      pagination: pagination
    });
    const params = {
      current: pagination.current, 
      pageSize: pagination.pageSize,
      sorter: sorter,
      filters: filters,
    };    
    dispatch({
      type: this.SERVICE_NAMESPACE + '/query',
      payload: params
    })
  }


  componentDidMount = () => {
    const { dispatch } = this.props;  // Get dispatch from parent component.
    const { pagination, filters, sorter } = this.state;
    const payload = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters: filters,
      sorter: sorter,
    }
    // load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/query",
      payload: payload,
    })
  }


  /**
   * @description Output html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-10
   * @returns html
   * @memberof OpportunityComponent
   */
  render() {
    // console.log(this.props);
    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    const rowSelectionOption = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const {
      opportunity,
      customer,
      user: {
        currentUser
      },
      loading,
    } = this.props;

    const dataSource = opportunity.data;
    const totalCount = opportunity.total;

    const paginationOption = {
      ...this.state.pagination,
      total: totalCount,
    }

    return (
      <PageHeaderWrapper
      title={this.CON_PAGE_TITLE}
      content={this.CON_PAGE_CONTENT}
    >
        <Card>
          <Table
            {...this.CON_TABLE_OPTION}
            columns={this.CON_COLUMNS_OPTION}
            title={this.tableTitle}
            dataSource={dataSource}
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            onChange={this.handleTableOnChange}
            // loading={loading.models.opportunity}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
          >
          </Table>
          <OpportunityEditorDialog
            {...this.props}
            data={this.state.editEntity}
            user={currentUser}
            visible={editorVisible}
            onDoCreate={this.handleDoCreate}
            onDoUpdate={this.handleDoUpdate}
            onCancel={this.handleOnCloseEditorDialog}
          ></OpportunityEditorDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }

}

export default OpportunityComponent;