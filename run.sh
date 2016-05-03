#!/bin/bash

rm -f serverpid.pid
rm -f nohup.out
rm -f nohup.err
echo "Starting Node Server..."
nohup node main.js &
echo $! >> serverpid.pid
echo "Server started."
cat serverpid.pid
