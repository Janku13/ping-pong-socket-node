import { Server, Socket } from 'socket.io'
import logger from './utils/logger'
import EVENTS from './utils/events';

function socket({io}:{io:Server}) {
  logger.info(`sockets enabled`)

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`)
    socket.on(EVENTS.CLIENT.ready, () => {
      console.log(io.engine.clientsCount);
      
      logger.info('Player ready', socket.id);
      if (io.engine.clientsCount % 2 === 0) {
        console.log("it is 2")
        io.emit(EVENTS.SERVER.startGame,socket.id)
      }
    })
    socket.on(EVENTS.CLIENT.paddleMove, ({xPosition}) => {
      console.log(xPosition)
     socket.broadcast.emit(EVENTS.CLIENT.paddleMove,xPosition) 
    })
    socket.on(EVENTS.CLIENT.ballMove, (ballData) => {
      socket.broadcast.emit(EVENTS.CLIENT.ballMove,ballData)
    })
    socket.on(EVENTS.disconnect, (reason) => {
      
    })
  })
}

export default socket