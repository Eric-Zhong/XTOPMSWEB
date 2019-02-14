import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {formatMessage} from 'umi/locale';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Checkbox,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
import FormItem from 'antd/lib/form/FormItem';
import roles from '@/utils/roles';
import { element } from 'prop-types';

const role_option = roles;

@Form.create()
class CreateUserDailog extends PureComponent {

  state = {
    // data
    // showDailog: true,
    roleCheckedValues: [],
    // flag
    changePasswordRequest: true,
    indeterminate: false,
    checkedAll: false,
  };  
  
  render() {
    const {form: { getFieldDecorator }} = this.props;
    const {onOk, onCancel, visible, confirmLoading} = this.props;

    // Form Layout
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const tailFormItemLayout = {
      // labelCol: {span: 6},
      wrapperCol: {span: 18, offset: 6},
    }

    return (
      <Modal
        destroyOnClose
        title={formatMessage({id:'app.text.create_user'})}
        okText="创建"
        iconType='question-circle'
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
      >
      <Form>
        <Tabs>
          <TabPane tab={formatMessage({id:'app.text.account_info'})} key="1">
            <FormItem {...formItemLayout}
              label={formatMessage({id:'app.text.user_account'})}
            >
            {
              getFieldDecorator('userName', {
                rules:[{
                  required: true, 
                }]
              })(
                <Input></Input>
              )
            }
            </FormItem>
            <FormItem {...formItemLayout}
              label={formatMessage({id:'app.text.email'})}
            >
            {
              getFieldDecorator('emailAddress', {
                rules:[{
                  required: true, 
                }]
              })(
                <Input></Input>
              )
            }
            </FormItem>
            <FormItem {...formItemLayout}
              label={formatMessage({id:'app.text.password'})}
            >
            {
              getFieldDecorator('password', {
                rules:[{
                  required: true, 
                }]
              })(
                <Input type="password"></Input>
              )
            }
            </FormItem>
            <FormItem {...formItemLayout}
              label={formatMessage({id:'app.text.user_name'})}
            >
            {
              getFieldDecorator('name', {
                rules:[{
                  required: true, 
                  message: formatMessage({id: 'app.form.user_name_required'})
                }]
              })(
                <Input></Input>
              )
            }
            </FormItem>
            <FormItem {...formItemLayout}
              label={formatMessage({id:'app.text.surname'})}
            >
            {
              getFieldDecorator('surname', {
                rules:[{
                  required: true, 
                }]
              })(
                <Input></Input>
              )
            }
            </FormItem>
            <FormItem {...tailFormItemLayout}>
            {
              getFieldDecorator('isActive', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>{formatMessage({id:'app.text.is_active'})}</Checkbox>
              )
            }
            </FormItem>
            <FormItem {...tailFormItemLayout}>
            {
              getFieldDecorator('requestChangePassword', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>{formatMessage({id:'app.text.change_password_when_first_login'})}</Checkbox>
              )
            }
            </FormItem>
          </TabPane>
          <TabPane tab={formatMessage({id:'app.text.department'})} key="2">
          </TabPane>
          <TabPane tab={formatMessage({id:'app.text.role'})} key="3">
            <div>
              <div style={{borderBottom: '1px solid #e9e9e9'}}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  checked={this.state.checkedAll}
                  onChange={this.onRoleCheckAll}
                >{formatMessage({id:'app.text.check_all'})}</Checkbox>
              </div>
            </div>
            <br />
            <CheckboxGroup
              options={role_option}
              value={this.state.roleCheckedValues}
              onChange={this.onRoleCheckboxChange}
              confirmLoading={confirmLoading}
            ></CheckboxGroup>
          </TabPane>
        </Tabs>
        </Form>
      </Modal>
    );
  }

  handleOk = (e) => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values)=>{
      if(!err){
        const userData = {
          ...values,
          roleNames: this.state.roleCheckedValues
        };
        const {onOk} = this.props;
        if(onOk){
          onOk(userData);
        }
      }
    });
  }

  handleCancel = () => {
    const {onCancel} = this.props;
    if(onCancel){
      onCancel();
    }
  }

  // Role checkbox
  onRoleCheckboxChange = (roleCheckedValues) => {
    this.setState({
      roleCheckedValues,
      indeterminate: !!roleCheckedValues.length && (roleCheckedValues.length < role_option.length),
      checkedAll: roleCheckedValues.length === role_option.length,
    });
  }

  onRoleCheckAll = (e) => {
    const allRolesName = role_option.map((item)=>{
      return item.value;
    });
    this.setState({
      roleCheckedValues: e.target.checked ? allRolesName: [],
      indeterminate: false,
      checkedAll: e.target.checked,
    });
  }
}

export default CreateUserDailog; 