'use strict';
const serverless = require('aws-serverless-express');
const app = require(__dirname + "/app");
const server = serverless.createServer(app);
exports.handler = (event, context) => {
    serverless.proxy(server, event, context);
};