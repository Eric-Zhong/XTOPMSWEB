import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'taobao',
          title: <Icon type="taobao"/>,
          href: 'https://www.taobao.com',
          blankTarget: true,
        },
        {
          key: 'alipay',
          title: <Icon type="alipay" />,
          href: 'https://www.alipay.com',
          blankTarget: true,
        },
        {
          key: 'aliyun',
          title: <Icon type="aliyun" />,
          href: 'https://www.aliyun.com',
          blankTarget: true,
        },
        {
          key: 'wechat',
          title: <Icon type="wechat" />,
          href: 'https://www.wechat.com',
          blankTarget: true,
        },
        {
          key: 'alibaba',
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
        {
          key: 'aliwangwang',
          title: <Icon type="aliwangwang" />,
          href: 'https://open.aliwangwang.com',
          blankTarget: true,
        },
        {
          key: 'dingding',
          title: <Icon type="dingding" />,
          href: 'https://open.dingding.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 www.biztalkgroup.com
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
