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
* Creation: 2019-04-11 22:45:14
 */



import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete} from "antd";
import { basename } from "path";
import { connect } from "dva";
import {GetBusinessCategoryTree} from '@/utils/Dictionary';
import moment from "moment";

const 
  FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option;


@Form.create()
class OpportunityCreationComponent extends PureComponent{

  constructor(props){
    super(props);
  }

  /**
   * @description Business category selector
   * @memberof OpportunityCreationComponent
   */
  onBizCategoryFilter = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }


  onCustomerSelected = (value, option) => {
    console.log(value);
    console.log(option);
  };
  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof OpportunityCreationComponent
   */
  render(){
    // 从 props 中获取的参数
    const {
      form: {getFieldDecorator, getFieldValue},
      data,
      visible,
      user,
      onDoCreate,
      onDoUpdate,
      onCancel,
      onCustomerSearch,
      onCustomerChange,
      customerSearchResult,
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

    const bizCategoryOption = GetBusinessCategoryTree();

    const okText = (data.model === 'create'? '创建': '修改');
    const doOk = (data.model === 'create'? onDoCreate: onDoUpdate);

    const onOk = () => {
      const {form} = this.props;
      if(doOk) doOk(form);
    };

    const salesData = [];
    const customerData = [];

    return (
      <Modal
      title="新建机会"
      destroyOnClose
      visible={visible}
      okText={okText}
      onCancel={onCancel}
      onOk={onOk}
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
                          initialValue: data.createUserName
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
                          initialValue: data.key
                        }
                      )(<Input readOnly></Input>) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="销售代表" help="">
                    { 
                      getFieldDecorator(
                        'salesName' , {initialValue: data.salesName} 
                      )(<Select
                          showSearch={true}
                          placeholder="选择销售"
                          labelInValue={true}
                          filterOption={true}
                          notFoundContent="无法匹配"
                          style={{ width: '100%' }}
                          onSearch={onCustomerSearch}
                          >
                            {customerSearchResult.map(d => <Option key={d.key}>{d.name}</Option>)}
                          </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="机会代号" help="">
                    { 
                      getFieldDecorator(
                        'code',
                        {
                          initialValue: data.code
                        }
                      )(<Input></Input>) 
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="统一编号" help="">
                    { 
                      getFieldDecorator(
                        'erpId',
                        {
                          initialValue: data.erpId
                        }
                      )(<Input placeholder="企业内部系统ID"></Input>) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="销售方" help="">
                    { 
                      getFieldDecorator(
                        'soldToName',
                        {
                          initialValue: user.name
                        }
                      )(<Input placeholder="合同签订的甲方"></Input>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="收货方" help="">
                    { 
                      getFieldDecorator(
                        'shipToName',
                        {
                          initialValue: data.shipToName
                        }
                      )(<AutoComplete
                          placeholder="收货方"
                          style={{ width: '100%' }}
                          optionLabelProp="name"
                        ></AutoComplete>) 
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="合作方" help="">
                    { 
                      getFieldDecorator(
                        'partnerName',
                        {
                          initialValue: data.partnerName
                        }
                      )(<Input placeholder=""></Input>) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="机会名称" help="建议在机会名称中体现客户简称、项目简称、地点等重要信息">
                    { 
                      getFieldDecorator(
                        'name',
                        { 
                          initialValue: data.name,
                          rules: [{
                            required: true,
                            max: 50,
                            min: 3,
                            type: 'string',
                          }]
                        } 
                      )(<Input 
                        placeholder="机会名称，如中国银行数据中心项目一期北京" 
                        onChange={(e)=>{}}></Input>
                      ) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="所属行业" help="">
                    { 
                      getFieldDecorator(
                        'bizCategory', { initialValue: data.bizCategory, valuePropName: 'defaultValue'}
                      )(<Cascader
                          options={bizCategoryOption}
                          placeholder="项目所属行业"
                          showSearch={this.onBizCategoryFilter}
                          popupPlacement="topLeft"
                          expandTrigger="hover"
                          popupClassName=""
                          changeOnSelect={true}
                        ></Cascader>) 
                    }
                  </FormItem>
                </Col>
              </Row>
            </TabPanel>
            <TabPanel tab="产品信息" key="tabProduction"></TabPanel>
            <TabPanel tab="交付地址" key="tabAddress">
              <FormItem {...formItemLayout} label="项目地址" help="">
                { 
                  getFieldDecorator(
                    'address',
                    { 
                      initialValue: "",
                      rules: [{
                        required: false,
                        max: 100,
                        type: 'string',
                      }]
                    } 
                  )(<Input 
                    placeholder="项目所在地的详细地址，xx省xx市xx区xx号" 
                    ></Input>
                    ) 
                }
              </FormItem>
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


export default OpportunityCreationComponent;