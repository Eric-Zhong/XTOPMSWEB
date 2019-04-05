import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card} from 'antd';

class NotFoundLayoutComponent extends PureComponent {

  render() {
    return (
      <PageHeaderWrapper
        title="此页面正在设计中"
        content=""
      >
        <Card>
          如果你有很明确的业务需求，请将业务需求内容发送到<a href='mailto:xu.zhong@hotmail.com'>xu.zhong@hotmail.com</a>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NotFoundLayoutComponent;
