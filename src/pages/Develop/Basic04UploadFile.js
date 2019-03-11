import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Form, Input, Icon, Button, Upload, message} from 'antd';

const FormItem = Form.Item;

@Form.create()
class Basic04UploadFileComponent extends PureComponent {

  state = {
    fileList: [{
      uid: '1',
      name: '早前上传的文件.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      linkProps: '{"download": "image"}',
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '2',
      name: '早前上传的文件2.png',
      status: 'uploading',
      response: '{Server Error 500}', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '3',
      name: '早前上传的文件2-有问题的文件.png',
      status: 'error',
      response: '文件处理产生异常', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '4',
      name: '早前上传的文件3-有问题的文件.png',
      status: 'removed',
      response: 'Server Error 500', // custom error message to show
      linkProps: '{"download": "image"}', // <a href="xxxx" download="image"></a>
      url: 'http://www.baidu.com/xxx.png',
    }]
  }

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

  handleBeforeUpload = (file, fileList) => {
    console.log("onBeforeUpload(file, fileList):");
    console.log(file);
    console.log(fileList);
  }

  handleUploadFile = ({file, fileList}) => {
    console.log("onUpload:");
    console.log(file);
    console.log(fileList);

    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }

    this.setState((state) => {
      return {
        ...state,
        fileList: fileList
      };
    });
  }

  handleRemoveFile = file => {
    console.log("onRemove:");
    console.log(file);

    // TODO: 后台删除文件

    // TODO: 删除成功后，执行前端脚本，删除界面上的文件
    this.setState((state) => {
      // 找到要删除哪个文件
      const index = state.fileList.indexOf(file);
      // 转成数组
      const newFileList = state.fileList.slice();
      // 移除
      newFileList.splice(index, 1);
      // 返回更新后的 state
      return {
        ...state,
        fileList: newFileList,
      };
    });

  }

  // 在这里处理点击文件名后的事件
  handlePreviewFile = file => {
    console.log("onPreview:");
    console.log(file);
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

    // 此处的数据应该从后台拿到已经上传的文件清单
    const defaultFileList = [{
      uid: '1',
      name: '早前上传的文件.png',
      status: 'done',
      response: 'Server Error 500',
      linkProps: '{"download": "image"}',
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '2',
      name: '早前上传的文件2.png',
      status: 'uploading',
      response: '{Server Error 500}', 
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '3',
      name: '早前上传的文件2-有问题的文件.png',
      status: 'error',
      response: '文件处理产生异常', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },{
      uid: '4',
      name: '早前上传的文件3-有问题的文件.png',
      status: 'removed',
      response: 'Server Error 500', // custom error message to show
      linkProps: '{"download": "image"}', // <a href="xxxx" download="image"></a>
      url: 'http://www.baidu.com/xxx.png',
    }];

    // 上传文件时所需要上传的参数 (测试发现不生效)
    const defaultFileData = {
      creator: "Eroc Xu"
    };

    // 发现不生效
    const defaultHeaders = {
      XTOPMS: "v1.0"
    };

    return (
      <PageHeaderWrapper
        title="文件上传"
        content="最基本的文件上传方法"
      >
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Attachments">
              {
                getFieldDecorator('attachments', {
                })(
                  <Upload.Dragger 
                    name="files" 
                    action="/api/services/app/UploadFile/SaveAsync"
                    multiple={false}
                    showUploadList={true}
                    showPreviewIcon={true}
                    showRemoveIcon={true}
                    beforeUpload={this.handleBeforeUpload}
                    onChange={this.handleUploadFile}
                    onRemove={this.handleRemoveFile}
                    onPreview={this.handlePreviewFile}
                    _defaultFileList={defaultFileList}
                    directory={false}
                    _accept=".doc,.docx,application/msword,.png,.jpg"
                    _data={this.defaultFileData}
                    _headers={this.defaultHeaders}
                    listType="text"
                    fileList={this.state.fileList}
                    >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击这么或将文件拖放到这里进行上传</p>
                  </Upload.Dragger>
                )
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

export default Basic04UploadFileComponent;
