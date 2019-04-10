
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Button, Table, Tag, Modal, Row, Rate} from 'antd';
import { Resizable } from 'react-resizable';
import { snowflakeId } from '@/utils/snowflake';
import Customer from './Models/CustomerModel';
import { truncate } from 'fs';

import CustomerCreationDialog from './Components/CustomerCreationDialog';
import CustomerCategoryComponent from './Components/CustomerCategoryComponent';
import {QueryCustomerCategory, QueryCustomerStatus} from '@/utils/Dictionary';

const confirm = Modal.confirm;

// 定义表格的 Columns
/**
 * @constant columns
 * @description Column setting for customer list table.
 */
const tableColumns = [
  {
    title: '客户简称',
    dataIndex: 'shortName',
    width: 150,
    fixed: 'left',
  },{
    title: '客户名称',
    dataIndex: 'name',
  },{
    title: '激活',
    dataIndex: 'isActive',
    width: 80,
    render: (cell, record, index) => {
      if(cell){
        return (
          <Tag color="green">已激活</Tag>
        );
      }else{
        return (
          <Tag color="red">未激活</Tag>
        );
      }
    }
  },{
    title: '客户类型',
    dataIndex: 'category',
    width: 300,
    render: (cell, record, index) => {
      if(cell && cell.length>0){
        const categorys = cell.split(',');
        const html = categorys.map((element, idx)=>{
          const item = QueryCustomerCategory(element);
          if(item){
            return <Tag>{item.value}</Tag>
          }
        });
        return html;
      }
    }
  },{
    title: '客户状态',
    dataIndex: 'status',
    width: 100,
    render: (cell, record, index) => {
      const status = QueryCustomerStatus(cell);
      if(status){
        return (
          <Tag color={status.color}>{status.value}</Tag>
        );
      }
    }
  },{
    title: '评级',
    dataIndex: 'rate',
    width: 180,
    render: (cell, record, index) => {
      if(cell){
        return (
          <Rate disabled defaultValue={cell}></Rate>
        );
      }
    }
  },{
    title: '公司地址',
    dataIndex: 'address',
    width: 400,
  },{
    title: '联系人',
    dataIndex: 'person',
    width: 150,
  },{
    title: '电话',
    dataIndex: 'phone',
    width: 200,
  },{
    title: '邮箱',
    dataIndex: 'email',
    width: 250,
  },{
    title: '开户银行',
    dataIndex: 'bankName',
    width: 350,
  },{
    title: '银行账号',
    dataIndex: 'bankAccount',
    width: 250,
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
];

/**
 * @description Table's options
 */
const tableOptions = {
  rowKey: 'key',
  bordered: true,
  size: 'small',
  // expandedRowRender,
  showHeader: true,
  // footer,
  // scroll: undefined,
  hasData: false,
  scroll: {
    x: 3500,
    y: 450,
  },
};

/**
 * @class CustomerIndexComponent
 * @description Customer center index page component.
 */
@connect((customer, loading)=>({ // 将 customer 这个 model 中定义的 state 绑定到当前组件的 this.props 上. 
  customer,
  loading: customer.loading.global,
}))
class CustomerIndexComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      tableOptions: tableOptions,
      tableColumns: tableColumns,
      pagination: {
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        pageSizeOptions: ['10','20','50','100','500'],
        showQuickJumper: true,
        showSizeChanger: true,
      },
      rowSelection: {},
      selectedRowKeys: [],
      visible: {
        creation: false,
      },
      customerId: 0,
      data:[],
      count: 0,
    };
  }


  /**
   * @method handleOpenCreationDialog
   * @description 打开创建新客户所使用的Dialog窗口
   */
  handleOpenCreationDialog = () =>{
    this.setState({
      visible: {
        creation: true,           // Set customer creation dialog as display.
      },
      customerId: snowflakeId(),  // Generate a new snowflake id for new customer.
    });
  }

  /**
   * Display a confirm dialog for confirm wether delete the selected customers.
   *
   * @memberof CustomerIndexComponent
   */
  onDelete = () => {
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
        type: "customer/delete",
        payload: customerId,
      });          
    });
    this.setState({
      selectedRowKeys: []
    });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => this.componentDidMount(), 500);
  }
  

  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }


  /**
   *
   * Clear customer creation dialog when close the dialog.
   * @memberof CustomerIndexComponent
   */
  handleCustomerCreationDialogOnCancel = () => {
    this.setState({
      newCustomerId: snowflakeId(),
      visible: {
        creation: false
      }
    });
    console.log("20190405001.Close customer creation dialog.")
  }
  

  /**
   * @description Handle event when customer created successful. When the customerInfo param in callback function have some object, It mean customer created successfully, otherwise created failed.
   * @memberof CustomerIndexComponent
   */
  handleCustomerCreationDialogOnCreated = (form) => {
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var customerInfo = fieldsValue;

      dispatch({
        type: "customer/create",
        payload: customerInfo,
      });

      this.setState({
        newCustomerId: snowflakeId(),
        visible: {
          creation: false
        }
      });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      setTimeout(() => this.componentDidMount(), 1000);
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

    /*
    console.log('Table on changed.');
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    */

    // Set new pagination to state.
    this.setState({
      pagination: {
        pageSize: pagination.pageSize,
        current: pagination.current,
      }
    });

    const params = {
      current: pagination.current, 
      pageSize: pagination.pageSize,
    };
    
    dispatch({
      type: 'customer/getAll',
      payload: params
    })

  }


  componentDidMount(){
    const { dispatch } = this.props;

    const params = {
      current: this.state.pagination.current, 
      pageSize: this.state.pagination.pageSize,
    };

    dispatch({
      type: 'customer/getAll',
      payload: params,
    });
  }
  
  render() {

    const {
      customer: {customer, loading},
    } = this.props;

    const table_dataSource = customer.data;

    const table_props = this.state.tableOptions;
    const table_columns = this.state.tableColumns;
    const selectedRowKeys = this.state.selectedRowKeys;
    const visible_createDailog = this.state.visible.creation;
    const newCustomerId = this.state.customerId;
    const pagination = {
      ...this.state.pagination,
      total: customer.total,
    };


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    
    var title = () => {
      return (
        <Row>
          <Button type="default" icon="search" disabled>查询</Button>
          <Button onClick={this.handleOpenCreationDialog} type="default" icon="file-add">新建</Button>
          <Button onClick={this.onDelete} type="danger" icon="delete">删除</Button>
          <Button icon="upload" disabled>导入</Button>
          <Button icon="download" disabled>导出</Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
          </span>
        </Row>
      );
    };

    return (
      <PageHeaderWrapper
        title="客户信息管理"
        content="请在这里对客户信息进行维护，为了保证客户信息的唯一性，请在创建新客户时，录入客户的企业信用代码。"
      >
        <Card>
          <Table 
            title={title}
            columns={table_columns} 
            dataSource={table_dataSource}
            {...table_props}
            pagination={pagination}
            rowSelection={rowSelection}
            loading={loading.effects['customer/getAll']}
            onChange={this.handleTableOnChange}
          >
          </Table>
          <CustomerCreationDialog
            customerId={newCustomerId}
            visible={visible_createDailog}
            onCancel={this.handleCustomerCreationDialogOnCancel}
            onCreated={this.handleCustomerCreationDialogOnCreated}
          ></CustomerCreationDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CustomerIndexComponent;