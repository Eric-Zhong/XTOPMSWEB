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
* Creation: 2019-05-22 11:37:43
 */

import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete, List, Avatar} from "antd";
import { connect } from "dva";
import moment from "moment";

import DescriptionList from '@/components/DescriptionList';
import AlibabaOrderProductSummary from "./AlibabaOrderProductSummary";
const { Description } = DescriptionList;

const 
  FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option;


@Form.create()
class AlibabaTradeInforDialog extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof AlibabaTradeInforDialog
   */
  render(){

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

    const handleOnOk = () => {
      const {form} = this.props;
      if(doOk) doOk(form);
    };

    const msg = data.businessData ? JSON.parse(data.businessData): {};
    const baseInfo = msg.baseInfo ? msg.baseInfo : {};
    // Object.keys(baseInfo).map(key => console.log(key + ': ' + baseInfo[key]));
    const buyerContact = msg.baseInfo && msg.baseInfo.buyerContact ? msg.baseInfo.buyerContact : {};
    const receiverInfo = msg.baseInfo && msg.baseInfo.receiverInfo ? msg.baseInfo.receiverInfo : {};
    const nativeLogistics = msg.nativeLogistics ? msg.nativeLogistics : {};
    const orderInvoiceInfo = msg.orderInvoiceInfo ? msg.orderInvoiceInfo : {};
    const productItems = msg.productItems ? msg.productItems : {};

    const okText = '确定'; // (data._model === 'create'? '创建': '修改');
    const doOk = (data._model === 'create'? onDoCreate: onDoUpdate);
    const title = data._model === 'create'? '': '查看 - ' + baseInfo.idOfStr;

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
          <Description term="订单号">{baseInfo.idOfStr}</Description>
          <Description term="建单时间">{baseInfo.createTime}</Description>
          <Description term="订单金额">{baseInfo.totalAmount}</Description>
          <Description term="付款时间">{baseInfo.payTime}</Description>
          <Description term="采购人">{buyerContact.name ? buyerContact.name : ''}</Description>
          <Description term="公司名称">{buyerContact.companyName ? buyerContact.companyName : ''}</Description>
          <Description term="收件人">{receiverInfo.toFullName ? receiverInfo.toFullName : ''}</Description>
          <Description term="送货地址">{receiverInfo.toArea ? receiverInfo.toArea : ''}</Description>
        </DescriptionList>
        <Form>
          <Tabs type="card">
            <TabPanel tab="基本信息" key="tabBasic">
              <DescriptionList col="2" size="small" >
                {
                  Object.keys(baseInfo).map(key => {
                    if(typeof(baseInfo[key]) == 'string'){
                      return (
                        <Description key={key} term={key}>{baseInfo[key]}</Description>
                        )
                      }
                    }
                  )
                }
              </DescriptionList>
            </TabPanel>
            <TabPanel tab="采购人信息" key="tabBuyerContact">
              <DescriptionList col="2" size="small" title="采购人信息" style={{ marginBottom: 24 }}>
                {
                  Object.keys(buyerContact).map(key => {
                    if(typeof(buyerContact[key]) == 'string' || buyerContact[key] == null){
                      return (
                        <Description key={key} term={key}>{buyerContact[key]}</Description>
                        )
                      }
                    }
                  )
                }
              </DescriptionList>
              <DescriptionList col="2" size="small" title="收货人信息" style={{ marginBottom: 24 }}>
                {
                  Object.keys(receiverInfo).map(key => {
                    if(typeof(receiverInfo[key]) == 'string' || receiverInfo[key] == null){
                      return (
                        <Description key={key} term={key}>{receiverInfo[key]}</Description>
                        )
                      }
                    }
                  )
                }
              </DescriptionList>
            </TabPanel>
            <TabPanel tab="物流信息" key="tabLogistics">
              <DescriptionList col="2" size="small" title="物流信息" style={{ marginBottom: 24 }}>
                {
                  Object.keys(nativeLogistics).map(key => {
                    if(typeof(nativeLogistics[key]) == 'string' || nativeLogistics[key] == null){
                      return (
                        <Description key={key} term={key}>{nativeLogistics[key]}</Description>
                        )
                      }
                    }
                  )
                }
              </DescriptionList>
            </TabPanel>
            <TabPanel tab="商品信息" key="tabProduct">
              <List
                itemLayout="horizontal"
                dataSource={productItems}
                renderItem={item=>(
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.productImgUrl[0]} />}
                      title={(item.productCargoNumber ? item.productCargoNumber : '') + ' ' + item.name}
                      description={'数量: ' + item.quantity + ' 金额: ' + item.itemAmount}
                    ></List.Item.Meta>
                  </List.Item>
                )}
              ></List>
            </TabPanel>
            <TabPanel tab="发票信息" key="tabInvoice">
              <DescriptionList col="2" size="small" title="发票信息" style={{ marginBottom: 24 }}>
                {
                  Object.keys(orderInvoiceInfo).map(key => {
                    if(typeof(orderInvoiceInfo[key]) == 'string' || orderInvoiceInfo[key] == null){
                      return (
                        <Description key={key} term={key}>{orderInvoiceInfo[key]}</Description>
                        )
                      }
                    }
                  )
                }
              </DescriptionList>
            </TabPanel>
            <TabPanel tab="处理结果" key="tabComment">
                {data.comment}
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default AlibabaTradeInforDialog;