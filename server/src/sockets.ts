// Prevents from multiple messages if sockets belong to multiple rooms
function emitToRooms(socket, rooms) {
    var sender = socket;
    rooms.forEach( (room)=> sender = sender.to(room) );
    return sender;
}

export function sockets(io) {

    // Connections to socketio only for aunthenticated users
    io.use((socket: any, next) => {
        if (!socket.handshake.session ||  socket.handshake.session.user) {
            return next();
        }
        next(new Error('Authentication error'));
    });

    io.on('connect', (socket: any) => {
       
        // You can access session data from socket.handshake.session
        const session = socket.handshake.session;

        if (session && session.user && session.enrolls) {
            // Join to the room for the school of that user
            socket.join('schoolId' + session.user.schoolId);
            console.log("socket.io connect", socket.conn.id, session.user.fullname);
            console.log('joined to room ', 'schoolId' + session.user.schoolId);
            // Join to the room for each group where the user belongs to
            // Todo: These groups can be as student or parent?
            session.enrolls.forEach( (e) => {
                socket.join('groupId' + e.idGroup);
                console.log('joined to room ', 'groupId' + e.idGroup);
            });            
        }

        socket.on('hello', function (msg) {
            console.log(msg);
        });

        socket.on('start-session', function (msg) {
            console.log(msg); 
            if (session.enrolls.length && !session.socketOn) {
                session.socketOn = true;
                const rooms = session.enrolls.map( (e) => 'groupId' + e.idGroup);
                emitToRooms(socket, rooms).emit('session-started', session.user.fullname + " ha iniciat sessió.");
            }
        });

        socket.on('disconnect', (socket: any) => {
            console.log("socket.io discconnect", socket);             
        });
    });

}