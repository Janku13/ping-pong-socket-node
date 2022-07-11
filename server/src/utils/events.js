"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENTS = {
    connection: 'connection',
    disconnect: 'disconnect',
    CLIENT: {
        ready: 'ready',
        paddleMove: 'paddleMove',
        ballMove: 'ballMove',
    },
    SERVER: {
        startGame: 'startGame',
    },
};
exports.default = EVENTS;
