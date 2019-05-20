# XTOPMSWEB
XTO Project Management Web Project.
Web UI based at ant design pro 2.1.1.
API based at ABP asp.net core.
.Net core 2.1.8

# 开发环境
* .net core 2.1.*
* Nodejs 8+
* MySQL 5.7+
* Linux/Windows

# 开发工具
* Visual Studio Code
* Visual Studio Community

# 运行方式

## Web 前端运行方式

```
>npm install
>npm start
```

## Web API 后端运行方式
```
>dotnet build
>dotnet publish -c release
>supervisord -c /etc/supervisord.conf
```

## Supervisord 守护进程运行
```
>supervisorctl stop all
>supervisorctl start all
>supervisorctl shutdown
>supervisord -c /etc/supervisord.conf

supervisorctl status
supervisorctl stop tomcat
supervisorctl start tomcat
supervisorctl restart tomcat
supervisorctl reread
supervisorctl update


[program:XTOPMSWEBHOST]
command=dotnet XTOPMS.Web.Host.dll
directory=/home/git/XTOPMSCORE/src/XTOPMS.Web.Host/bin/release/netcoreapp2.1/publish
environment=ASPNETCORE__ENVIRONMENT=Production
user=root
stopsignal=INT
autostart=true
autorestart=true
startsecs=1
stderr_logfile=/var/log/XTOPMS.Web.Host.err.log
stdout_logfile=/var/log/XTOPMS.Web.Host.out.log
```

# 开发日志
* 2018-10-20 与ABP .net core 实现 Web Api 的对接。
* 2018-11-12 实现与 ABP Zero 中用户管理的对接，实现用户的创建功能。
* 2019-03-11 文件上传功能测试完毕，前台代码和后台代码编写完成。