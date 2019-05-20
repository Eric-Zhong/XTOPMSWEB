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
* Creation: 2019-04-22 22:11:56
 */

import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete, Switch, Icon,} from "antd";
import { connect } from "dva";
import User from '@/models/user';
import moment from "moment";
import { Button } from "antd/lib/radio";

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
class AccessTokenEditorDialog extends PureComponent{


  /**
   * 构造函数
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-23
   * @param {*} props
   * @memberof AccessTokenEditorDialog
   */
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
   * @memberof AccessTokenEditorDialog
   */
  render(){

    // console.log(this.props);

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
      title="Access Token Editor"
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
              <FormItem {...formItemLayout} label="服务名称" help="">
                {getFieldDecorator( 'name',{ initialValue: data.name })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="服务编号" help="编号由XTOPMS定义，请不要随意修改。">
                {getFieldDecorator( 'code',{ initialValue: data.code })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="内部编号" help="">
                {getFieldDecorator( 'erpId',{ initialValue: data.erpId })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="服务状态" help="默认值为'0'">
                {getFieldDecorator( 'status',{ initialValue: data.status })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="激活" help="">
                {getFieldDecorator( 'isActive',{ valuePropName: 'checked', initialValue: data.isActive })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}></Switch>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="服务设置" key="tabSetting">
              <FormItem {...formItemLayout} label="服务帐号" help="">
                {getFieldDecorator( 'accessTokenId',{ initialValue: data.accessTokenInfo ? data.accessTokenInfo.key: ''})(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="下次启动时间" help="">
                {getFieldDecorator( 'nextRunTime',{ initialValue: data.nextRunTime })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="延时周期" help="">
                {getFieldDecorator( 'interval',{ initialValue: data.interval })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="重试次数" help="">
                {getFieldDecorator( 'retryCount',{ initialValue: data.retryCount })(<Input></Input>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="服务配置" key="tabExtension">
              <FormItem {...formItemLayout} label="配置参数" help="">
                {getFieldDecorator( 'extensionData',{ initialValue: data.extensionData })(<TextArea rows={10}></TextArea>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="备注描述" key="tabComment">
              <FormItem {...formItemLayout} label="配置参数" help="">
                {getFieldDecorator( 'comment',{ initialValue: data.comment })(<TextArea rows={10}></TextArea>)}
              </FormItem>
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default AccessTokenEditorDialog;