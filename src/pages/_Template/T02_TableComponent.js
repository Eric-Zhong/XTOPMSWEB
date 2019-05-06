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
* Creation: 2019-04-22 14:54:17
 */


/*

T02_TableComponent: 换成真实 Page 的名称

*/

import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Button, Card, Table } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";


@connect(({           // Model
  access_token,
  userQuickSearch,
  customer,
  opportunity,
  loading
})=>({                // Mapping to properties
  access_token,
  userQuickSearch,
  customer,
  opportunity,
  loading: loading
}))
class T02_TableComponent extends PureComponent{
  SERVICE_NAMESPACE = "access_token";   // Service 中定义的 reducer & effector
  CON_PAGE_TITLE = "页面名称";
  CON_PAGE_CONTENT = "页面描述";
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
      x: 2500,
      y: 450,
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
      title: 'Name',
      dataIndex: 'name',
      width: 150,
      fixed: 'left',
    },{
      title: 'Id',
      dataIndex: 'id',
      width: 100,
    },{
      title: 'Code',
      dataIndex: 'code',
      width: 100,
      render: (cell, record, index) => {
        return (
          <Tag>{cell}</Tag>
        );
      }
    },{
      title: 'Active?',
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
   * @memberof T02_TableComponent
   */
  constructor(props){
    super(props);
    // Declare this component's state
    this.state = {
      rowSelection: {},
      selectedRowKeys: [],
      editorVisible: false,
      data:[],
      count: 0,
    };
  }


  /**
   * @description When components created, react will execute this function.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof T02_TableComponent
   */
  componentDidMount(){
    const { dispatch } = this.props;  // Get dispatch from parent component.
    // load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/getAll",
      payload: {current: 1, pageSize: 20}
    })
  }

  handleOnSearch = () =>{
    this.componentDidMount();
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


  handleDoCreate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const entityData 
        = Object.assign(
          {_model: 'create'},
          formData,
          {salesId: formData.sales.userId}
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

    /*
    console.log('Table on changed.');
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    */

    // Set new pagination to state.
    this.setState({
      pagination: pagination
    });

    const params = {
      current: pagination.current, 
      pageSize: pagination.pageSize,
    };
    
    dispatch({
      type: this.SERVICE_NAMESPACE + '/getAll',
      payload: params
    })

  }
  
  /**
   * @description Render the html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof T02_TableComponent
   */
  render(){

    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    // ! 这里要用自己的代码替换
    // const dataSrouce = myModel.data;
    const {
      userQuickSearch,// Model 0
      opportunity,    // Model 1
      customer,       // Model 2
      user: {
        currentUser
      }
    } = this.props;

    const dataSource = opportunity.data;
    const totalCount = opportunity.total;

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
            title={this.tableTitleOption}
            dataSource={dataSource}
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            onChange={this.handleTableOnChange}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
          >
          </Table>
        </Card>
      </PageHeaderWrapper>
    );
  }


}


export default T02_TableComponent;