
 /* Demo

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

*/

import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete} from "antd";
import { connect } from "dva";
import moment from "moment";

import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;

const 
  FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option;


connect(({user, loading})=>({
  user,
  loading: loading.opportunity.model
}));
@Form.create()
class T01_DialogComponent extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      user:{}
    };
  }

  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof T01_DialogComponent
   */
  render(){

    // console.log(this.props);

    // 从 props 中获取的参数
    const {
      form: {getFieldDecorator, getFieldValue},
      visible,
      onCancel,
      user,
    } = this.props;

    // 从 state 中获取数据

    // 定义Form样式
    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 20}
      }
    };

    const formItemLayoutHorizontal = {
      labelCol: {
        xs: {span: 10}, sm: {span: 12}
      },
      wrapperCol: {
        xs: {span: 14}, sm: {span: 12}
      }
    }

    const onConfirmOk = () => {
      const {form, onOk} = this.props;
      if(onOk) onOk(form);  
    };

    const salesData = [];
    const customerData = [];

    return (
      <Modal
      title="新建机会"
      destroyOnClose
      visible={visible}
      okText="创建"
      onCancel={onCancel}
      onOk={onConfirmOk}
      width={800}
      >
        <Form>
          <Tabs type="card">
            <TabPanel tab="基本信息" key="tabBasic">
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="创建人" help="">
                    { 
                      getFieldDecorator(
                        'createUserName',
                        {
                          initialValue: user.name
                        }
                      )(<Input readOnly></Input>) 
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="创建时间" help="">
                    { 
                      getFieldDecorator(
                        'creationTime', {
                          initialValue: moment().format('YYYY-MM-DD hh:mm')
                        }
                      )(<Input readOnly></Input>) 
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="机会编号" help="">
                    { 
                      getFieldDecorator(
                        'id',{
                          initialValue: newId
                        }
                      )(<Input readOnly></Input>) 
                    }
                  </FormItem>
                </Col>
              </Row>
            </TabPanel>
            <TabPanel tab="产品信息" key="tabProduction"></TabPanel>
            <TabPanel tab="交付地址" key="tabAddress">
            </TabPanel>
            <TabPanel tab="风险识别" key="tabRisk"></TabPanel>
            <TabPanel tab="跟踪日志" key="tabLog"></TabPanel>
            <TabPanel tab="启动流程" key="tabWorkflow"></TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default T01_DialogComponent;