
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
      user,
      data,
      onDoCreate,
      onDoUpdate,
      onCancel,
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

    const okText = (data._model === 'create'? '创建': '修改');
    const doOk = (data._model === 'create'? onDoCreate: onDoUpdate);
    const title = data._model === 'create'? '新建客户': '编辑 - ' + data.name;
    const handleOnOk = () => {
      const {form} = this.props;
      if(doOk) doOk(form);
    };

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
      >
        <DescriptionList col="2" size="small" title="" style={{ marginBottom: 32 }}>
          <Description term="创建人">{data.creatorUser ? data.creatorUser.name: ''}</Description>
          <Description term="修改人">{data.lastModifierUser ? data.lastModifierUser.name: ''}</Description>
          <Description term="创建时间">{data.creationTime ? moment(data.creationTime).fromNow() : ''}</Description>
          <Description term="修改时间">{data.lastModificationTime ? moment(data.lastModificationTime).fromNow() : ''}</Description>
        </DescriptionList>
        <Form>
          <Tabs type="card">
            <TabPanel tab="基本信息" key="tabBasic">
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="名称" help="">
                    { 
                      getFieldDecorator(
                        'name',
                        {
                          initialValue: user.name,
                          rules: [{required: true, max: 10, min: 2, type: 'string',}],
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
                  <FormItem {...formItemLayoutHorizontal} label="系统编号" help="">
                    { 
                      getFieldDecorator(
                        'id',{
                          initialValue: data.key
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