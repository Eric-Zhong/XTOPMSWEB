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
* Creation: 2019-05-29 13:01:14
 */

import { PureComponent } from "react";
import {
  Form,
  Modal,
  Tabs,
  Input,
  Row,
  Col,
  Cascader,
  Select,
  AutoComplete,
  Button,
  Switch,
  Icon
} from "antd";
import { connect } from "dva";
import moment from "moment";

import DescriptionList from "@/components/DescriptionList";
const { Description } = DescriptionList;

const FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option;

connect(({ user, loading }) => ({
  user,
  loading: loading.opportunity.model
}));
@Form.create()
class UserEditorDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof UserEditorDialog
   */
  render() {
    // console.log(this.props);

    // 从 props 中获取的参数
    const {
      form: { getFieldDecorator, getFieldValue },
      visible,
      user,
      data,
      onDoCreate,
      onDoUpdate,
      onCancel,
      loading,
      onChangePassword
    } = this.props;

    // 定义Form样式
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    const formItemLayoutHorizontal = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 12 }
      }
    };

    const okText = data._model === "create" ? "创建" : "修改";
    const doOk = data._model === "create" ? onDoCreate : onDoUpdate;
    const title = data._model === "create" ? "新建客户" : "编辑 - " + data.name;
    const handleOnOk = () => {
      const { form } = this.props;
      if (doOk) doOk(form);
    };
    const handleOnChangePassword = () => {
      const { form } = this.props;
      if (onChangePassword) onChangePassword(form);
    };

    // Modal's footer option
    const footer = [
      <Button key="back" onClick={onCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        onClick={handleOnOk}
        loading={loading.models.user}
      >
        {okText}
      </Button>
    ];

    const salesData = [];
    const customerData = [];

    return (
      <Modal
        title={title}
        destroyOnClose
        visible={visible}
        okText={okText}
        onCancel={onCancel}
        onOk={handleOnOk}
        width={800}
        footer={footer}
      >
        <DescriptionList
          col="2"
          size="small"
          title=""
          style={{ marginBottom: 32 }}
        >
          <Description term="创建人">
            {data.creatorUser ? data.creatorUser.name : ""}
          </Description>
          <Description term="修改人">
            {data.lastModifierUser ? data.lastModifierUser.name : ""}
          </Description>
          <Description term="创建时间">
            {data.creationTime ? moment(data.creationTime).fromNow() : ""}
          </Description>
          <Description term="修改时间">
            {data.lastModificationTime
              ? moment(data.lastModificationTime).fromNow()
              : ""}
          </Description>
        </DescriptionList>
        <Form>
          <Tabs type="card">
            <TabPanel tab="基本信息" key="tabBasic">
              <Row>
                <Col span={8}>
                  <FormItem
                    {...formItemLayoutHorizontal}
                    label="登记帐号"
                    help=""
                  >
                    {getFieldDecorator("userName", {
                      initialValue: data.userName
                    })(<Input readOnly />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayoutHorizontal}
                    label="全称"
                    help="内容：名称 别名"
                  >
                    {getFieldDecorator("fullName", {
                      initialValue: data.fullName
                    })(<Input readOnly />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayoutHorizontal}
                    label="系统编号"
                    help=""
                  >
                    {getFieldDecorator("id", {
                      initialValue: data.key
                    })(<Input readOnly />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="名称" help="">
                    {getFieldDecorator("name", {
                      initialValue: data.name,
                      rules: [
                        { required: true, max: 20, min: 1, type: "string" }
                      ]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="别名" help="">
                    {getFieldDecorator("surname", {
                      initialValue: data.surname,
                      rules: [
                        { required: true, max: 20, min: 1, type: "string" }
                      ]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="名头" help="">
                    {getFieldDecorator("title", {
                      initialValue: data.title
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <FormItem {...formItemLayout} label="身份证号" help="">
                {getFieldDecorator("idCard", {
                  initialValue: data.idCard
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="员工编号" help="">
                {getFieldDecorator("employeeNumber", {
                  initialValue: data.employeeNumber
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="ERP编号" help="">
                {getFieldDecorator("erpId", {
                  initialValue: data.erpId
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="激活/禁用" help="">
                {getFieldDecorator("isActive", {
                  valuePropName: "checked",
                  initialValue: data.isActive
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                  />
                )}
              </FormItem>
            </TabPanel>
            <TabPanel tab="联系方式" key="tabCommuncate">
              <FormItem {...formItemLayout} label="邮箱" help="">
                {getFieldDecorator("emailAddress", {
                  initialValue: data.emailAddress
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="电话" help="">
                {getFieldDecorator("phone", {
                  initialValue: data.phone
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="地址" help="">
                {getFieldDecorator("address", {
                  initialValue: data.address
                })(<Input />)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="密码设置" key="tabPassword">
              <FormItem {...formItemLayout} label="新密码" help="">
                {getFieldDecorator("newPassword", {
                  initialValue: "",
                  rules: [{ required: false, max: 20, min: 6, type: "string" }]
                })(<Input placeholder="新密码" />)}
              </FormItem>
              <Button onClick={handleOnChangePassword}>修改密码</Button>
            </TabPanel>
            <TabPanel tab="登录日志" key="tabLogin">
              敬请期待
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default UserEditorDialog;
