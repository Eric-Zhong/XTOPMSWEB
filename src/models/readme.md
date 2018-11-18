# Dva 官网中的介绍

https://dvajs.com/guide/introduce-class.html#app-model

# Umi 中的 Model 目录结构
https://umijs.org/zh/guide/with-dva.html#使用 

规则如下：

src/models/**/*.js 为 global model
src/pages/**/models/**/*.js 为 page model
global model 全量载入，page model 在 production 时按需载入，在 development 时全量载入
page model 为 page js 所在路径下 models/**/*.js 的文件
page model 会向上查找，比如 page js 为 pages/a/b.js，他的 page model 为 pages/a/b/models/**/*.js + pages/a/models/**/*.js，依次类推
约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/**/*.js


# Model
dva 提供 app.model 这个对象，所有的应用逻辑都定义在它上面。

```
{
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1 },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
}
```

namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
reducers: Action 处理器，处理同步动作，用来算出最新的 State
effects：Action 处理器，处理异步动作

# Reducer
Reducer 是 Action 处理器，用来处理同步操作，可以看做是 state 的计算器。它的作用是根据 Action，从上一个 State 算出当前 State。

# Effect
Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

# Generator 函数
Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。

# call 和 put
dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。

call：执行异步函数
put：发出一个 Action，类似于 dispatch



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