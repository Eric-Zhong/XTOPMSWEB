import { PureComponent } from "react";
import {Row, Col} from "antd";
import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;

class AlibabaOrderHeaderSummary extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render() {
    const {data} = this.props;

    if(!data || data === '') return;

    const orderId = data.baseInfo.idOfStr;
    const buyerName = data.baseInfo.buyerContact ? data.baseInfo.buyerContact.name : '';
    const receiverName = data.baseInfo.receiverInfo.toFullName;
    const receiverMobile = data.baseInfo.receiverInfo.toMobile;
    const receiverArea = data.baseInfo.receiverInfo.toArea;

    return (
      <Row>
        <Col span={12}>订单号：{orderId}</Col>
        <Col span={12}>下单人：{buyerName}</Col>
        <Col span={12}>收货人：{receiverName}</Col>
        <Col span={12}>电话：{receiverMobile}</Col>
        <Col span={24}>地址：{receiverArea}</Col>
      </Row>
    );
  }
}

export default AlibabaOrderHeaderSummary;