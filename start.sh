#!/usr/bin/env bash

npm list -g | grep json-server || npm install -g json-server --no-shrinkwrap
json-server --watch data/db.json