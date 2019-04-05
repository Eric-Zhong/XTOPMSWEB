import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card, Form, Input, Icon, Button, Upload, message, Row, Col} from 'antd';

const FormItem = Form.Item;

const step_010 = `
using System;
using Abp.Application.Services;

namespace XTOPMS.Testing
{
    public interface IWebApiAppService: IApplicationService
    {
        int Add(int a, int b);
    }
}
`

const step_020 = `
using System;
namespace XTOPMS.Testing
{
    public class WebApiAppService: XTOPMSAppServiceBase, IWebApiAppService
    {
        public WebApiAppService()
        {
        }

        public int Add(int a, int b)
        {
            return a + b;
        }
    }
}          
`

const step_030 = `
// 配置 Mock 的代理
// https://github.com/ant-design/ant-design-pro/issues/2373
proxy: {
  '/server/api/': {
    target: 'https://preview.pro.ant.design/',
    changeOrigin: true,
    pathRewrite: { '^/server': '' },
  },
  '/api': {
    target: 'http://localhost:21021',
    changeOrigin: true,
    // pathRewrite: { '^/server': '' },
  },
},
`

const step_040 = `
import request from '@/utils/request';

export async function add() {
  return request('/api/services/app/WebApi/Add');
}
`

const step_050 = `
import { add } from "@/services/TestWebApi";

export default {
  
  namespace: "testwebapi",

  state: {},
  
  effects: {
    *add(_, {call, put}){
      const response = yield call(add);
      yield put({
        type: "added",
        payload: response,
      });
    }
  },

  reducers: {
    added(state, action){
      return {
        ...state,
        result: action.response,
      };
    }
  }
};
`

@Form.create()
class Basic05WebApiComponent extends PureComponent {

  state = {
    a: {},
    b: {},
  };

  handleAdd = (a, b) => {

  };

  render() {
    return (
      <PageHeaderWrapper
        title="Web API 调用"
        content="最基础的调用后台WebApi方式"
      >
        <Card>
        <h3>DEMO</h3>
        <p>
          <Row gutter={8}>
            <Col span={2}>
              <Input defaultValue="123"></Input>
            </Col>
            <Col span={2}>
              <Input defaultValue="456"></Input>
            </Col>
            <Col span={1}>
              <Button>+</Button>
            </Col>
            <Col span={2}>
              <Input></Input>
            </Col>
          </Row>
        </p>
        <h3>在 ABP 中定义 ApplicationService 的接口</h3>
        <pre>{step_010}</pre>
          <h3>在 ABP 中定义 ApplicationService 的方法实现</h3>
          <pre>{step_020}</pre>
          <h3>ABP 会自动生成 WebApi 方法</h3>
          <p>/api/services/app/WebApi/Add</p>
          <h3>配置 Ant Designer 的 Web API 代理地址</h3>
          <pre>{step_030}</pre>
          <h3>在 Ant Design 的 Services 中定义此 Web API 的调用方法</h3>
          <p>在 /src/services 下创建 TestWebApi.js</p>
          <pre>{step_040}</pre>
          <p>在 /src/models 下创建 testwebapi.js</p>
          <pre>{step_050}</pre>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic05WebApiComponent;
