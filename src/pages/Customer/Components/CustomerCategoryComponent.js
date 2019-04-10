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
* Creation: 2019-04-09 18:27:33
 */

import { PureComponent } from "react";
import { Tab } from 'antd';

class CustomerCategoryComponent extends PureComponent{
  
  render() {
    const {value} = this.props;
    console.log(value);
    
    return (
      <span>hello</span>
    );
  }
}

export default CustomerCategoryComponent;


/*


    const {
      value,            // Category value
    } = this.props;

    const categorys = value.split(',');

    // TODO: 在这里将 Category 的 ID 翻译成 显示的字段串

    const categorysHtml = categorys.map((category)=>
      <Tag key={category}>{category}</Tag>
    );

*/