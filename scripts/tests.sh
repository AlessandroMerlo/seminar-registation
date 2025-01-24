#!/bin/bash

set -e

npm run test-jest -- --ci

sh ./scripts/run.sh &

while ! wget -q --spider http://localhost:9090; do
  sleep 1
done

npm run cypress:run