import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card} from 'antd';

class Basic01LayoutComponent extends PureComponent {

  render() {
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card></Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic01LayoutComponent;
