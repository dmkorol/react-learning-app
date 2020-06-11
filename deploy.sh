ssh -i ~/.ssh/hr-portal.pem ubuntu@ec2-3-134-243-64.us-east-2.compute.amazonaws.com
pm2 stop react-json-server
cd ~/react-learning-app
git pull origin master
yarn install
yarn build
pm2 restart react-json-server

# run pm2 first time
# pm2 --name "react-json-server" start yarn -- server
