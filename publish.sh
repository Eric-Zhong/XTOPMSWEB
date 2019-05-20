npm run build
scp -r /Work/Dotnet/XTOPMSWEB/dist root@www.biztalkgroup.com:/home/wwwroot

echo =============================================

echo Login to remote server, and run following command.
echo
echo >cd /home/wwwroot
echo >./xtopms.sh
