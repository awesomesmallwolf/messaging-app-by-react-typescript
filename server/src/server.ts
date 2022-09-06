import express, { Express, Request, Response } from 'express'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'

import { User, Message, Session } from './types'
import { PORT, CLIENT_HOST } from './config'

const app: Express = express()

app.set('port', PORT)

server.listen(PORT, () => {
  console.log('listening on *:5000')
})
