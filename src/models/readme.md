这里定义的是业务实体对象

定义 Model
完成 UI 后，现在开始处理数据和逻辑。

dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。

新建 model models/products.js ：

```
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```
这个 model 里：

namespace 表示在全局 state 上的 key
state 是初始值，在这里是空数组
reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
然后别忘记在 index.js 里载入他：

```
// 3. Model
+ app.model(require('./models/products').default);
```