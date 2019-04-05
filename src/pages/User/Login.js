import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { debug } from 'util';

const { Tab, UserName, Password, Mobile, Captcha, Submit, TenancyName } = Login;


// 使用 dva 框架实现 
// https://dvajs.com/guide/introduce-class.html#数据流图 

/*
核心概念
State：一个对象，保存整个应用状态
View：React 组件构成的视图层
Action：一个对象，描述事件
connect 方法：一个函数，绑定 State 到 View
dispatch 方法：一个函数，发送 Action 到 State
#
*/

/*
connect 是一个函数，绑定 State 到 View。
```
import { connect } from 'dva';
function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```
connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。
connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。
*/
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

class LoginPage extends Component {

  // this.state 的默认值
  state = {
    type: 'account',
    autoLogin: true,
    status: "",
  };

  // 切换Tab时
  onTabChange = type => {
    this.setState({ type });
  };


  /*

  Dispatch
  dispatch 是一个函数方法，用来将 Action 发送给 State。
  dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。

  Action
  用来描述UI层事件的一个对象
  使用 dispatch 来进行传递，如下面的
  {
    type: 'login/getCaptcha',
    payload: values.mobile,
  }
  type：指定会触发哪个 state 的 函数.
        “login/getCaptchs”
        login： state 名称
        getCaptcha： 在 state 中定义的函数名称
  */
  

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          // dva中，被connect后，在this.props中就会有dispatch函数了
          // 通知 model (namespace='login') 去执行里面定义的 getCaptcha() 函数。
          // 传递的参数是 payload: values.mobile 传递表单界面中的 mobile 数据
          // 
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  // 处理 Submit 提交事件. 
  // 因为是从 @Form 中提交的，在 values 中定义了整个表单内的所有数据。
  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      // 调用 model 中定义的 effects 和 action 的内容
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  // 输出页面HTML
  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <TenancyName 
              name="tenancyName" 
              placeholder="tenancy name: empty or default"
              defaultValue="default"
            />
            <UserName 
              name="userName" 
              placeholder="username: admin or user 用户名"
              defaultValue="admin"
            />
            <Password
              name="password"
              placeholder="password: ant.design 密码"
              defaultValue="123qwe"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;


/* 从 上面的 Tab 中移除了 Mobile 登录方式
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            <Mobile name="mobile" />
            <Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
          </Tab>

*/

/* 切换其它的登记方式
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
*/


/* 忘记密码
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
*/

