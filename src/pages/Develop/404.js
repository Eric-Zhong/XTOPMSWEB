import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card} from 'antd';

class NotFoundLayoutComponent extends PureComponent {

  render() {
    return (
      <PageHeaderWrapper
        title="此功能未公开"
        content=""
      >
        <Card>
          如果您期望了解此项功能的内容细节，请发邮箱到 <a href='mailto:zhong.xu@biztalkgroup.com'>zhong.xu@biztalkgroup.com</a>，稍后会有工作人员与您联系。
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NotFoundLayoutComponent;
