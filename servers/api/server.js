'use strict';

const amcServer = require('amc-server');
const serverConfig = require('./config/config.local');

const server = amcServer.start(serverConfig);
