import express ,{Request,Response} from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import config from 'config'
import socket from './socketio'
import logger from './utils/logger'
import { version } from '../package.json'

const port = config.get<number>("port")
const host = config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
    
  }
})
// const io = new Server(httpServer)

app.get("/", (_: Request, res: Response) => res.send(`Server is on port ${port} and version ${version}`))

httpServer.listen(port, () => {
  logger.info(`server in listening version ${version}`);
  logger.info(`server in on http://${host}:${port}`);
  socket({io})
})