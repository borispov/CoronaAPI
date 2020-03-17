# curl https://covid.ourworldindata.org/data/full_data.csv > full_data.csv
# curl https://covid.ourworldindata.org/data/full_data.csv > full_data.csv
curl https://covid.ourworldindata.org/data/total_cases.csv > full_data.csv

SERVER="ds217976.mlab.com:17976/corona -u borispov -p MayaBoris2206"
mongo $SERVER <<- 'ENDCON'
db.dropDatabase();
ENDCON

mongoimport -h ds217976.mlab.com:17976 -d corona -c countries -u borispov -p MayaBoris2206 --file full_data.csv --type csv --headerline
