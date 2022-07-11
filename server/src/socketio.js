"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/logger"));
const events_1 = __importDefault(require("./utils/events"));
function socket({ io }) {
    logger_1.default.info(`sockets enabled`);
    io.on(events_1.default.connection, (socket) => {
        logger_1.default.info(`User connected ${socket.id}`);
        socket.on(events_1.default.CLIENT.ready, () => {
            console.log(io.engine.clientsCount);
            logger_1.default.info('Player ready', socket.id);
            if (io.engine.clientsCount % 2 === 0) {
                console.log("it is 2");
                io.emit(events_1.default.SERVER.startGame, socket.id);
            }
        });
        socket.on(events_1.default.CLIENT.paddleMove, ({ xPosition }) => {
            console.log(xPosition);
            socket.broadcast.emit(events_1.default.CLIENT.paddleMove, xPosition);
        });
        socket.on(events_1.default.CLIENT.ballMove, (ballData) => {
            socket.broadcast.emit(events_1.default.CLIENT.ballMove, ballData);
        });
        socket.on(events_1.default.disconnect, (reason) => {
        });
    });
}
exports.default = socket;
