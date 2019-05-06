import { PureComponent } from "react";
import { Form, Modal, Tabs, Input, Row, Col, Cascader, Select, AutoComplete} from "antd";
import { basename } from "path";
import { connect } from "dva";

const Option = Select.Option;

class UserSelectorV1 extends PureComponent{

  CON_MAX_SEARCH_COUNT = 20;

  constructor(props){
    super(props);
    const {value} = this.props;
    this.state = {
      key: value? value.userId: null,
      label: value? value.userName: null,
      id: value? value.userId: null,
      name: value? value.userName: null,
    };
  }


  componentDidMount() {
  }

  /**
   * @description 当父组件的 State 或 Props 内容发生变化时，会触发所有 Component 状态的更新
   * @author Eric-Zhong Xu (Tigoole)
   * @date 2019-04-29
   * @param {*} nextProps
   * @memberof UserSelectorV1
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
      type: 'userQuickSearch/clear',
    });
  }

  triggerChange = (value) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(
        Object.assign(
          {
            userId: value.key,
            userName: value.label
          }, 
          value
        )
      );
    }
  }

  /**
   * @description search user
   * @memberof UserSelectorV1
   */
  handleOnSearch = (value) => {
    const {dispatch} = this.props;
    if(value.length > 0){
      dispatch({
        type: 'userQuickSearch/quickSearch',
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
   * @date 2019-04-11
   * @memberof UserSelectorV1
   */
  render(){
    // console.log(this.props);
    const {
      user,
      userQuickSearch,
    } = this.props;

    const state = this.state;
    const dataSource = (userQuickSearch.result && userQuickSearch.result.length > 0 ? userQuickSearch.result: [state]); // 从 user model 中获取查询后的数据

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

export default UserSelectorV1;