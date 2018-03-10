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
       
        if (session && session.user) {
            // Join to the room for the school of that user
            socket.join('idSchool' + session.user.idSchool);
            console.log("socket.io connect", socket.conn.id, session.user.fullname);
            console.log('joined to room ', 'idSchool' + session.user.idSchool);
            // Join to the room for each group where the user belongs to
            // Todo: These groups can be as student or parent?
            if (session.courses) {
                session.courses.forEach( (e) => {
                    socket.join('groupId' + e.idGroup);
                    console.log('joined to room ', 'groupId' + e.idGroup);
                });      
            }
            
        }

        socket.on('socketStart', () => {
            console.log('socketStart');
            const uopts = session.user.uopts || {};
            const totalConnected = Object.keys(SocketStore).length;          
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
                console.log("broadcast usersLogedin", u);
            } 
            // Always send to the current socket the entire list of online users
            // which we assume to be those in SocketStore
            let allUsers = Object.keys(SocketStore).map( (id) => SocketStore[id]);
            socket.emit('usersOnline', allUsers);            
            session.currentSocketId = socket.id;
            session.save();
            console.log("emit userOnline", allUsers);
        });
        
        socket.on('disconnect', (socket: any) => {
            console.log("socket.io discconnect", socket);             
            delete SocketStore[socket.id];
        });
 
    });

}