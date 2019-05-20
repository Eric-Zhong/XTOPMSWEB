import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete} from "antd";
import { basename } from "path";
import { connect } from "dva";

const Option = Select.Option;

class CustomerSelectorV1 extends PureComponent{

  CON_MAX_SEARCH_COUNT = 20;

  constructor(props){
    super(props);
    const {value} = this.props;
    this.state = {
      key: value? value.customerId: null,
      label: value? value.customerName: null,
      id: value? value.customerId: null,
      name: value? value.customerName: null,
    };
  }


  componentDidMount() {
  }

  /**
   * @description 当父组件的 State 或 Props 内容发生变化时，会触发所有 Component 状态的更新
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-29
   * @param {*} nextProps
   * @memberof CustomerSelectorV1
   */
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/clear',
    });
  }

  triggerChange = (value) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(
        Object.assign(
          {
            customerId: value.key,
            customerName: value.label
          }, 
          value
        )
      );
    }
  }

  /**
   * @description search customer
   * @memberof CustomerSelectorV1
   */
  handleOnSearch = (value) => {
    const {dispatch} = this.props;
    if(value.length > 0){
      dispatch({
        type: 'customer/quickSearch',
        payload: {value: value, count: this.CON_MAX_SEARCH_COUNT},
      });
    }
  }


  handleOnChange = (value) => {
    this.setState({
      key: value.key,
      label: value.label,
      id: value.key,
      name: value.label,
    });
    this.triggerChange(value);
  }
  
  /**
   * @description render html component
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-05-06
   * @memberof CustomerSelectorV1
   */
  render(){
    // console.log(this.props);
    const {
      customer,
    } = this.props;

    const state = this.state;
    const dataSource = (customer.quickSearch && customer.quickSearch.length > 0 ? customer.quickSearch: [state]); 

    return (
      <Select
        allowClear={false}
        showArrow={true}
        showSearch={true}
        placeholder={this.props.placeholder}
        labelInValue={true}
        filterOption={false}
        notFoundContent="无法匹配"
        defaultValue={{key: state.id + ''}}
        style={{ width: '100%' }}
        onSelect={this.props.onSelect}
        onChange={this.handleOnChange}
        onSearch={this.handleOnSearch}
        >
          {
            dataSource.map(item => {
              return <Option key={item.id} title={item.name}>{item.name}</Option>
            })
          }
      </Select>
    );
  }
}

export default CustomerSelectorV1;