 import {config} from './server.config';
 import * as path from 'path';
 
// Socket store
export const SocketStore = {};

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
        // You can access session data from socket.handshake.session ---> you need to manually call .save()
        // so it won't be updated
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

        socket.on('socketStart', () => {
            const uopts = session.user.uopts || {};
            const ns = io.of("/");  
            const totalConnected = Object.keys(ns.connected).length;          
            if (!session.currentSocketId) {
                const u = {
                    id: session.user.id,
                    username: session.user.username,
                    fullname: session.user.fullname,
                    icon: path.join(config.basePrefix, "/assets/img/avatar/" + (uopts.avatar || "0") + ".png"),
                    login: session.logins.login,
                    totalConnected: totalConnected
                };
                socket.broadcast.emit('usersLogedin', u);            
                SocketStore[socket.id] = u;
            } 
            // Always send to the current socket the entire list of online users
            // which we assume to be those in SocketStore
            let allUsers = Object.keys(SocketStore).map( (id) => SocketStore[id]);
            socket.emit('usersOnline', allUsers);            
            session.currentSocketId = socket.id;
            session.save();
        });
        
        socket.on('disconnect', (socket: any) => {
            console.log("socket.io discconnect", socket);             
            delete SocketStore[socket.id];
        });
 
    });

}