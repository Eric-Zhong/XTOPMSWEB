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
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete, Switch, Icon} from "antd";
import { basename } from "path";
import { connect } from "dva";
import {GetBusinessCategoryTree} from '@/utils/Dictionary';
import moment from "moment";
import UserSelectorV1 from '@/components/UserSelector/UserSelectorV1';
import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;


const 
  FormItem = Form.Item,
  TabPanel = Tabs.TabPane,
  Option = AutoComplete.Option;


@Form.create()
class OpportunityEditorDialog extends PureComponent{

  constructor(props){
    super(props);
  }

  /**
   * @description Business category selector
   * @memberof OpportunityEditorDialog
   */
  onBizCategoryFilter = (inputValue, path) => {
    return (
      path.some(
        option => 
          (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        )
      );
  }


  handleSalesChange = (value) => {
    // console.log(value);
  }


  bizCategoryCascaderSearchOpption = {
    filter: this.onBizCategoryFilter,
    limit: 10,
    matchInputWidth: true,
  }
  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-11
   * @memberof OpportunityEditorDialog
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

    const okText = (data._model === 'create'? '创建': '修改');
    const doOk = (data._model === 'create'? onDoCreate: onDoUpdate);

    const onOk = () => {
      const {form} = this.props;
      if(doOk) doOk(form);
    };


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
        <DescriptionList col="2" size="small" title="" style={{ marginBottom: 32 }}>
          <Description term="创建人">{data.creatorUser ? data.creatorUser.name: user.name}</Description>
          <Description term="修改人">{data.lastModifierUser ? data.lastModifierUser.name: ''}</Description>
          <Description term="创建时间">{data.creationTime ? moment(data.creationTime).fromNow() : ''}</Description>
          <Description term="修改时间">{data.lastModificationTime ? moment(data.lastModificationTime).fromNow() : ''}</Description>
        </DescriptionList>
        <Form>
          { 
            getFieldDecorator(
              'id',{
                initialValue: data.key
              }
            )(<Input type="hidden" readOnly></Input>) 
          }
          <Tabs type="card">
            <TabPanel tab="基本信息" key="tabBasic">
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="销售代表" help="">
                  { 
                    getFieldDecorator(
                      'sales' , {
                        initialValue: {
                          key: data.sales ? data.sales.id: "", 
                          label: data.sales ? data.sales.name: "", 
                          userId: data.sales ? data.sales.id: "", 
                          userName: data.sales ? data.sales.name: ""},
                      } 
                    )(<UserSelectorV1
                        {...this.props}
                        onChange={this.handleSalesChange}
                        placeholder="选择销售"
                      ></UserSelectorV1>
                    )
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
                  <FormItem {...formItemLayoutHorizontal} label="内部编号" help="">
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
                  <FormItem {...formItemLayoutHorizontal} label="业主" help="">
                    { 
                      getFieldDecorator(
                        'ownerId',
                        {
                          initialValue: data.owner? data.owner.name: ''
                        }
                      )(<Input placeholder="项目业权单位"></Input>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="总包方" help="">
                    { 
                      getFieldDecorator(
                        'generalContractorId',
                        {
                          initialValue: data.generalContractor? data.generalContractor.name: ''
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
                  <FormItem {...formItemLayoutHorizontal} label="代理方" help="">
                    { 
                      getFieldDecorator(
                        'agencyId',
                        {
                          initialValue: data.agency? data.agency.name: ''
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
                        'bizCategory', { 
                          initialValue: data.bizCategory, 
                          valuePropName: 'defaultValue',
                          rules: [
                            {type: 'array', required: false, message: '请选择所属行业'}
                          ]
                        }
                      )(<Cascader
                          options={bizCategoryOption}
                          fieldNames={{label:'label', value:'value', children:'children'}}
                          placeholder="项目所属行业"
                          notFoundContent="没找到匹配项"
                          showSearch={this.bizCategoryCascaderSearchOpption}
                          popupPlacement="topLeft"
                          expandTrigger="hover"
                          popupClassName=""
                          size="default"
                          allowClear={true}
                          changeOnSelect={true}
                        ></Cascader>) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <FormItem {...formItemLayout} label="激活/禁用" help="">
                  {getFieldDecorator( 'isActive',{ valuePropName: 'checked', initialValue: data.isActive })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}></Switch>)}
                </FormItem>
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


export default OpportunityEditorDialog;