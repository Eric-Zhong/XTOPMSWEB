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
* Creation: 2019-04-22 15:45:42
 */

import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Col, Input, Button, Card, Table, Tag, Icon, Modal, Form } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";
import moment from 'moment';
import AccessTokenEditorDialog from './Components/AccessTokenEditorDialog';
import {ServiceName} from '@/services/AccessTokenService';

const confirm = Modal.confirm;

@connect(({
  user,
  accesstoken,
  loading
})=>({
  user,
  accesstoken,
  loading
}))
class AccessTokenComponent extends PureComponent{

  SERVICE_NAMESPACE = ServiceName;
  CON_PAGE_TITLE = "Alibaba 应用程序管理";
  CON_PAGE_CONTENT = "XTOPMS与Alibaba电商平台应用对接的帐号配置管理。帐号请在open.1688.com上进行申请。";
  CON_TABLE_OPTION = {
    rowKey: 'key',
    bordered: true,
    size: 'small',
    showHeader: true,
    hasData: false,
    scroll: {
      x: 3500,
      // y: 450,
    },
  };
  CON_COLUMNS_OPTION = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      render: (cell, record, index) => {
        return cell;
      }
    },{
      title: 'App Key',
      dataIndex: 'app_Key',
      // width: 150,
    },{
      title: 'app_Secret',
      dataIndex: 'app_Secret',
      width: 150,
    },{
      title: 'Is Active',
      dataIndex: 'isActive',
      width: 80,
      render: (cell, record, index) => {
        if(cell){
          return (
            <Tag color="green">Yes</Tag>
          );
        } else {
          return (
            <Tag color="red">No</Tag>
          );
        }
      }
    },{
      title: 'Deleted',
      dataIndex: 'isDeleted',
      width: 80,
      render: (cell, record, index) => {
        if(cell){
          return (
            <Tag color="red">Yes</Tag>
          );
        } else {
          return (
            <Tag color="green">No</Tag>
          );
        }
      }
    },{
      title: 'System ID',
      dataIndex: 'aliId',
      width: 150,
    },{
      title: 'Resource Owner',
      dataIndex: 'resource_Owner',
      width: 150,
    },{
      title: 'Access Token',
      dataIndex: 'access_Token',
      width: 400,
    },{
      title: 'Timeout',
      dataIndex: 'expires_In',
      width: 300,
      render: (cell, record, index) => {
        return moment().to(cell);
      }
    },{
      title: 'Refresh Token',
      dataIndex: 'refresh_Token',
      width: 400,
    },{
      title: 'Timeout',
      dataIndex: 'refresh_Token_Timeout',
      width: 300,
      render: (cell, record, index) => {
        return moment().to(cell);
      }
    },{
      title: 'Status',
      dataIndex: 'status',
      width: 120,
    },{
      title: 'Last Modification',
      dataIndex: 'lastModificationTime',
      width: 300,
      render: (cell, record, index) => {
        return moment(cell).fromNow();
      }
    },{
      title: 'Creation Time',
      dataIndex: 'creationTime',
      width: 300,
      render: (cell, record, index) => {
        return moment(cell).fromNow();
      }
    },{
      title: 'System ID',
      dataIndex: 'key',
      width: 200,
    }    
  ]
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
  };


  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  /**
   *Constructor function. Call this function when component first created.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @param {*} props
   * @memberof AccessTokenComponent
   */
  constructor(props){
    super(props);
    // Declare this component's state
    this.state = {
      rowSelection: {},                 // current selected row in the table.
      selectedRowKeys: [],              // selected row in the table.
      data: [],                         // table datasource.
      editEntity: {},                   // generate this entity when select a row. It's well send to edit dialog.
      editorVisible: false,             // edit dialog visible switch.
      pagination: this.CON_TABLE_PAGINATION_OPTION,
    };
  }


  /**
   * @description When components created, react will execute this function.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AccessTokenComponent
   */
  componentDidMount(){
    const { dispatch } = this.props;  // Get dispatch from parent component.
    const payload = {
      current: this.CON_TABLE_PAGINATION_OPTION.current,
      pageSize: this.CON_TABLE_PAGINATION_OPTION.pageSize,
    }
    // load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/query",
      payload: payload,
    })
  }

  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + "/clear",
      payload: null,
    });
  }

  /**
   * @description clear the reference model state
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-28
   * @memberof AccessTokenComponent
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + '/clear',
    });
  }

  handleOnSearch = () =>{
    this.componentDidMount();
  }

  tableTitleOption = () => {
    const {loading} = this.props;
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row gutter={24}>
        <Col>
          <Button onClick={this.handleOnSearch} type="default" icon="search" loading={loading.effects[this.SERVICE_NAMESPACE + '/query']}>查询</Button>
          <Button onClick={this.handleOnCreate} type="default" icon="file-add" loading={loading.effects[this.SERVICE_NAMESPACE + '/create']} disabled={loading.global}>新建</Button>
          <Button onClick={this.handleOnDelete} type="danger" icon="delete" loading={loading.effects[this.SERVICE_NAMESPACE +'/remove']} disabled={!hasSelected || loading.global}>删除</Button>
          <Button icon="upload" disabled>导入</Button>
          <Button icon="download" disabled>导出</Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
          </span>
        </Col>
      </Row>
    );
  }

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
    });
  }
  
  handleOnCreate = () => {
    console.log(this.props);
    const {
      dispatch,
      user: {currentUser},
    } = this.props;

    const newId = snowflakeId();

    const entity = {
      _model: 'create',
      id: newId,
      key: newId,
      name: moment().format('YYYYMMDDHHMMSS.') + currentUser.name + ".创建的Token.",
    };
    
    this.setState({
      editEntity: entity,
      editorVisible: true,
    });
  }

  /**
   * @description 当 Edit Dialog 点击 Cancel 时
   * @memberof AccessTokenComponent
   */
  handleEditorCancel = () => {
    this.setState({
      editorVisible: false,
    });
  }

  /**
   * @description 当 Edit Dialog 点击 Ok 时
   * @memberof AccessTokenComponent
   */
  handleDoUpdate = (form) => {
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {

      if (err) return;
      var formData = {
        ...this.state.editEntity,
        ...fieldsValue,
      };

      dispatch({
        type: this.SERVICE_NAMESPACE + "/update",
        payload: formData,
      });

      this.setState({
        editorVisible: false,
      });

      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      setTimeout(() => this.componentDidMount(), 1000);
    });
  }


  /**
   * @description 当 Create Dialog 点击 Create 时
   * @memberof AccessTokenComponent
   */
  handleDoCreate = (form) => {
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = {
        ...fieldsValue,
      };

      dispatch({
        type: this.SERVICE_NAMESPACE + "/create",
        payload: formData,
      });

      this.setState({
        editorVisible: false,
      });

      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      setTimeout(() => this.componentDidMount(), 1000);
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
   * @description Init token 时调用这个方法
   * @memberof AccessTokenComponent
   */
  handleInitToken = (params) => {
    const {dispatch} = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + "/initializeAccessToken",
      payload: params,
    });
    this.setState({
      selectedRowKeys: [],
      editorVisible: false,
    });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => this.componentDidMount(), 500);
  }

  /**
   * @description 执行 Delete
   * @memberof AccessTokenComponent
   */
  handleDoDelete = () => {
    const { dispatch } = this.props;
    const selectedRowKeys = this.state.selectedRowKeys;
    selectedRowKeys.map((element, index)=>{
      const id = element;
      dispatch({
        type: this.SERVICE_NAMESPACE + '/remove',
        payload: {
          id: id
        },
      });
    });
    this.setState({
      selectedRowKeys: []
    });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => this.componentDidMount(), 500);
  }

  /**
   * @description Delete 时执行
   * @memberof AccessTokenComponent
   */
  handleOnDelete = () => {
    const { dispatch } = this.props;
    confirm({
      title: '请确认是否删除',
      content: '请确认真的要删除吗？',
      onOk: this.handleDoDelete,
      onCancel() {},
    });
  }


  /**
   * @description Render the html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AccessTokenComponent
   */
  render(){

    const state = this.state;

    // 从 Model 中获取 State 中记录的数据
    const {
      accesstoken, 
      user: {currentUser},
      loading,
    } = this.props;

    const model = accesstoken;
    const dataSource = model.data;
    const totalCount = model.total; // 需要从 api 中拿到数据后，得到数据的数量。

    const selectedRowKeys = this.state.selectedRowKeys;

    // 分页
    const paginationOption = {
      ...this.state.pagination,
      total: totalCount,
    }

    // 多选
    const rowSelectionOption = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return(
      <PageHeaderWrapper
        title={this.CON_PAGE_TITLE}
        content={this.CON_PAGE_CONTENT}
      >
        <Card>
          <Table
            {...this.CON_TABLE_OPTION}
            columns={this.CON_COLUMNS_OPTION}
            title={this.tableTitleOption}
            dataSource={dataSource}
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            onChange={this.handleTableOnChange}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
          >
          </Table>
          <AccessTokenEditorDialog
            {...this.props}
            user={currentUser}
            data={this.state.editEntity}
            visible={this.state.editorVisible}
            onCreate={this.handleDoCreate}
            onDoUpdate={this.handleDoUpdate}
            onCancel={this.handleEditorCancel}
            onInitToken={this.handleInitToken}
          >
          </AccessTokenEditorDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }
}


export default AccessTokenComponent;