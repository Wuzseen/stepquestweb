#!/bin/bash

echo "Starting Node Server..."
nohup node main.js &
echo $! >> serverpid.pid
echo "Server started."
cat serverpid.pid
