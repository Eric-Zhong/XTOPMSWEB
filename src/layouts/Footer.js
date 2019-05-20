import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="alibaba" />,
          href: 'https://open.1688.com',
          blankTarget: true,
        },
        {
          key: 'XTOPMS',
          title: 'XTOPMS',
          href: 'https://xto.biztalkgroup.com',
          blankTarget: true,
        },
        {
          key: 'BiztalkGroup',
          title: 'BiztalkGroup',
          href: 'https://www.biztalkgroup.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 北京钛谷诚泽网络通讯科技有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
