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
* Creation: 2019-06-02 22:01:13
 */

import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Row, Col, Button, Card, Table, Tag, Modal } from "antd";
import { snowflakeId } from "@/utils/snowflake";
import { connect } from "dva";
import moment from "moment";

const confirm = Modal.confirm;

// TODO: 替换这里的Service名称
import { ServiceName } from "@/services/AlibabaCallbackService";
import UserEditorDialog from "./components/UserEditorDialog";
// TODO: 使用最终需要用到的model名称来远的这里
@connect(({ // Model
  user, AlibabaCallbackMessage, loading }) => ({
  user, // Mapping to properties
  AlibabaCallbackMessage,
  loading: loading
}))
class AlibabaCallbackHome extends PureComponent {
  SERVICE_NAMESPACE = ServiceName; // Service 中定义的 reducer & effector
  CON_PAGE_TITLE = "回传数据";
  CON_PAGE_CONTENT =
    "接收到阿里巴巴发来的数据，显示处理状态，可以进行消息重发。";
  CON_TABLE_OPTION = {
    rowKey: "key",
    bordered: true,
    size: "small",
    showHeader: true,
    hasData: false,
    scroll: {
      // x: 1800,
      // y: 450,
    }
  };

  CON_TABLE_PAGINATION_OPTION = {
    current: 1,
    pageSize: 10,
    defaultPageSize: 10,
    pageSizeOptions: ["10", "20", "50", "100", "500"],
    showQuickJumper: true,
    showSizeChanger: true,
    position: "both",
    showTotal: (total, range) => {
      return "总计: " + total + " 条";
    }
  };

  CON_COLUMNS_OPTION = [
    {
      title: "接收时间",
      dataIndex: "creationTime",
      // fixed: 'left',
      width: 120,
      render: (cell, raw, index) => {
        const v = moment(cell).fromNow();
        return v;
      }
    },
    {
      title: "处理状态",
      dataIndex: "status",
      width: 100,
      render: (cell, record, index) => {
        return <Tag>{cell}</Tag>;
      }
    },
    {
      title: "数据内容",
      dataIndex: "body"
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 60
    }
  ];

  /**
   * @description The event on selected some item in the table.
   * @memberof CustomerIndexComponent
   */
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  /**
   *Constructor function. Call this function when component first created.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @param {*} props
   * @memberof AlibabaCallbackHome
   */
  constructor(props) {
    super(props);
    // Declare this component's state
    this.state = {
      rowSelection: {}, // current selected row in the table.
      selectedRowKeys: [], // selected row in the table.
      selectedRows: [],
      data: [], // table datasource.
      editEntity: {}, // generate this entity when select a row. It's well send to edit dialog.
      // editorVisible: false,             // edit dialog visible switch.
      pagination: this.CON_TABLE_PAGINATION_OPTION
    };
  }

