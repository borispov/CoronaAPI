rm -f corona_resources.csv
curl https://docs.google.com/spreadsheets/d/e/2PACX-1vSpf5_SAPjl4orrzJHtHY3g-kBorfIyFG9tjQaizV9slAhms9Libyu09MZlOA9cW9hCfoMrhKvZY0Sr/pub?output=csv > corona_resources.csv

SERVER="ds217976.mlab.com:17976/corona -u borispov -p MayaBoris2206"
mongo $SERVER <<- 'ENDCON'
db.resources.drop();
ENDCON

mongoimport -h ds217976.mlab.com:17976 -d corona -c resources -u borispov -p MayaBoris2206 --file ./corona_resources.csv --type csv --headerline
