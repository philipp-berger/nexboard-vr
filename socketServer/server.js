var io = require('socket.io')(8888);

const INIT = 'INIT'
const NEW_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

// Incoming
const SYNC_HEAD = 'SYNC_HEAD'
const SYNC_HAND = 'SYNC_HAND'

// Outgoing
const MOVE_HEAD = 'MOVE_HEAD'
const MOVE_HAND = 'MOVE_HAND'

const connectedClients = {}

io.on('connection', function (socket) {
  onConnection(socket);

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit(REMOVE_USER, { id: socket.clientId });
    console.log("Client disconnected", socket.clientId);
    delete connectedClients[socket.clientId];
  });

  socket.on('HELLO', function(data){
    console.log("HELLO", data);
    // TODO: Store to db here
  })

  // Data: {id: number, data: { position: Object, rotation: Object} }
  socket.on(SYNC_HEAD, function(data){
    // console.log("Sync Head", data)
    socket.broadcast.emit(MOVE_HEAD, data);
    // TODO: Store to db here
  })
  socket.on(SYNC_HAND, function(data){
    // console.log("Sync Hande", data)
    socket.broadcast.emit(MOVE_HAND, data);
    // TODO: Store to db here
  })
});


function onConnection(socket) {
  var newClientId = Object.keys(connectedClients).length;
  socket.clientId = newClientId;
  connectedClients[newClientId] = socket;

  socket.join('nexboard');
  socket.emit('init', {id: newClientId})
  socket.broadcast.emit(NEW_USER, { id: newClientId });

  console.log("client with id connected", newClientId, socket.rooms);
}

function inverseValues(data){
  let _data = data;
  if(data.position)
   Object.keys(data.position).forEach( (key) => {
     _data.position[key] = _data.position[key] * -1
  })
  if(data.rotation)
   Object.keys(data.rotation).forEach( (key) => {
     _data.rotation[key] = 180 + _data.rotation[key] * -1
  })
  return _data
}