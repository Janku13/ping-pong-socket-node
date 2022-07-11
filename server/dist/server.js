"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("config"));
const socketio_1 = __importDefault(require("./socketio"));
const logger_1 = __importDefault(require("./utils/logger"));
const package_json_1 = require("../package.json");
const app_1 = __importDefault(require("./app"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const corsOrigin = config_1.default.get("corsOrigin");
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"],
        credentials: true,
    }
});
httpServer.listen(port, () => {
    logger_1.default.info(`server in listening version ${package_json_1.version}`);
    logger_1.default.info(`server in on http://${host}:${port}`);
    (0, socketio_1.default)({ io });
});
