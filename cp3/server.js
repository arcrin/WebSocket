var uuid = require("node-uuid");
var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8181 });

var clients = [];
wss.on("connection", function(ws) {
  var client_uuid = uuid.v4();
  var nickname = client_uuid.substr(0, 8);
  clients.push({ id: client_uuid, ws: ws, nickname: nickname });
  console.log("client [%s] connected", client__uuid);
  ws.on("message", function(message) {
    for (var i = 0; i < clients.length; i++) {
      var clientSocket = clients[i].ws;
      if (clientSocket.readyState === WebSock.OPEN) {
        console.log("client [%s]: %s", clients[i].id, message);
        clientSocket.send(
          JSON.stringify({
            id: client_uuid,
            nickname: nickname,
            message: message
          })
        );
      }
    }
  });
  ws.on("close", function() {
    for (var o = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
        console.log("client[%s] disconnected", client_uuid);
        clients.splice(i, 1);
      }
    }
  });
});
