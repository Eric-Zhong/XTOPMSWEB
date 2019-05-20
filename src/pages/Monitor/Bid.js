import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Row, Col, Card, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import CountDown from '@/components/CountDown';
import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import Authorized from '@/utils/Authorized';
import styles from './Bid.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ bid, loading }) => ({
  bid,
  loading: loading.models.bid,
}))
class BidComponent extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bid/fetchTags',
    });
  }

  render() {
    const { bid, loading } = this.props;
    const { tags } = bid;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="投标项目状态" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="本年投票总金额"
                    suffix="万元"
                    total={numeral(654321).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="本月投标总金额"
                    suffix="元"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="投标项目数量"
                    suffix="个"
                    total="53"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="投标中标率"
                    suffix="%"
                    total={numeral(34.13).format('0.00')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip
                  title="区域分析"
                >
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="中标机率"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="标准化"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title={formatMessage({ id: 'app.monitor.ratio', defaultMessage: 'Ratio' })}
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card
              title="产品线中标概率分析"
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="A"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="B"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="C"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title={
                <FormattedMessage
                  id="app.monitor.popular-searches"
                  defaultMessage="Popular Searches"
                />
              }
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="热门产品"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave
                height={161}
                title="预算偏差"
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default BidComponent;
