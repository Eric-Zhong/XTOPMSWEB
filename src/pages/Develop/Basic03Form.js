
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import {Card, Form, Input, Button, Checkbox, InputNumber, DatePicker} from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
class Basic03FormComponent extends PureComponent {

  handleSubmit = e => {
    const { form } = this.props;
    let formFieldsValue = form.getFieldsValue();
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(formFieldsValue);
      }
    });        
  }

  render() {

    const {form: {getFieldDecorator, getFieldValue}} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 5}
      },
      wrapperCol: {
        xs: {span: 24}, sm: {span: 12}
      }
    };

    return (
      <PageHeaderWrapper
        title="基础表单"
        content="表单基本操作方法"
      >
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Product">
              {
                getFieldDecorator(
                  'product',
                  {
                    initialValue: "Product name",
                    rules:[
                      {
                        required: true, 
                        message: "Please input some production information"
                      }
                    ]
                  }
                )(<Input></Input>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Comment">
              {
                getFieldDecorator(
                  'comment',
                  {
                    initialValue: "Comment",
                    rules:[
                      {
                        required: false, 
                        message: "Comment is required"
                      }
                    ]
                  }
                )(<Input></Input>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Amount">
              {
                getFieldDecorator(
                  'amount',
                  {
                    initialValue: 1,
                    rules:[
                      {
                        required: true, 
                        message: "Amount is required"
                      }
                    ]
                  }
                )(<InputNumber min={0} max={99} step={1}></InputNumber>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Unit Price">
              {
                getFieldDecorator(
                  'price',
                  {
                    initialValue: 543.21,
                    rules:[
                      {
                        required: true, 
                        message: "Price is required"
                      }
                    ]
                  }
                )(<InputNumber min={0} max={99999999} step={0.01}></InputNumber>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Total">
              {
                getFieldDecorator(
                  'total',
                  {
                    initialValue: 9876543,
                    rules:[
                      {
                        required: true, 
                        message: "Total is required"
                      }
                    ]
                  }
                )(<Input></Input>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Color">
              {
                getFieldDecorator(
                  'color',
                  {
                    initialValue: ["Red", "Blue"]
                  }
                )(
                  <Checkbox.Group>
                    <Checkbox value="White">White</Checkbox>
                    <Checkbox value="Black">Black</Checkbox>
                    <Checkbox value="Red">Red</Checkbox>
                    <Checkbox value="Blue">Blue</Checkbox>
                    <Checkbox value="Yellow">Yellow</Checkbox>
                  </Checkbox.Group>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="EXP. ETD.">
              {
                getFieldDecorator(
                  'exp-etd',
                  {
                    initialValue: [moment("2019-01-01", "yyyy-MM-dd"), moment("2019-02-01", "yyyy-MM-dd")],
                    rules:[
                      {
                        type: "array",
                        required: true, 
                        message: "Please select date"
                      }
                    ]
                  }
                )(<RangePicker></RangePicker>)
              }
            </FormItem>
            <FormItem wrapperCol={{span: 24, offset: 5}}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );

  }
}

export default Basic03FormComponent;
