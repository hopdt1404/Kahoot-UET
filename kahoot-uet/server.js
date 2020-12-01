const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: { origin: '*' }
});
const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const VALIDATE_ROOM = "validateRoom";
const ADD_PLAYER = "addPlayer";
const ADD_NEW_ROOM = "addNewRoom";
const UPDATE_PLAYERS = "updatePlayers";
const LOCK_ROOM = "lookRoom";
const WAIT_TO_START = "waitToStart";
const LOADING = "loading";
const SHOW_OPTION = "showOption";

const roomList = [320];
const lockedList = []; //room
const playerList = [];
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
    // Listen for lock
    socket.on(LOCK_ROOM, roomId => {
        console.log("LOCK",roomId);
        if(lockedList.findIndex( room => room == roomId) == -1 ){
            lockedList.push(roomId);
            socket.in(roomId).emit(LOCK_ROOM, true)
            console.log(lockedList);
        }
        else{
            const index = lockedList.findIndex( room => room == roomId);
            lockedList.splice(index,1);
            socket.in(roomId).emit(LOCK_ROOM, false)
            console.log(lockedList);
        }
    })
    // Listen to start game
    socket.on(WAIT_TO_START, roomId => {
        socket.in(roomId).emit(WAIT_TO_START, true);
    })

    // Listen for loading
    socket.on(LOADING, (roomId) => {
        console.log("LOADING");
        socket.in(roomId).emit(LOADING, true);
    });

    // Listen to show answer option
    socket.on(SHOW_OPTION,(room,show)=>{
        console.log(room,show);
        socket.in(room).emit(SHOW_OPTION, show==1);
    })








    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
