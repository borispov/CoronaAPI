
SERVER="ds217976.mlab.com:17976/corona -u borispov -p MayaBoris2206"
mongo $SERVER <<- 'ENDCON'
db.todays.drop();
ENDCON
