import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Work/Projects/XTO/web/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Work/Projects/XTO/web/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Work/Projects/XTO/web/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Work/Projects/XTO/web/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Work/Projects/XTO/web/src/models/setting.js').default) });
app.model({ namespace: 'testwebapi', ...(require('/Work/Projects/XTO/web/src/models/testwebapi.js').default) });
app.model({ namespace: 'user', ...(require('/Work/Projects/XTO/web/src/models/user.js').default) });
app.model({ namespace: 'userQuickSearchModel', ...(require('/Work/Projects/XTO/web/src/models/userQuickSearchModel.js').default) });
