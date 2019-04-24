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
      newId,
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
      const {form, onEdit, onCreate, data} = this.props;
      if(data._model === 'new'){
        if(onCreate) onCreate(form);  
      } else if (data._model === 'edit'){
        if(onEdit) onEdit(form);
      }
    };


    /**
     * @description 执行通过Code刷新Token的WebAPI.
     * @memberof AccessTokenEditorDialog
     */
    const handleOnInitToken = () => {

      const {form, onInitToken} = this.props;

      var id = form.getFieldValue('id');
      var code = form.getFieldValue('_ssoCode');
      var appKey = form.getFieldValue('app_Key');
      var appSecret = form.getFieldValue('app_Secret');

      if(code && code.length > 0) {
        if(onInitToken){
          onInitToken({
            accessTokenId: id,
            code: code,
            appKey: appKey,
            appSecret: appSecret,
          });
        }
      } else {
        Modal.warn({
          title: 'Warn',
          content: 'Code can not been empty.',
        });
      }
    }


    const sso_uri = "https://auth.1688.com/oauth/authorize?client_id="
      + data.app_Key
      + "&site=1688&redirect_uri=https://auth.1688.com/auth/authCode.htm&state=XTOPMS";


    // Dialog button name
    var buttonOkName = '';
    if(data._model === 'new') buttonOkName = '创建';
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
          <Tabs type="card" tabPosition="left">
            <TabPanel tab="Account Information" key="tabBasic">
              <FormItem {...formItemLayout} label="Name" help="">
                {getFieldDecorator( 'name',{ initialValue: data.name })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="App Key" help="">
                {getFieldDecorator( 'app_Key',{ initialValue: data.app_Key })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="App Secret" help="">
                {getFieldDecorator( 'app_Secret',{ initialValue: data.app_Secret })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Code" help="">
                {getFieldDecorator( 'code',{ initialValue: data.code })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Status" help="">
                {getFieldDecorator( 'status',{ initialValue: data.status })(<Input></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Is Active" help="">
                {getFieldDecorator( 'isActive')(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={data.isActive==1}></Switch>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="Access Token" key="tabToken">
              <FormItem {...formItemLayout} label="Alibaba ID" help="">
                {getFieldDecorator( '_aliId',{ initialValue: data.aliId })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Member ID" help="">
                {getFieldDecorator( '_memberId',{ initialValue: data.memberId })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Resource Owner" help="">
                {getFieldDecorator( '_resourceOwner',{ initialValue: data.resource_Owner })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Access Token" help="">
                {getFieldDecorator( '_accessToken',{ initialValue: data.access_Token })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Timeout" help="">
                {getFieldDecorator( '_accessTokenTimeout',{ initialValue: data.expires_In })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Refresh Token" help="">
                {getFieldDecorator( '_refreshToken',{ initialValue: data.refresh_Token })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Timeout" help="">
                {getFieldDecorator( '_refreshTokenTimeout',{ initialValue: data.refresh_Token_Timeout })(<Input readOnly></Input>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="Comment" key="tabComment">
              <FormItem {...formItemLayout} label="Comment" help="">
                {getFieldDecorator( 'comment',{ initialValue: data.comment })(<TextArea rows={10}></TextArea>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="Other" key="tabOther">
              <FormItem {...formItemLayout} label="ID" help="">
                {getFieldDecorator( 'id',{ initialValue: data.id })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Creator User ID" help="">
                {getFieldDecorator( '_creatorUserId',{ initialValue: data.creatorUserId })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Creation Time" help="">
                {getFieldDecorator( '_creationTime',{ initialValue: data.creationTime })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Modification Time" help="">
                {getFieldDecorator( '_lastModificationTime',{ initialValue: data.lastModificationTime })(<Input readOnly></Input>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Modifier User ID" help="">
                {getFieldDecorator( '_lastModifierUserId',{ initialValue: data.lastModifierUserId })(<Input readOnly></Input>)}
              </FormItem>
            </TabPanel>
            <TabPanel tab="Initiate" key="tabInitiate">
              <Row>
                <Col span={24}>
                  <p>
                    点击下面的链接，跳转到 Alibaba 身份验证中心，输入授权的帐号、密码后，可以拿到刷新 Token 的 Code。
                  </p>
                  <p>
                    <a href={sso_uri} target="_blank">获取 Code </a>
                  </p>
                </Col>
              </Row>
              <FormItem {...formItemLayout} label="Code" help="">
                {getFieldDecorator('_ssoCode')(<Input></Input>)}
              </FormItem>
              <FormItem wrapperCol={{sm:{offset: 6, span:18}, xs:{offset: 0, span:24}}} label="" help="">
                <button onClick={handleOnInitToken} type="primary">初始化</button>
              </FormItem>
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default AccessTokenEditorDialog;