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
* Creation: 2019-04-07 09:15:54
 */

 
import { PureComponent } from "react";
import { connect } from 'dva';
import { Modal } from "antd";
import { Card, Form, Input, Button, Checkbox, InputNumber, DatePicker, Row, Col, Tabs, Rate } from 'antd';
import moment from 'moment';
import {snowflakeId} from '@/utils/snowflake';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const { Meta } = Card;


/**
 * @description Dialog for create customer.
 * @class CustomerEditorDialog
 * @classdesc Use a dialog component for create customer data.
 */
@Form.create()
class CustomerEditorDialog extends PureComponent{

  /**
   * @constructor
   * @param {object} props 
   */
  constructor(props){
    super(props);
    this.state = {
    };
  }

  /**
   * @method handleCancel
   * @description Handle event when dialog closed.
   */
  handleCancel = () =>{
    this.state = {
      visible: false,
    };
  }

  onOk = () => {
    const {form, dispatch, onCreated} = this.props;
    if(onCreated) onCreated(form);
  }

  render() {

    const {form: {getFieldDecorator, getFieldValue}} = this.props;
    const {
      data, user, visible, onCancel, onDoCreate, onDoUpdate
    } = this.props;
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 20}
      }
    };

    const okText = (data._model === 'create'? '创建': '修改');
    const doOk = (data._model === 'create'? onDoCreate: onDoUpdate);

    const handleOnOk = () => {
      const {form} = this.props;
      if(doOk) doOk(form);
    };

    // caclulate customer's category value.
    const categorySettings = data.customerCategorySettings? data.customerCategorySettings.map((element, index)=>{
      return element.categoryCode;
    }): [];

    return (
      <Modal
        title="新建客户"
        destroyOnClose
        visible={visible}
        okText={okText}
        onCancel={onCancel}
        onOk={handleOnOk}
        width={800}
        >
        <Form onSubmit={this.handleSubmit}>
          <Tabs type="card">
            <TabPane tab="基本信息" key="basic">
              <FormItem {...formItemLayout} label="客户编号" help="客户编号，由系统自动生成，不需修改。">
                { getFieldDecorator(
                    'id', { 
                      initialValue: data.key 
                    } )(<Input placeholder="客户编号" readOnly disabled></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="客户简称">
                { 
                  getFieldDecorator(
                    'shortName', 
                    { 
                      initialValue: data.shortName,
                      rules: [{
                        required: true,
                        max: 10,
                        min: 2,
                        type: 'string',
                      }]
                    } 
                  )(<Input placeholder="客户通用的简称。如：钛谷，微软，IBM等。”"></Input>) }
              </FormItem>
              <FormItem 
                {...formItemLayout} 
                label="客户全称"
                help=""
                >
                {
                  getFieldDecorator(
                    'name',
                    {
                      initialValue: data.name,
                      rules:[
                        {
                          required: true, 
                          message: "请输入客户名称，且最少4个文字。"
                        }
                      ]
                    }
                  )(<Input placeholder="企业营业执照上的企业名称，不要使用缩写或自定义名称。"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="母公司" help="">
                { getFieldDecorator('parentCustomerId', { initialValue: "" } )(<Input placeholder="客户所属的母公司名称。如果没有，请留空。如果找不到，请先创建母公司客户。" disabled></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="统一社会信用代码" help="">
                { getFieldDecorator('companyCode', { initialValue: data.companyCode } )(<Input placeholder="新版营业执行上的统一社会信用代码，如：91110228691683137R。"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="系统识别号" help="">
                { getFieldDecorator('erpid', { initialValue: data.erpId } )(<Input placeholder="你所在企业对此客户定义的唯一编号，如ERP系统中该客户的唯一识别号。"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="分类">
                {
                  getFieldDecorator(
                    'categorySettings',
                    {
                      initialValue: categorySettings
                    }
                  )(
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Row>
                        <Col span={4}><Checkbox value="100010001">业主</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010002">总包方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010003">分包方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010004">施工方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010005">供货方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010006">监理方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010007">研究院</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010008">代理</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010009">竞争对手</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  )
                }
              </FormItem>
              <FormItem {...formItemLayout} label="公司地址">
                { getFieldDecorator('address', { initialValue: data.address } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
            <TabPane tab="银行信息" key="bank">
              <FormItem {...formItemLayout} label="开户银行名称">
                { getFieldDecorator('bankName', { initialValue: data.bankName } )(<Input placeholder="开户银行名称，请用银行全称"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="开户银行账号">
                { getFieldDecorator('bankAccount', { initialValue: data.bankAccount } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
            <TabPane tab="联系方式" key="contact">
              <FormItem {...formItemLayout} label="联系人">
                { getFieldDecorator('person', { initialValue: data.person } )(<Input placeholder="客户方沟通协调人名称"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="联系电话">
                { getFieldDecorator('phone', { initialValue: data.phone } )(<Input placeholder=""></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="传真号码">
                { getFieldDecorator('fax', { initialValue: data.fax } )(<Input placeholder=""></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱地址">
                { getFieldDecorator('email', { initialValue: data.email } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
            <TabPane tab="相关文件" key="files">
              <Row>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="扩展字段" key="extension">
              <span>开发中...</span>
            </TabPane>
            <TabPane tab="信誉等级" key="rate">
              <FormItem {...formItemLayout} label="信誉评定">
                { getFieldDecorator('rate', { initialValue: data.rate, allowClear: false } )(<Rate placeholder=""></Rate>) }
              </FormItem>
              <FormItem {...formItemLayout} label="评定理由">
                { getFieldDecorator('rateReason', { initialValue: data.reateReason } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CustomerEditorDialog;