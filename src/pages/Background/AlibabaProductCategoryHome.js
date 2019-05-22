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
* Creation: 2019-05-20 14:43:00
 */

import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Col, Button, Card, Table, Tag } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";
import moment from 'moment';

import { ServiceName } from '@/services/AlibabaProductCategoryService';
import AlibabaProductCategoryEditorDialog from './Components/AlibabaProductCategoryEditorDialog';

@connect(({           // Model
  user,
  alibabaproductcategory,
  loading
})=>({                // Mapping to properties
  user,
  alibabaproductcategory,
  loading: loading
}))
class AlibabaProductCategoryHome extends PureComponent{
  SERVICE_NAMESPACE = ServiceName;   // Service 中定义的 reducer & effector
  CON_PAGE_TITLE = "商品货号";
  CON_PAGE_CONTENT = "配置商品货号，如果该商品货号设置成激活状态，那么收到含此商品的订单将推送给Salesforce。";
  CON_TABLE_OPTION = {
    rowKey: 'key',
    bordered: true,
    size: 'small',
    showHeader: true,
    hasData: false,
    scroll: {
      x: 1200,
      // y: 450,
    },
  };

  CON_TABLE_PAGINATION_OPTION = {
    current: 1,
    pageSize: 10,
    defaultPageSize: 10,
    pageSizeOptions: ['10','20','50','100','500'],
    showQuickJumper: true,
    showSizeChanger: true,
    position: 'both',
    showTotal: (total, range) => {
      return '总计: ' + total + ' 条';
    }
  };

  CON_COLUMNS_OPTION = [
    {
      title: '商品货号',
      dataIndex: 'code',
      width: 150,
      fixed: 'left',
      sorter: true,
    },{
      title: '状态',
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
      title: '名称',
      dataIndex: 'name',
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
      width: 100,
    }    
  ]

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
   * @memberof AlibabaProductCategoryHome
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
   * @memberof AlibabaProductCategoryHome
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


  handleOnSearch = () =>{
    this.componentDidMount();
  }

  handleOnCreate = () => {
    const {
      dispatch,
      user: {currentUser},          // Get current user data.
    } = this.props;
    const newId = snowflakeId();    // Generate a new id for new entity.
    const entity = {
      _model: 'create',
      id: newId,
      key: newId,
      name: moment().format('YYYYMMDDHHMMSS.') + currentUser.name + ".创建的商品货号",
    };
    this.setState({
      editEntity: entity,
      editorVisible: true,
    });
  }
  
  handleOnEdit = (record) => {
    this.setState({
      editEntity: {
        _model: 'edit', 
        ...record
      },
      editorVisible: true,
    });
  }

  handleEditorCancel = () =>{
    this.setState({
      editorVisible: false,
    });
  }

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


  handleDoCreate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const entityData 
        = Object.assign(
          {_model: 'create'},
          formData,
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
    const customerIds = this.state.selectedRowKeys;
    customerIds.map((element, index)=>{
      const customerId = element;
      console.log(customerId);
      dispatch({
        type: this.SERVICE_NAMESPACE + '/delete',
        payload: customerId,
      });          
    });
    this.setState({
      selectedRowKeys: []
    });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => this.componentDidMount(), 500);
  }


  tableTitleOption = () => {
    const {loading} = this.props;
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row gutter={24}>
        <Col>
          <Button onClick={this.handleOnSearch} type="default" icon="search" loading={loading.effects[this.SERVICE_NAMESPACE + '/getAll']}>查询</Button>
          <Button onClick={this.handleOnCreate} type="default" icon="file-add" loading={loading.effects[this.SERVICE_NAMESPACE + '/create']} disabled={loading.global}>新建</Button>
          <Button onClick={this.handleOnDelete} type="danger" icon="delete" loading={loading.effects[this.SERVICE_NAMESPACE + '/remove']} disabled={!hasSelected || loading.global}>删除</Button>
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
    // Set new pagination to state.
    this.setState({
      pagination: pagination
    });
    const params = {
      current: pagination.current, 
      pageSize: pagination.pageSize,
      sorter: sorter,
      filters: filters
    };    
    dispatch({
      type: this.SERVICE_NAMESPACE + '/query',
      payload: params
    });
  }
  
  /**
   * @description Render the html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AlibabaProductCategoryHome
   */
  render(){

    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    // ! 这里要用自己的代码替换
    // const dataSrouce = myModel.data;
    const {
      alibabaproductcategory,
      user: {
        currentUser
      }
    } = this.props;

    const model = alibabaproductcategory;

    const dataSource = model.data;
    const totalCount = model.total;

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
          <AlibabaProductCategoryEditorDialog
            visible={this.state.editorVisible}
            onCancel={this.handleEditorCancel}
            onDoUpdate={this.handleDoUpdate}
            onCreate={this.handleDoCreate}
            data={this.state.editEntity}
          ></AlibabaProductCategoryEditorDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }


}


export default AlibabaProductCategoryHome;