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
* Creation: 2019-05-17 09:46:33
 */


import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Col, Button, Card, Table, Tag, Modal } from "antd";
import { snowflakeId } from '@/utils/snowflake';
import { connect } from "dva";
import { CallbackMessageStatus, CON_MESSAGE_STATUS } from './Components/CallbackMessageStatus';
import { ServiceName } from "@/services/AlibabaCallbackMessageService";
import AlibabaOrderHeaderSummary from "./Components/AlibabaOrderHeaderSummary";
import AlibabaOrderProductSummary from "./Components/AlibabaOrderProductSummary";
const confirm = Modal.confirm;
import moment from 'moment';

@connect(({           // Model
  user,
  alibabamessage,
  loading
})=>({                // Mapping to properties
  user,
  alibabamessage,
  loading: loading
}))
class AlibabaCallbackMessageHome extends PureComponent{
  SERVICE_NAMESPACE = ServiceName;   // Service 中定义的 reducer & effector
  CON_PAGE_TITLE = "数据回传";
  CON_PAGE_CONTENT = "系统接收到外系统所使入的业务数据管理中心，监控数据处理状态，异常处理管理中心。";
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
      x: 2300,
      y: 550,
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
      title: '数据类型',
      dataIndex: 'type',
      width: 200,
      filters: [{value: 'ORDER_PAY', text: 'ORDER_PAY'}],
      filterMultiple: false,
      sorter: true,
      fixed: 'left',
    },{
      title: '创建时间',
      dataIndex: 'creationTime',
      width: 240,
      sorter: true,
      render: (cell, raw, index) => {
        const data = moment(cell);
        const v = data.fromNow() + ' / ' + data.format('YYYY-MM-DD HH:mm');
        return v;
      }
    },{
      title: '更新时间',
      dataIndex: 'lastModificationTime',
      width: 240,
      sorter: true,
      render: (cell, raw, index) => {
        if(cell){
          const data = moment(cell);
          const v = data.fromNow() + ' / ' + data.format('YYYY-MM-DD HH:mm');
          return v;
        }
      }
    },{
      title: '处理状态',
      dataIndex: 'status',
      width: 140,
      filters: CON_MESSAGE_STATUS,
      filterMultiple: false,
      sorter: true,
      render: (cell, record, index) => {
        return (
          <CallbackMessageStatus value={cell} data={record}></CallbackMessageStatus>
        );
      }
    },{
      title: '处理次数',
      dataIndex: 'retryCount',
      width: 100,
      sorter: true,
      render: (cell, record, index) => {
        let color = '';
        if(cell == 0){
          color = '#87d068';
        } else if (cell < 10){
          color = '#2db7f5';
        } else {
          color = '#f50';
        }
        return (
          <Tag color={color}>{cell}</Tag>
        );
      }
    },{
      title: '订单信息摘要',
      dataIndex: 'businessData',
      key: 'order',
      render: (cell, record, index) => {
        if(cell){
          switch(record.type){
            case 'ORDER_PAY':
              return (
                <AlibabaOrderHeaderSummary data={JSON.parse(cell)}></AlibabaOrderHeaderSummary>
              );
              break;
            default:
              return '';
              break;
          }
        } else {
          return '';
        }
      }
    },{
      title: '产品信息摘要',
      dataIndex: 'businessData',
      key: 'product',
      width: 550,
      // 
      render: (cell, record, index) => {
        if(cell){
          switch(record.type){
            case 'ORDER_PAY':
              return (
                <AlibabaOrderProductSummary data={JSON.parse(cell)}></AlibabaOrderProductSummary>
              );
              break;
            default:
              return '';
              break;
          }
        } else {
          return '';
        }
      }
    },{
    //   title: '处理结果',
    //   dataIndex: 'comment',
    //   width: 300,
    //   render: (cell, record, index) => {
    //     if(cell && cell != "" && cell.substring(0,1)==='{'){
    //       const data = JSON.parse(cell);
    //       // TODO: 这里应该用更好的自动匹配方式来显示数据，目前暂时写死。
    //       switch(record.type){
    //         case 'ORDER_PAY':
    //           const orderNumber = data.OrderNumber;
    //           const source = data.Source;
    //           const name = data.Name;
    //           const address = data.Address;
    //           const productDetails = data.ProductDetails.map((item, index)=>{
    //             return item.IDH + ', ' + item.ProductName + ', ' + item.Quantity + ', ' + item.OrderValue;
    //           });

    //           return (
    //             <span>
    //             {
    //             ''
    //             + orderNumber + ', '
    //             + source + ', '
    //             + name + ', '
    //             + address + ', '
    //             + productDetails.toString()}
    //             </span>
    //             );
    //           break;
    //         default:
    //           return '';
    //           break;
    //       }
    //     } else {
    //       return cell;
    //     }
    // }
    // },{
    //   title: '中间数据',
    //   dataIndex: 'extensionData',
    //   width: 300,
    //   render: (cell, record, index) => {
    //     return cell;
    //   }
    // },{
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
   * @memberof AlibabaCallbackMessageHome
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
   * @memberof AlibabaCallbackMessageHome
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
    const onOk = ()=>{}; // this.handleDeleteConfirmOk; 
    confirm({
      title: '请确认',
      content: '对不起，当前不支持删除操作。',
      onOk,
      onCancel() {},
    });
  }


  handleOnRetry = () => {
    const { dispatch } = this.props;
    const customerIds = this.state.selectedRowKeys;
    const onOk = this.handleDoRetry; 
    confirm({
      title: '请确认',
      content: '请确认是否需要重新触发数据处理？',
      onOk,
      onCancel() {},
    });
  }

  handleDoRetry = () =>{
    const { dispatch } = this.props;
    const customerIds = this.state.selectedRowKeys;

    // Generate eneity, onley has id field.
    const ids = customerIds.map((item,index)=>{
      return {id: item};
    });

    // List<Entity>
    dispatch({
      type: this.SERVICE_NAMESPACE + '/retry',
      payload: ids,                   
    });          

    this.setState({
      selectedRowKeys: []
    });

    // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => this.componentDidMount(), 500);
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
          <Button onClick={this.handleOnRetry} type="default" icon="" loading={loading.effects[this.SERVICE_NAMESPACE + '/update']}>重试</Button>
          <Button onClick={this.handleOnCreate} type="default" icon="file-add" loading={loading.effects[this.SERVICE_NAMESPACE + '/create']} disabled={true}>新建</Button>
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
    */
   console.log('Table on changed.');
   console.log(pagination);
   console.log(filters);
   console.log(sorter);

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
   * @memberof AlibabaCallbackMessageHome
   */
  render(){

    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    // ! 这里要用自己的代码替换
    // const dataSrouce = myModel.data;
    const {
      userQuickSearch,// Model 0
      alibabamessage,    // Model 1
      customer,       // Model 2
      user: {
        currentUser
      }
    } = this.props;

    const model = alibabamessage;

    const dataSource = model.data;
    const totalCount = model.total;

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


export default AlibabaCallbackMessageHome;