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
import { Row, Button, Card, Table, Tag } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";
import moment from 'moment';

@connect(({
  access_token,
  loading
})=>({
  access_token,
  loading: loading.model
}))
class AccessTokenComponent extends PureComponent{

  SERVICE_NAMESPACE = "access_token";
  CON_PAGE_TITLE = "Access Token 管理";
  CON_PAGE_CONTENT = "XTOPMS 与外系统对接时，需要配置相关的应用 Account 和 Token，统一在这里进行管理";
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
      x: 3000,
      y: 450,
    },
  };
  CON_COLUMNS_OPTION = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
    },{
      title: 'App Key',
      dataIndex: 'app_Key',
      width: 150,
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
            <Tag color="red">-</Tag>
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
      newId: snowflakeId(),
      selectedRowKeys: [],
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
    // Load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/getAll",
      payload: {current: 1, pageSize: 20}
    })
  }


  handleClick = () =>{
    console.log('click');
  }


  tableTitleOption = () => {
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row>
        <Button type="default" icon="search" disabled>查询</Button>
        <Button onClick={this.handleClick} type="default" icon="file-add">新建</Button>
        <Button onClick={this.handleClick} type="danger" icon="delete">删除</Button>
        <Button icon="upload" disabled>导入</Button>
        <Button icon="download" disabled>导出</Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
        </span>
      </Row>
    );
  }


  /**
   * @description Render the html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AccessTokenComponent
   */
  render(){

    const state = this.state;

    const {access_token} = this.props;
    const dataSource = access_token.data;

    const selectedRowKeys = this.state.selectedRowKeys;

    var totalCount = 0; // 需要从 api 中拿到数据后，得到数据的数量。

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
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            dataSource={dataSource}
          >
          </Table>
        </Card>
      </PageHeaderWrapper>
    );
  }


}


export default AccessTokenComponent;