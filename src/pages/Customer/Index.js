import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Button, Table, Tag, Modal} from 'antd';
import { Resizable } from 'react-resizable';
import CustomerCreation from './CustomerCreation';

const confirm = Modal.confirm;

// 定义表格的 Columns
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },{
    title: '名称',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
  },{
    title: '区域',
    dataIndex: 'region',
    width: 80,
  },{
    title: '联系人',
    dataIndex: 'contact',
    width: 80,
  },{
    title: '电话',
    dataIndex: 'phone',
    width: 150,
  },{
    title: '邮箱',
    dataIndex: 'email',
    width: 150,
  },{
    title: '类型',
    dataIndex: 'category',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 2 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
        })}
      </span>
    ),
  },{
    title: 'ERP#',
    dataIndex: 'erpid',
    width: 120,
    fixed: 'right',
  },{
    title: '状态',
    dataIndex: 'status',
    width: 100,
    fixed: 'right',
    render: (item, record) => (
      <span>
        {item.map(tag => {
          return <Tag color="green" key={tag}>{tag}</Tag>;
        })}
      </span>
    ),
  }
];


class CustomerComponent extends PureComponent {

  state = {
    table_props: {
      bordered: true,
      loading: false,
      pagination: true,
      size: 'small',
      // expandedRowRender,
      showHeader: true,
      // footer,
      rowSelection: {},
      // scroll: undefined,
      hasData: false,
      scroll: {
        x: 1300,
        y: 350,
      },
    },
    columns: columns,
    selectedRowKeys: [],
    visible: {
      createDailog: false,
    }
  }

  onCreate = () =>{
    this.setState({
      visible: {
        createDailog: true,
      }
    });
  }

  onDelete = () => {
    confirm({
      title: '请确认是否删除',
      content: '请确认真的要删除吗？',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  


  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }


  // 定义表格的 Data
  data = [
    {
      id: '1',
      name: 'ABB',
      category: ["业主", "总包主", "供货方", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '2',
      name: 'Schneider',
      category: ["业主", "总包主", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '3',
      name: 'Dell',
      category: ["供货方"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '4',
      name: 'Microsoft',
      category: ["供货方", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '5',
      name: 'ABB',
      category: ["业主", "总包主", "供货方", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '6',
      name: 'Schneider',
      category: ["业主", "总包主", "设计院"],
      erpid: 50001234,
      status: ["禁用"]
    },{
      id: '7',
      name: 'Dell',
      category: ["供货方"],
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '8',
      name: 'Microsoft',
      category: ["供货方", "设计院"],
      erpid: 50001234,
      status: ["禁用"]
    },{
      id: '9',
      name: 'ABB',
      category: ["业主", "总包主", "供货方", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '10',
      name: 'Schneider',
      category: ["业主", "总包主", "设计院"],
      erpid: 50001234,
      status: ["可用"]
    },{
      id: '11',
      name: 'Dell',
      category: ["供货方"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可疑"]
    },{
      id: '12',
      name: 'Microsoft',
      category: ["供货方", "设计院"],
      region: '华南',
      contact: '张三',
      phone: '+86 13612345678',
      email: 'sales@abc.com',
      erpid: 50001234,
      status: ["可疑"]
    },
  ];

  handleCancel = () => {
    this.setState({
      visible: {
        createDailog: false
      }
    });
  }
  
  render() {

    const table_props = this.state.table_props;
    const table_columns = this.state.columns;
    const selectedRowKeys = this.state.selectedRowKeys;
    const visible_createDailog = this.state.visible.createDailog;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    
    var title = () => {
      return (
        <div>
          <Button type="default" icon="search">查询</Button>
          <Button onClick={this.onCreate} type="default" icon="file-add">新建</Button>
          <Button icon="upload">导入</Button>
          <Button icon="download">导出</Button>
          <Button onClick={this.onDelete} type="danger" icon="delete">删除</Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
          </span>
        </div>
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
            dataSource={this.data}
            {...table_props}
            rowSelection={rowSelection}
          >
          </Table>
          <Modal
            title="新建客户"
            visible={visible_createDailog}
            // onOk={this.handleOk}
            // confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            mask={true}
            width={800}
          >
            <CustomerCreation></CustomerCreation>
          </Modal>          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CustomerComponent;
