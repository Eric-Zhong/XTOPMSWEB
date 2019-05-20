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
app.model({ namespace: 'userQuickSearchModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/userQuickSearchModel.js').default) });
app.model({ namespace: 'xtouser', ...(require('/Work/Dotnet/XTOPMSWEB/src/models/xtouser.js').default) });
app.model({ namespace: 'register', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/User/models/register.js').default) });
app.model({ namespace: 'error', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'DefaultModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Develop/models/DefaultModel.js').default) });
app.model({ namespace: 'BidModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Monitor/models/BidModel.js').default) });
app.model({ namespace: 'CustomerModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Customer/models/CustomerModel.js').default) });
app.model({ namespace: 'OpportunityModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Opportunity/models/OpportunityModel.js').default) });
app.model({ namespace: 'AccessTokenModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Background/models/AccessTokenModel.js').default) });
app.model({ namespace: 'AlibabaMessageModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Background/models/AlibabaMessageModel.js').default) });
app.model({ namespace: 'AlibabaProductCategoryModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Background/models/AlibabaProductCategoryModel.js').default) });
app.model({ namespace: 'DataSyncServiceModel', ...(require('/Work/Dotnet/XTOPMSWEB/src/pages/Background/models/DataSyncServiceModel.js').default) });
