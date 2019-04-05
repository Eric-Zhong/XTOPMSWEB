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

app.model({ namespace: 'global', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/setting.js').default) });
app.model({ namespace: 'testwebapi', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/testwebapi.js').default) });
app.model({ namespace: 'user', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/user.js').default) });
app.model({ namespace: 'xtouser', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/xtouser.js').default) });
app.model({ namespace: 'register', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/User/models/register.js').default) });
app.model({ namespace: 'UserCenterModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/System/models/UserCenterModel.js').default) });
app.model({ namespace: 'activities', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'rule', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'geographic', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Account/Settings/models/geographic.js').default) });
app.model({ namespace: 'error', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Exception/models/error.js').default) });
