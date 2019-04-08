#!/usr/bin/env bash

node ./data/generator/generate-data.js
DataGeneratorProcess=$!
wait $DataGeneratorProcess
npm list -g | grep json-server || npm install -g json-server --no-shrinkwrap
json-server --watch data/db.json