const app = require('express')();
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const chatConnection = require('../chat');

const WebSocket = require('ws');

const server = createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', chatConnection);

app.use(cookieParser());

module.exports = server;
