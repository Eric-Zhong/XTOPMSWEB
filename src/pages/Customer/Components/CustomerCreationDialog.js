/**
 * @file Customer Creation Dialog Component
 * @author Eric-Zhong Xu
 * @copyright Tigoole Tech
 * @createDate 2019-04-04 21:35:00
 */

import { PureComponent } from "react";
import { Modal } from "antd";
import { Card, Form, Input, Button, Checkbox, InputNumber, DatePicker, Row, Col, Tabs, Rate } from 'antd';
import moment from 'moment';
import {snowflakeId} from '@/utils/snowflake';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const { Meta } = Card;


/**
 * @class CustomerCreationDialog
 * @classdesc Use a dialog component for create customer data.
 * @desc 
 */
@Form.create()
class CustomerCreationDialog extends PureComponent{

  /**
   * @constructor
   * @param {object} props 
   */
  constructor(props){
    super(props);
    this.state = {
      onCreated: props.onCreated
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

    const form = this.props.form;
    const onCreated = this.state.onCreated;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      var customerInfo = fieldsValue;
      if(onCreated) onCreated(form, customerInfo);
    });

  }

  render() {

    const {form: {getFieldDecorator, getFieldValue}} = this.props;
    const {id, visible, onOk, onCancel} = this.props;
    // * 在这里计算用于显示的数据
    const customerId = (this.props.customerId ? this.props.customerId : snowflakeId()); // 新建用户时，直接生成一个ID
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 20}
      }
    };

    return (
      <Modal
        title="新建客户"
        destroyOnClose
        visible={visible}
        okText="创建"
        onCancel={onCancel}
        onOk={this.onOk}
        width={800}
      >
        <Form onSubmit={this.handleSubmit}>
          <Tabs type="card">
            <TabPane tab="基本信息" key="basic">
              <FormItem {...formItemLayout} label="客户编号" help="客户编号，由系统自动生成，不需修改。">
                { getFieldDecorator(
                    'id', { 
                      initialValue: customerId 
                    } )(<Input placeholder="客户编号" readOnly></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="母公司名称" help="客户所属的母公司名称。如果没有，请留空。如果找不到，请先创建母公司。">
                { getFieldDecorator('parentCustomerId', { initialValue: "" } )(<Input placeholder="母公司名称"></Input>) }
              </FormItem>
              <FormItem 
                {...formItemLayout} 
                label="客户名称"
                help="企业营业执照上的企业名称，不要使用缩写或自定义名称。"
                >
                {
                  getFieldDecorator(
                    'name',
                    {
                      initialValue: "",
                      rules:[
                        {
                          required: true, 
                          message: "请输入客户名称，且最少4个文字。"
                        }
                      ]
                    }
                  )(<Input placeholder="企业营业执照上的企业名称"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="统一社会信用代码" help="新版营业执行上的统一社会信用代码，如：91110228691683137R">
                { getFieldDecorator('companyCode', { initialValue: "" } )(<Input placeholder="企业信用代码证号。如：91110228691683137R"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="系统识别号" help="输入你所在企业对此客户定义的唯一编号。如SAP系统中的CUSTOMER NUMBER。">
                { getFieldDecorator('erpid', { initialValue: "" } )(<Input placeholder="请输入企业内部系统中定义该客户的唯一标识"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="代码">
                { getFieldDecorator('code', { initialValue: "" } )(<Input placeholder="用于快速检索的代码"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="分类">
                {
                  getFieldDecorator(
                    'category',
                    {
                      initialValue: ["100010001", "100010002"]
                    }
                  )(
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Row>
                        <Col span={4}><Checkbox value="100010001">业主</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010002">总包方</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010003">研究院</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010004">供货商</Checkbox></Col>
                        <Col span={4}><Checkbox value="100010005">代理</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  )
                }
              </FormItem>
            </TabPane>
            <TabPane tab="银行信息" key="bank">
              <FormItem {...formItemLayout} label="开户银行名称">
                { getFieldDecorator('bankName', { initialValue: "" } )(<Input placeholder="开户银行名称，请用银行全称"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="开户银行账号">
                { getFieldDecorator('bankAccount', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
            <TabPane tab="联系方式" key="contact">
              <FormItem {...formItemLayout} label="负责人">
                { getFieldDecorator('person', { initialValue: "" } )(<Input placeholder="客户方沟通协调人名称"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="联系电话">
                { getFieldDecorator('phone', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="传真号码">
                { getFieldDecorator('fax', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱地址">
                { getFieldDecorator('email', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="办公地址">
                { getFieldDecorator('address', { initialValue: "" } )(<Input placeholder=""></Input>) }
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
                { getFieldDecorator('rate', { initialValue: 3, allowClear: false } )(<Rate placeholder=""></Rate>) }
              </FormItem>
              <FormItem {...formItemLayout} label="评定理由">
                { getFieldDecorator('rateReason', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }

}

export default CustomerCreationDialog;