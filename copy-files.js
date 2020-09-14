#!/usr/bin/env node
const shell = require('shelljs');

shell.mkdir('-p', './dist/');
shell.cp('-R', './src/public', './dist/public');
