import { PureComponent } from "react";
import {Row, Col} from 'antd';
import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;


class AlibabaOrderProductSummary extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render() {    
    const {data} = this.props;
    const productItems = data.productItems;

    return (
      <div>
      {
        productItems.map((item, index)=>{
          return (
            <Row key={'product_' + index}>
              <Col span={24}>商品：{item.name}</Col>
              <Col span={8}>IDH：{item.productCargoNumber}</Col>
              <Col span={8}>数量：{item.quantity}</Col>
              <Col span={8}>金额：{item.itemAmount}</Col>
            </Row>
          );
        })
      }
      </div>
    );
  }
}

export default AlibabaOrderProductSummary;