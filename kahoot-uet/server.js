const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});
const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const VALIDATE_ROOM = "validatRoom";
const ADD_PLAYER = "addPlayer";
const ADD_NEW_ROOM = "addNewRoom";
const UPDATE_PLAYERS = "updatePlayers";

const roomList = [320];
const lockedList = []; //room
const playerList = [{ name: "abcs", room: 320 }];
io.on("connection", socket => {
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
    // Listen for create new room
    socket.on(ADD_NEW_ROOM, roomId => {
        if (roomList.findIndex(room => room == roomId)) {
            socket.emit(ADD_NEW_ROOM, true);
            roomList.push(roomId);
            console.log("successful", roomList);
        } else {
            socket.emit(ADD_NEW_ROOM, false);
        }
    });
    // Listen for validate room
    socket.on(VALIDATE_ROOM, roomId => {
        console.log(
            `ROOM: ${roomId}`,
            roomList,
            roomList.findIndex(room => room == roomId),
            lockedList.findIndex(room => room == roomId)
        );
        if (
            roomList.findIndex(room => room == roomId) > -1 &&
            lockedList.findIndex(room => room == roomId) == -1
        ) {
            socket.emit(VALIDATE_ROOM, true);
        } else {
            socket.emit(VALIDATE_ROOM, false);
        }
    });
    // Listen for add new player
    socket.on(ADD_PLAYER, player => {
        playerList.push(player);
        socket.in(player.roomId).emit(UPDATE_PLAYERS, player);
        socket.emit(ADD_PLAYER, true);
        console.log(playerList);
    });

    // Listen for update list player
    socket.on(UPDATE_PLAYERS, player => {
        socket.in(player.roomId).emit(UPDATE_PLAYERS, player);
        console.log("updated");
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
