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


@connect(({access_token, loading})=>({
  access_token,
  loading: loading.model
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
   * @memberof T02_TableComponent
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
   * @memberof T02_TableComponent
   */
  render(){

    const selectedRowKeys = this.state.selectedRowKeys;

    // ! 这里要用自己的代码替换
    // const dataSrouce = myModel.data;
    const dataSource = [];
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


export default T02_TableComponent;