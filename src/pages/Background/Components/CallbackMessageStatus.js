import { PureComponent } from "react";

/*
* Apache License, Version 2.0
*
* Copyright (c) 2019 Tigoole
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at:
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
/*
*
* Copyright (c) 2019 Tigoole
*
* Author: Eric-Zhong Xu
*
* Creation: 2019-05-18 15:57:15
*/

import { Tag, Tooltip, Modal } from 'antd';
const confirm = Modal.confirm;

/*
    public enum CallbackMessageStatus: int
    {
        New = 0,
        Inprocess = 1,
        Success = 2,
        Failed = 3,
        Canceled = 4,
        Ignored = 5,
        NotFoundMember = 6,
        ParseError = 7,
        InterfaceThrowError = 8
    }
*/

const CON_MESSAGE_STATUS = [
  {value: 0, color: '', text: 'New'},
  {value: 1, color: '#2bd7f5', text: 'Inprocess'},
  {value: 2, color: '#87d068', text: 'Success'},
  {value: 3, color: '#f50', text: 'Failed'},
  {value: 4, color: 'lime', text: 'Canceled'},
  {value: 5, color: 'lime', text: 'Ignored'},
  {value: 6, color: '#f50', text: 'Not Found Data'},
  {value: 7, color: '#f50', text: 'Parse Failed'},
  {value: 8, color: '#f50', text: 'Interface Throw Error'},
];

class CallbackMessageStatus extends PureComponent{

  render() {
    const {value, data} = this.props;
    if(value && value !== ""){
      const text = CON_MESSAGE_STATUS[value].text;
      const color = CON_MESSAGE_STATUS[value].color;
      if(value != 0 && value != 1 && value != 2){
        return (
          <Tooltip title={data ? data.comment: ''}>
            <Tag color={color}>{text}</Tag>
          </Tooltip>
        );
      } else {
        return (
          <Tag color={color}>{text}</Tag>
        );      
      }
    }
  }
}

export { CallbackMessageStatus, CON_MESSAGE_STATUS };
