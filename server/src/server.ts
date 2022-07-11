import { createServer } from 'http'

import { Server } from 'socket.io'
import config from 'config'

import socket from './socketio'
import logger from './utils/logger'
import { version } from '../package.json'
import app from './app'

const port = config.get<number>("port")
const host = config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")


const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
    
  }
})


httpServer.listen(port, () => {
  logger.info(`server in listening version ${version}`);
  logger.info(`server in on http://${host}:${port}`);
  socket({io})
})