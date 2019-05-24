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
import { Form, Modal, Button, Tabs, Input, Row, Col, Cascader, Select, AutoComplete, Switch, Icon, InputNumber, Transfer, DatePicker} from "antd";
import { basename } from "path";
import { connect } from "dva";
import {GetBusinessCategoryTree} from '@/utils/Dictionary';
import moment from "moment";
import UserSelectorV1 from '@/components/UserSelector/UserSelectorV1';
import CustomerSelectorV1 from '@/pages/Customer/Components/CustomerSelectorV1';
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
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      disabled: false,
    }
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

  
  _handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };
  _handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };


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

    const workflowDataSource = [
      {key: 'WF0001.00001', title: '01.机会登记', description: '', disabled: false},
      {key: 'WF0001.00002', title: '02.立项决策', description: '', disabled: false},
      {key: 'WF0001.00003', title: '03.投标决策', description: '', disabled: false},
      {key: 'WF0001.00004', title: '04.需求分析', description: '', disabled: false},
      {key: 'WF0001.00005', title: '05.风险识别', description: '', disabled: false},
      {key: 'WF0001.00006', title: '06.投标准备', description: '', disabled: false},
      {key: 'WF0001.00007', title: '07.商务方案', description: '', disabled: false},
      {key: 'WF0001.00008', title: '08.技术方案', description: '', disabled: false},
      {key: 'WF0001.00009', title: '09.偏差分析', description: '', disabled: false},
      {key: 'WF0001.00010', title: '10.问题澄清', description: '', disabled: false},
      {key: 'WF0001.00011', title: '11.风险识别', description: '', disabled: false},
      {key: 'WF0001.00012', title: '12.投标方案', description: '', disabled: false},
      {key: 'WF0001.00013', title: '13.投标文件审核', description: '', disabled: false},
      {key: 'WF0001.00014', title: '14.投标文件准备', description: '', disabled: false},
      {key: 'WF0001.00015', title: '15.投标输赢', description: '', disabled: false},
      {key: 'WF0001.00016', title: '16.合同准备', description: '', disabled: false},
      {key: 'WF0001.00017', title: '17.合同谈判', description: '', disabled: false},
      {key: 'WF0001.00018', title: '18.合同签订', description: '', disabled: false},
      {key: 'WF0001.00019', title: '19.合同移交', description: '', disabled: false},
      {key: 'WF0001.00020', title: '20.项目交接', description: '', disabled: false},
      {key: 'WF0001.00021', title: '21.项目启动', description: '', disabled: false},
    ];
    const { targetKeys, selectedKeys, disabled } = this.state;

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
                <Col span={24}>
                  <FormItem {...formItemLayout} label="机会名称" help="建议体现客户、项目、地点等重要信息。如'北京移动国贸8期3F改造'。">
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
                      )(<Input placeholder="机会名称，如中国银行数据中心项目一期北京" onChange={(e)=>{}}></Input>
                      ) 
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="预计金额" help="">
                    { 
                      getFieldDecorator(
                        'amount',
                        { 
                          initialValue: data.amount,
                          rules: [{required: true}]
                        } 
                      )(<InputNumber
                          style={{width: '100%', textAlign: 'right'}}
                          formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                          // onChange={onChange}
                        ></InputNumber>) 
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="投标日期" help="">
                    {
                      getFieldDecorator('bidDeadline', {initialValue: data.bidDeadline ? moment(data.bidDeadline) : null})(<DatePicker model="month"></DatePicker>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="交货日期" help="">
                    {
                      getFieldDecorator('deliveryDate', {initialValue: data.bidDeadline ? moment(data.deliveryDate) : null})(<DatePicker model="month"></DatePicker>)
                    }
                  </FormItem>
                </Col>
              </Row>
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
                          userName: data.sales ? data.sales.name: ""
                        },
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
                        'owner' , {
                          initialValue: data.owner ? {
                            key: data.owner ? data.owner.key: "", 
                            label: data.owner ? data.owner.name: "", 
                            customerId: data.owner ? data.owner.key: "", 
                            customerName: data.owner ? data.owner.name: ""
                          } : null,
                        } 
                        )(<CustomerSelectorV1
                            {...this.props}
                            onChange={this.handleSalesChange}
                            placeholder=""
                          ></CustomerSelectorV1>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="总包方" help="">
                    { 
                      getFieldDecorator(
                        'generalContractor' , {
                          initialValue: data.generalContractor ? {
                            key: data.generalContractor ? data.generalContractor.key: "", 
                            label: data.generalContractor ? data.generalContractor.name: "", 
                            customerId: data.generalContractor ? data.generalContractor.key: "", 
                            customerName: data.generalContractor ? data.generalContractor.name: ""
                          } : null,
                        } 
                        )(<CustomerSelectorV1
                            {...this.props}
                            onChange={this.handleSalesChange}
                            placeholder=""
                          ></CustomerSelectorV1>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayoutHorizontal} label="代理方" help="">
                    { 
                      getFieldDecorator(
                        'agency' , {
                          initialValue: data.agency ? {
                            key: data.agency ? data.agency.key: "", 
                            label: data.agency ? data.agency.name: "", 
                            customerId: data.agency ? data.agency.key: "", 
                            customerName: data.agency ? data.agency.name: ""
                          } : null,
                        } 
                      )(<CustomerSelectorV1
                          {...this.props}
                          onChange={this.handleSalesChange}
                          placeholder=""
                        ></CustomerSelectorV1>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="所属行业" help="GB/T 4754-2017 国民经济行业分类">
                    { 
                      getFieldDecorator(
                        'bizCategory', { 
                          initialValue: data.businessCategory ? data.businessCategory.fullKey.split('/') : null,
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
                <FormItem {...formItemLayout} label="公开" help="">
                  {getFieldDecorator( 'isActive',{ valuePropName: 'checked', initialValue: data.isActive })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}></Switch>)}
                </FormItem>
              </Row>
              <Row>
                <FormItem {...formItemLayout} label="当前状态" help="">
                  {
                    getFieldDecorator('status', {initialValue: data.status})(<Input placeholder=""></Input>)
                  }
                </FormItem>
              </Row>
            </TabPanel>
            <TabPanel tab="交付地址" key="tabAddress">
              <FormItem {...formItemLayout} label="国家" help="">
                {
                  getFieldDecorator('country', {initialValue: data.country})(<Input placeholder="输入国家"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="区域" help="">
                {
                  getFieldDecorator('region', {initialValue: data.region})(<Input placeholder="输入区域等信息"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="省份" help="">
                {
                  getFieldDecorator('province', {initialValue: data.province})(<Input placeholder="省份"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="城市" help="">
                {
                  getFieldDecorator('city', {initialValue: data.city})(<Input placeholder="城市"></Input>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label="地址" help="">
                { 
                  getFieldDecorator(
                    'address',
                    { 
                      initialValue: data.address,
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
              <FormItem {...formItemLayout} label="坐标" help="经度,纬度 （用逗号分隔，中间不要有空格）">
                {
                  getFieldDecorator('geographicData', {initialValue: data.geographicData})(<Input placeholder=""></Input>)
                }
              </FormItem>
            </TabPanel>
            <TabPanel tab="流程定义" key="tabWorkflow" disabled={data._model === 'create'}>
              <Row>
                <Col span={24}>
                  <p>当前业务模板：XTOPMS-V18</p>
                  <p>请在下面选择当前机会跟踪处理过程所需要的关键业务节点，请添加到右侧“已选流程”中。</p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Transfer
                    // style={{height: 400}}
                    listStyle={{
                      width: 350,
                      height: 300,
                    }}                    dataSource={workflowDataSource}
                    titles={['备选流程', '已选流程']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this._handleChange}
                    onSelectChange={this._handleSelectChange}
                    // onScroll={this.handleScroll}
                    render={item => item.title}
                    ></Transfer>
                    <p>启动后，流程配置将不可再进行修改，请慎重处理。如因特殊原因必须回滚业务流程时，只能通过重置进行处理，重置后，已处理的业务及流程将全部丢失。</p>
                    <Button type="danger">重置</Button>
                    <Button type="primary">启动</Button>
                </Col>
              </Row>
            </TabPanel>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}


export default OpportunityEditorDialog;