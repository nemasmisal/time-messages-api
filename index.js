const mongoose = require('mongoose');
const WebSocket = require('ws');
const { createServer } = require('http');
const config = require('./config/config');
const app = require('./config/express');
const chatConnection = require('./chat');

const server = createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', chatConnection);

mongoose.connect(config.db,
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) { return console.log(err); }
    server.listen(config.port, console.log(`Running on port ${config.port}. Connected to DB, ready for action.`));
  }
);
