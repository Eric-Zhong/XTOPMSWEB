
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Button, Table, Tag, Modal, Row, Col, Rate} from 'antd';
import { Resizable } from 'react-resizable';
import { snowflakeId } from '@/utils/snowflake';
import { truncate } from 'fs';

import CustomerEditorDialog from './Components/CustomerEditorDialog';
import CustomerCategoryComponent from './Components/CustomerCategoryComponent';
import {QueryCustomerCategory, QueryCustomerStatus} from '@/utils/Dictionary';

const confirm = Modal.confirm;


/**
 * @class CustomerIndexComponent
 * @description Customer center index page component.
 */
@connect(({
  user,
  customer,     // TODO: model object
  loading
})=>({ // 将 customer 这个 model 中定义的 state 绑定到当前组件的 this.props 上. 
  user,
  customer,     // TODO: model object
  loading: loading,
}))
class CustomerIndexComponent extends PureComponent {

  SERVICE_NAMESPACE = 'customer';   // Service 中定义的 reducer & effector
  CON_PAGE_TITLE = "客户信息管理";
  CON_PAGE_CONTENT = "请在这里对客户信息进行维护，为了保证客户信息的唯一性，请在创建新客户时，录入客户的企业信用代码。";
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
      title: '客户简称',
      dataIndex: 'shortName',
      width: 180,
      fixed: 'left',
      sorter: true,
    },{
      title: '客户名称',
      dataIndex: 'name',
      sorter: true,
    },{
      title: '激活',
      dataIndex: 'isActive',
      width: 100,
      sorter: true,
      filters: [
        {text: '已激活', value: true},
        {text: '未激活', value: false},
      ],
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
      title: '机会状态',
      dataIndex: 'status',
      width: 100,
      sorter: true,
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
      sorter: true,
      filters: [
        {text: '五星', value: 5},
        {text: '四星', value: 4},
        {text: '三星', value: 3},
        {text: '二星', value: 2},
        {text: '一星', value: 1},
      ],
      render: (cell, record, index) => {
        if(cell){
          return (
            <Rate disabled defaultValue={cell}></Rate>
          );
        }
      }
    },{
      title: '分类',
      dataIndex: 'customerCategorySettings',
      width: 300,
      render: (cell, record, index) => {
        const categories = cell.map((item)=>
          <Tag key={item.categoryCode}>{item.categoryName}</Tag>
        );
        return categories;
      },
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
      sorter: true,
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
      sorter: true,
      render: (cell, raw, index) => {
        const v = moment(cell).fromNow();
        return v;
      }
    },{
      title: '系统编号',
      dataIndex: 'key',
      width: 220,
      sorter: true,
    }
  ];


  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  constructor(props){
    super(props);
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
   * @description Search
   * @memberof CustomerIndexComponent
   */
  handleOnSearch = () =>{
    this.componentDidMount();
  }

  /**
   * @method handleOpenCreationDialog
   * @description 打开创建新客户所使用的Dialog窗口
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
        name: moment().format('YYYYMMDDHHMMSS.') + currentUser.name + ".创建的客户.",
        creatorUser: currentUser,
      },
      editorVisible: true,
    });
  }

  /**
   * Display a confirm dialog for confirm wether delete the selected customers.
   *
   * @memberof CustomerIndexComponent
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
    const customerIds = this.state.selectedRowKeys;
    customerIds.map((element, index)=>{
      const id = element;
      dispatch({
        type: this.SERVICE_NAMESPACE + '/remove',
        payload: {id: id},
      });          
    });
    this.setState({
      selectedRowKeys: []
    });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
    setTimeout(() => dispatch({
      type: this.SERVICE_NAMESPACE + '/getall'
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
   *
   * Clear customer creation dialog when close the dialog.
   * @memberof CustomerIndexComponent
   */
  handleOnCloseEditorDialog = () => {
    this.setState({
      editorVisible: false,
    });
  }
  

  /**
   * @description Handle event when customer created successful. When the customerInfo param in callback function have some object, It mean customer created successfully, otherwise created failed.
   * @memberof CustomerIndexComponent
   */
  handleDoCreate = (form) => {
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const entityData 
        = Object.assign(
          formData
        );
      // console.log(createOpportunityContent);
      // return;
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
   * @description Do update event.
   * @memberof CustomerIndexComponent
   */
  handleDoUpdate = (form) =>{
    const {dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const createOpportunityContent 
        = Object.assign(
          {_model: 'edit'},
          formData
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
   * @description Handle table on change.
   * @author Eric-Zhong Xu
   * @copyright Tigoole
   * @date 2019-04-08
   * @memberof CustomerIndexComponent
   */
  handleTableOnChange = (pagination, filters, sorter, extra) => {

    const { dispatch } = this.props;

    // console.log('Table on changed.');
    // console.log(pagination);
    // console.log(filters);
    // console.log(sorter);

    // Set new pagination to state.
    this.setState({
      pagination: pagination
    });

    // caculate sort setting
    const sortField = sorter.field ? sorter.field : 'id';
    const sortOrder = sorter.order ? sorter.order : 'descend';
    const sorting = sortField + ' ' + (sortOrder === 'descend' ? 'desc' : 'asc');
    
    const params = {
      current: pagination.current, 
      pageSize: pagination.pageSize,
      sorting: sorting,
    };
    
    dispatch({
      type: this.SERVICE_NAMESPACE + '/getAll',
      payload: params
    })

  }


  /**
   * @description Initialize table data after loading.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-05-05
   * @memberof CustomerIndexComponent
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


  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + "/clear",
      payload: null,
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
          {_model: 'create'},
          formData
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
   * @description table's header options.
   * @memberof CustomerIndexComponent
   */
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


  render() {

    const selectedRowKeys = this.state.selectedRowKeys;
    const editorVisible = this.state.editorVisible;

    const {
      customer,
      user: {
        currentUser
      },
      loading
    } = this.props;

    const dataSource = customer.data;
    const totalCount = customer.total;

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

    return (
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
            loading={loading.models.customer}
            onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
        >
          </Table>
          <CustomerEditorDialog
            onCreated={this.handleCustomerCreationDialogOnCreated}
            {...this.props}
            data={this.state.editEntity}
            user={currentUser}
            visible={editorVisible}
            onDoCreate={this.handleDoCreate}
            onDoUpdate={this.handleDoUpdate}
            onCancel={this.handleOnCloseEditorDialog}
          ></CustomerEditorDialog>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CustomerIndexComponent;