  /**
   * @description When components created, react will execute this function.
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AlibabaCallbackHome
   */
  componentDidMount() {
    const { dispatch } = this.props; // Get dispatch from parent component.
    const { pagination, filters, sorter } = this.state;
    const payload = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters: filters,
      sorter: sorter
    };
    // load data
    dispatch({
      type: this.SERVICE_NAMESPACE + "/query",
      payload: payload
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + "/clear",
      payload: null
    });
  }

  changeEditorVisible(isShow) {
    const { dispatch } = this.props;
    dispatch({
      type: this.SERVICE_NAMESPACE + "/editorVisible",
      payload: isShow
    });
  }

  handleOnSearch = () => {
    this.componentDidMount();
  };

  handleOnCreate = () => {
    const {
      dispatch,
      user: { currentUser } // Get current user data.
    } = this.props;

    const newId = snowflakeId(); // Generate a new id for new entity.

    const entity = {
      _model: "create",
      id: newId,
      key: newId,
      name: moment().format("YYYYMMDDHHMMSS.") + currentUser.name + ".创建的"
    };

    // this.setState({
    //   editEntity: entity,
    //   editorVisible: true,
    // });

    this.changeEditorVisible(true);
  };

  handleOnEdit = record => {
    this.setState({
      editEntity: {
        _model: "edit",
        ...record
      }
      // editorVisible: true,
    });

    this.changeEditorVisible(true);
  };

  handleEditorCancel = () => {
    // this.setState({
    //   editorVisible: false,
    // });

    this.changeEditorVisible(false);
  };

  handleDoUpdate = form => {
    const { dispatch } = this.props; // Get dispatch from parent component.

    // 为更新后刷新界面做准备
    const { pagination, filters, sorter } = this.state;
    const queryOption = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters: filters,
      sorter: sorter,
      _next: "editorVisible",
      _next_param: false
    };

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var formData = {
        ...this.state.editEntity,
        ...fieldsValue
      };
      console.log(formData);
      dispatch({
        type: this.SERVICE_NAMESPACE + "/update",
        payload: {
          ...formData,
          _next: "query", // 调用自身Model的Query方法更新数据
          _next_param: queryOption
        }
      });

      // this.setState({
      //   editorVisible: false,
      // });
      // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  };

  handleDoCreate = form => {
    const { dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formData = fieldsValue;
      const entityData = Object.assign({ _model: "create" }, formData, {
        salesId: formData.sales.userId
      });
      dispatch({
        type: this.SERVICE_NAMESPACE + "/create",
        payload: entityData
      });

      // this.setState({
      //   editorVisible: false,
      // });
      // // ! 这里发现如果创建成功后，马上去获取最新数据会发现数据没有被加载上，这里增加1秒延时
      // setTimeout(() => this.componentDidMount(), 1000);
    });
  };

  handleOnDelete = () => {
    const { dispatch } = this.props;
    const customerIds = this.state.selectedRowKeys;
    const onOk = this.handleDeleteConfirmOk;
    confirm({
      title: "请确认是否重新发送",
      content: "请确认真的要重发吗？",
      onOk,
      onCancel() {}
    });
  };

  handleDeleteConfirmOk = () => {
    const { dispatch } = this.props;
    const selectedIds = this.state.selectedRows.map((item, index) => {
      return item.id;
    });
    console.log(selectedIds);
    dispatch({
      type: this.SERVICE_NAMESPACE + "/resend",
      payload: selectedIds
    });
    this.setState({
      selectedRowKeys: []
    });
  };

  tableTitleOption = () => {
    const { loading } = this.props;
    const { selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row gutter={24}>
        <Col>
          <Button
            onClick={this.handleOnSearch}
            type="default"
            icon="search"
            loading={loading.effects[this.SERVICE_NAMESPACE + "/query"]}
          >
            查询
          </Button>
          <Button
            onClick={this.handleOnDelete}
            type="danger"
            icon="delete"
            loading={loading.effects[this.SERVICE_NAMESPACE + "/resend"]}
            disabled={!hasSelected || loading.global}
          >
            重发
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ""}
          </span>
        </Col>
      </Row>
    );
  };

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
      sorter: sorter,
      filters: filters
    };
    dispatch({
      type: this.SERVICE_NAMESPACE + "/query",
      payload: params
    });
  };

  /**
   * @description change this user's password
   * @memberof UserEditorDialog
   */
  handleOnChangePassword = form => {
    const { dispatch } = this.props;
    const password = form.getFieldValue("newPassword");
    const userId = form.getFieldValue("id");
    dispatch({
      type: ServiceName + "/changeUserPassword",
      payload: {
        currentPassword: password,
        newPassword: password,
        userId: userId
      }
    });
  };

  /**
   * @description Render the html
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-22
   * @memberof AlibabaCallbackHome
   */
  render() {
    const { user, loading } = this.props;

    const { currentUser } = user;
    const model = this.props[ServiceName];

    const selectedRowKeys = this.state.selectedRowKeys;
    // const editorVisible = this.state.editorVisible;
    const editorVisible = model.editorVisible;

    const dataSource = model.data;
    const totalCount = model.total;

    // 分页
    const paginationOption = {
      ...this.state.pagination,
      total: totalCount
    };

    // 多选
    const rowSelectionOption = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <PageHeaderWrapper
        title={this.CON_PAGE_TITLE}
        content={this.CON_PAGE_CONTENT}
      >
        <Card>
          <Table
            {...this.CON_TABLE_OPTION}
            rowKey="id"
            columns={this.CON_COLUMNS_OPTION}
            title={this.tableTitleOption}
            dataSource={dataSource}
            pagination={paginationOption}
            rowSelection={rowSelectionOption}
            onChange={this.handleTableOnChange}
            // onRow={(record)=>{return {onClick: (event)=>{this.handleOnEdit(record);}}}}
            loading={loading.models[ServiceName]}
          />
          <UserEditorDialog
            {...this.props}
            data={this.state.editEntity}
            user={currentUser}
            visible={editorVisible}
            onDoCreate={this.handleDoCreate}
            onDoUpdate={this.handleDoUpdate}
            onCancel={this.handleEditorCancel}
            onChangePassword={this.handleOnChangePassword}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AlibabaCallbackHome;
