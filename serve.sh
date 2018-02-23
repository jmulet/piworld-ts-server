#!/bin/bash
killall ts-node-dev
killall webpack
cd server 
npm run serve &
cd ../client
npm run serve & 