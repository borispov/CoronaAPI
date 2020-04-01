#!/bin/bash
[[ $1 = '' ]] && BRANCH="master" || BRANCH=$1

SERVER="46.101.156.51"
DEST_FOLDER="CoronaAPI/" 
PARAMS="BRANCH=\"$BRANCH\" DEST_FOLDER=\"$DEST_FOLDER\""

echo ===================================================
echo Autodeploy server
echo selected barcn $BRANCH
echo ===================================================
echo Connecting to remote server...

ssh $SERVER 'bash -i' <<-'ENDSSH'

cd CoronaAPI/
pm2 stop coronaapi

git stash
# to stash package-lock.json file changes

git pull
git checkout master
git pull origin master

rm -rf node_modules/

npm install --production

npm run build

pm2 start coronaapi
pm2 save

pm2 list

exit
ENDSSH
