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
* Creation: 2019-05-20 15:38:18
 */

import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete, Switch, Icon,} from "antd";
import { connect } from "dva";
import moment from "moment";

const 
  FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option,
  {TextArea} = Input;


connect(({user, loading})=>({
  user,
  loading: loading.opportunity.model
}));
@Form.create()
class AlibabaProductCategoryEditorDialog extends PureComponent{


  /**
   * 构造函数
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-23
   * @param {*} props
   * @memberof AlibabaProductCategoryEditorDialog
   */
  constructor(props){
    super(props);
    this.state = {
    };
  }

  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof AlibabaProductCategoryEditorDialog
   */
  render(){

    // console.log(this.props);
    const title = '商品货号';
    // 从 props 中获取的参数
    const {
      form: {getFieldDecorator, getFieldValue},
      visible,
      onCancel,
      data
    } = this.props;

    // 定义 Form 样式
    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 18}
      }
    };

    const onConfirmOk = () => {
      const {form, onDoUpdate, onCreate, data} = this.props;
      if(data._model === 'create'){
        if(onCreate) onCreate(form);  
      } else if (data._model === 'edit'){
        if(onDoUpdate) onDoUpdate(form);
      }
    };


    // Dialog button name
    var buttonOkName = '';
    if(data._model === 'create') buttonOkName = '创建';
    if(data._model === 'edit') buttonOkName = '更新';

    return (
      <Modal
      title={title}
      destroyOnClose
      visible={visible}
      okText={buttonOkName}
      onCancel={onCancel}
      onOk={onConfirmOk}
      width={800}
      >
        <Form>
          <Tabs type="card" tabPosition="top">
            <TabPanel tab="基本信息" key="tabBasic">
              <FormItem {...formItemLayout} label="系统编号" help="">
                {getFieldDecorator( 'id',{ initialValue: data.key })(<Input readOnly={true}></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="商品货号" help="">
                {getFieldDecorator( 'code',{ initialValue: data.code })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="名称" help="">
                {getFieldDecorator( 'name',{ initialValue: data.name })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="内部编号" help="">
                {getFieldDecorator( 'erpId',{ initialValue: data.erpId })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="激活" help="">
                {getFieldDecorator( 'isActive',{ valuePropName: 'checked', initialValue: data.isActive })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}></Switch>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="扩展信息" key="tabExtension">
              <FormItem {...formItemLayout} label="配置参数" help="如需修改，请联系管理员进行操作。">
                {getFieldDecorator( 'extensionData',{ initialValue: data.extensionData })(<TextArea rows={10}></TextArea>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="备注描述" key="tabComment">
              <FormItem {...formItemLayout} label="备注" help="">
                {getFieldDecorator( 'comment',{ initialValue: data.comment })(<TextArea rows={10}></TextArea>)}
              </FormItem>
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default AlibabaProductCategoryEditorDialog;