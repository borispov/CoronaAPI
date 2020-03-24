rm -f full_data.csv
# curl -o full_data.csv https://covid.ourworldindata.org/data/who/full_data.csv
# curl https://covid.ourworldindata.org/data/who/full_data.csv > full_data.csv

# Seem to change data to ECDC
curl https://covid.ourworldindata.org/data/ecdc/full_data.csv > full_data.csv

SERVER="ds217976.mlab.com:17976/corona -u borispov -p MayaBoris2206"
mongo $SERVER <<- 'ENDCON'
db.countries.drop();
ENDCON

mongoimport -h ds217976.mlab.com:17976 -d corona -c countries -u borispov -p MayaBoris2206 --file ./full_data.csv --type csv --headerline
