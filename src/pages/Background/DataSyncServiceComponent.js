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
* Creation: 2019-05-12 17:43:54
 */


import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Col, Input, Button, Card, Table, Tag, Icon, Modal } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";
import moment from 'moment';
import DataSyncServiceEditorDialog from './Components/DataSyncServiceEditorDialog';
const confirm = Modal.confirm;

@connect(({
  datasyncservice,
  loading
})=>({
  datasyncservice,
  loading
}))
class DataSyncServiceComponent extends PureComponent{

  SERVICE_NAMESPACE = "datasyncservice";
  CON_PAGE_TITLE = "数据同步后台服务管理";
  CON_PAGE_CONTENT = "XTOPMS与外系统进行数据对接时所创建的后台服务程序管理";
  CON_TABLE_OPTION = {
    rowKey: 'key',
    bordered: true,
    size: 'small',
    // expandedRowRender,
    showHeader: true,
    // footer,
    // scroll: undefined,
    hasData: false,
    scroll: {
      x: 1800,
      y: 450,
    },
  };
  CON_COLUMNS_OPTION = [
    {
      title: '服务名称',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      render: (cell, record, index) => {
        return cell;
      }
    },{
      title: 'Access Token',
      dataIndex: 'accessTokenInfo.name',
      // width: 150,
    },{
      title: 'App Key',
      dataIndex: 'accessTokenInfo.app_Key',
      width: 100,
    },{
      title: '服务代码',
      dataIndex: 'code',
      width: 100,
    },{
      title: '激活',
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
      title: '内部编号',
      dataIndex: 'erpId',
      width: 250,
    },{
      title: 'Status',
      dataIndex: 'status',
      width: 120,
    },{
      title: '最后更新时间',
      dataIndex: 'lastModificationTime',
      width: 150,
      render: (cell, record, index) => {
        return moment(cell).fromNow();
      }
    },{
      title: '创建时间',
      dataIndex: 'creationTime',
      width: 150,
      render: (cell, record, index) => {
        return moment(cell).fromNow();
      }
    },{
      title: '系统编号',
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
   * @memberof DataSyncServiceComponent
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
    };
  }


  /**
   * @description When components created, react will execute this function.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof DataSyncServiceComponent
   */
  componentDidMount(){
    const { dispatch } = this.props;  // Get dispatch from parent component.

    this.setState({
      pagination: this.CON_TABLE_PAGINATION_OPTION
    });

    const payload = {
      current: this.CON_TABLE_PAGINATION_OPTION.current,
      pageSize: this.CON_TABLE_PAGINATION_OPTION.pageSize,
    }

    // load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/getAll",
      payload: payload,
    })
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


  handleOnSearch = () => {
    this.componentDidMount();
  }


  handleOnCreate = () => {
    const entity = {
      _model: 'create',
      id: snowflakeId(),
      name: '新建数据同步服务',
      code: '请咨询XTOPMS，录入分配的服务编号',
      status: 0,
      retryCount: 0,
      nextRunTime: moment().add('days',1).format('YYYY-MM-DD') + ' 01:00:00',
      interval: 3600,
    };
    
    this.setState({
      editEntity: entity,
      editorVisible: true,
    });
  }

  /**
   * @description 当 Edit Dialog 点击 Cancel 时
   * @memberof DataSyncServiceComponent
   */
  handleEditorCancel = () => {
    this.setState({
      editorVisible: false,
    });
  }

  /**
   * @description 当 Edit Dialog 点击 Ok 时
   * @memberof DataSyncServiceComponent
   */
  handleDoUpdate = (form) => {
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = {
        ...this.state.editEntity,
        ...fieldsValue,
      };
      console.log(formData);
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
   * @memberof DataSyncServiceComponent
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
        newId: snowflakeId(),
        editorVisible: false,
      });

      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      setTimeout(() => this.componentDidMount(), 1000);
    });
  }

  /**
   * @description 点击record时，弹出编辑对话框
   * @memberof DataSyncServiceComponent
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
   * @memberof DataSyncServiceComponent
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
   * @memberof DataSyncServiceComponent
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
   * @memberof DataSyncServiceComponent
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
   * @memberof DataSyncServiceComponent
   */
  render(){

    const state = this.state;

    // 从 Model 中获取 State 中记录的数据
    const {datasyncservice, data} = this.props;
    const dataSource = datasyncservice.data;
    const totalCount = datasyncservice.total; // 需要从 api 中拿到数据后，得到数据的数量。

    const selectedRowKeys = this.state.selectedRowKeys;

    // 分页
    const paginationOption = {
      ...this.CON_TABLE_PAGINATION_OPTION,
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
            title={this.tableTitle}
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            dataSource={dataSource}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
          >
          </Table>
          <DataSyncServiceEditorDialog
            visible={this.state.editorVisible}
            onCancel={this.handleEditorCancel}
            onDoUpdate={this.handleDoUpdate}
            onCreate={this.handleDoCreate}
            onInitToken={this.handleInitToken}
            data={this.state.editEntity}
          >
          </DataSyncServiceEditorDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }
}


export default DataSyncServiceComponent;