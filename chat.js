const sockets = new Map();
const rooms = new Map();
const users = new Map();

const broadcastEvent = (roomname, username, msg) => {
  const room = rooms.get(roomname);
  room?.forEach((id) => {
    const ws = sockets.get(id);
    ws?.send(JSON.stringify({ username, msg }));
  });
};

const actions = {
  onjoin (id, { payload }) {
    const { username, roomname, msg } = payload;
    const room =
      rooms.get(roomname) || rooms.set(roomname, new Set()).get(roomname);
    room?.add(id);
    const user = users.get(id) || users.set(id, new Set()).get(id);
    user?.add(roomname);
    broadcastEvent(roomname, username, msg);
  },
  onleave (id, { payload }){
    const { username, roomname, msg } = payload;
    const usersSet = rooms.get(roomname);
    usersSet?.delete(id);
    const roomSet = users.get(id);
    roomSet?.delete(roomname);
    broadcastEvent(roomname, username, msg);
  },
  onmsg(_,{ payload }) {
    const { username, roomname, msg } = payload;
    broadcastEvent(roomname, username, msg);
  }
}

const chatConnection = (ws) => {
  const uid = Date.now();
  sockets.set(uid, ws);
  ws.on('message', (evt) => {
    const data = JSON.parse(evt);
    actions[data.action](uid,data);

  });
  ws.on('close', function () {
    console.log('from close') // to handle when closing 
    sockets.delete(uid);
  });
};

module.exports = chatConnection;
