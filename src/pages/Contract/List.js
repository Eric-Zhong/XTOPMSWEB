import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Table} from 'antd';

class ContractListComponent extends PureComponent {

  render() {

    // 定义表格的 Column
    const columns = [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },{
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },{
      title: 'Unit Price',
      key: 'price',
      dataIndex: 'price',
    },{
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
    }];

    // 定义表格的 Data
    const data = [{
      key: '1',
      name: 'Car',
      amount: 10,
      price: 123.45,
      total: 1234.50
    },{
      key: '2',
      name: 'Car',
      amount: 10,
      price: 123.45,
      total: 1234.50
    },{
      key: '3',
      name: 'Car',
      amount: 10,
      price: 123.45,
      total: 1234.50
    },{
      key: '4',
      name: 'Car',
      amount: 10,
      price: 123.45,
      total: 1234.50
    },];


    // 如果需要 Checkbox，需要定义下面内容
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disable User',
        name: record.name,
      }),
    };

    return (
      <PageHeaderWrapper
        title="基础表格"
        content="通过后台得到数据，显示成表格内容"
      >
        <Card>
          <Table 
            columns={columns} 
            dataSource={data}
            rowSelection={rowSelection}
          >
          </Table>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ContractListComponent;
