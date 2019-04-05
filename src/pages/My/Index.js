import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card} from 'antd';

class MyIndexComponent extends PureComponent {

  render() {
    return (
      <PageHeaderWrapper
        title="个人中心"
        content="我的任务、我的状态、我的待办、我的审批、我的消息、我的指标都在这里"
      >
        <Card></Card>
      </PageHeaderWrapper>
    );
  }
}

export default MyIndexComponent;
