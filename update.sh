#!/bin/sh
cd /test/myapp
sudo git pull origin master
sudo pm2 restart all

