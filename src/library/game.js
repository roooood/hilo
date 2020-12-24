

import * as Colyseus from "colyseus.js";
import { serverUrl } from 'library/request';

class Game {
    constructor(type) {
        this.Socket = serverUrl;
        this.Client = null;
        this.Room = null;
        this.isConnect = false;
        this.inRoom = false;
        this.Listen = [];
        this.type = type;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.Client = new Colyseus.Client(this.Socket);
            this.Client.getAvailableRooms(this.type).then(rooms => {
                this.isConnect = true;
                if (this.Listen['connect'] != null) {
                    for (let cb of this.Listen['leave']) {
                        cb();
                    }
                }
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }
    joinChannel(data) {
        return new Promise((resolve, reject) => {
            this.Client.getAvailableRooms(this.type).then(rooms => {
                let found = rooms.some(e => e.roomId == data.channel);
                if (found) {
                    this.join(data.channel, data)
                        .then(resolve)
                }
                else {
                    this.create(data)
                        .then(resolve)
                }
            }).catch(e => {
                reject(e);
            });
        });
    }
    create(option) {
        return new Promise((resolve, reject) => {
            this.Client.create(this.type, option).then(room => {
                this.Room = room;
                this.addListner();
                resolve();
            }).catch(e => {
                console.error("join error", e);
                reject();
            });
        });
    }
    join(roomId, option) {
        return new Promise((resolve, reject) => {
            this.Client.joinById(roomId, option).then(room => {
                this.Room = room;
                this.addListner();
                resolve();
            }).catch(e => {
                console.error("join error", e);
                reject();
            });
        });
    }
    leave() {
        if (this.inRoom)
            this.Room.leave();
        this.inRoom = false;
    }

    getRooms(callback) {
        if (this.isConnect) {
            this.Client.getAvailableRooms(this.type).then(rooms => {
                callback(rooms);
            }).catch(e => {
                callback(e);
            });
        }
        else {
            callback(false);
        }
    }
    onState(callback) {
        if (this.inRoom)
            this.Room.onStateChange((state) => {
                callback(state);
            });
    }
    send(type, message) {
        if (this.Room != null)
            this.Room.send(type, message);
    }
    add(key, callback, listen) {
        if (this.Listen[key] == null) {
            this.Listen[key] = [];
        }
        this.Listen[key].push(callback);

        if (listen == true) {
            this.Room.listen(key, (state) => {
                callback(state.value, state);
            });
        }
    }
    listen(key, callback) {
        this.Room.listen(key, (state) => {
            callback(state);
        });
    }
    reset() {
        if (this.Room != undefined) {
            this.Listen = [];
            this.Room.removeAllListeners()
        }
    }

    addListner() {
        this.inRoom = true;
        this.Room.onLeave((code) => {
            this.inRoom = false;
            if (this.Listen['leave'] != null) {
                for (let cb of this.Listen['leave']) {
                    cb();
                }
            }
        });

        this.Room.onMessage("*", (type, messages) => {
            if (this.Listen[type] != null) {
                for (let cb of this.Listen[type]) {
                    cb(messages);
                }
            }
        });
    }
}
export default Game;