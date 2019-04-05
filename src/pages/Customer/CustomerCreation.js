import {Card, Form, Input, Button, Checkbox, InputNumber, DatePicker, Row, Col, Tabs, Rate} from 'antd';
import { PureComponent } from 'react';
import moment from 'moment';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const { Meta } = Card;

@Form.create()
class CustomerCreationComponent extends PureComponent{

  render(){

    const {form: {getFieldDecorator, getFieldValue}} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 20}
      }
    };

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Tabs type="card">
            <TabPane tab="基本信息" key="basic">
              <FormItem {...formItemLayout} label="名称">
                {
                  getFieldDecorator(
                    'name',
                    {
                      initialValue: "",
                      rules:[
                        {
                          required: true, 
                          message: "请输入客户名称"
                        }
                      ]
                    }
                  )(<Input placeholder="公司名称，请输入公司的全称，要不用短名"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="企业代码">
                { getFieldDecorator('erpid', { initialValue: "" } )(<Input placeholder="企业信用代码证号"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="唯一识别号">
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
                      initialValue: ["Red", "Blue"]
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
                { getFieldDecorator('comment', { initialValue: "" } )(<Input placeholder="开户银行名称，请用银行全称"></Input>) }
              </FormItem>
              <FormItem {...formItemLayout} label="开户银行账号">
                { getFieldDecorator('comment', { initialValue: "" } )(<Input placeholder=""></Input>) }
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
              </Row>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
              <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                <Col span={4}>
                  <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="营业执照" description="" />
                  </Card>
                </Col>
              </Card>
              <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                  <Meta title="营业执照" description="" />
              </Card>
              <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                  <Meta title="营业执照" description="" />
              </Card>
              <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                  <Meta title="营业执照" description="" />
              </Card>
              <Card hoverable  style={{ width: 100 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                  <Meta title="营业执照" description="" />
              </Card>
            </TabPane>
            <TabPane tab="信誉等级" key="rate">
              <FormItem {...formItemLayout} label="信誉评定">
                { getFieldDecorator('rate', { initialValue: 3, allowClear: false } )(<Rate placeholder=""></Rate>) }
              </FormItem>
              <FormItem {...formItemLayout} label="评定理由">
                { getFieldDecorator('rateReason', { initialValue: "" } )(<Input placeholder=""></Input>) }
              </FormItem>
            </TabPane>
            <TabPane tab="扩展字段" key="extension">
            </TabPane>
          </Tabs>
        </Form>
      </Card>
    );
  }
}


export default CustomerCreationComponent;