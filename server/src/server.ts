import express, { Express, Request, Response } from 'express'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'

import { User, Message, Session } from './types'
import { PORT, CLIENT_HOST } from './config'

const app: Express = express()

const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: CLIENT_HOST,
    credentials: true,
  },
})

app.use(cors())

let messages: Message[] = []
let users: User[] = []
let activeUserSessions: Session[] = []

app.get('/api/messages', (request: Request, response: Response) => {
  return response.send({
    messages: [{
      messageText: 'hello',
      sender: 'Sophie',
      receiver: 'John',
    }]
  })

  if (!request.params.currentUser) {
    return response.send({ messages: [] })
  }

  let result = messages.filter(
    message =>
      message.sender === request.params.currentUser ||
      message.receiver === request.params.currentUser
  )

  if (request.params.opponent) {
    result = result.filter(
      message =>
        message.sender === request.params.opponent ||
        message.receiver === request.params.opponent
    )
  }

  response.send({ messages: result })
})

app.get('/api/users', (request: Request, response: Response) => {
  response.send({ users })
})

io.on('connection', (socket) => {
  const { id } = socket.client
  console.log(`new client session: ${id}`)

  socket.on('new login', (user: User) => {
    console.log(`user connected: ${user.email}`)

    if (!users.some((existingUser) => existingUser.email === user.email)) {
      users = [...users, { ...user, userId: user.email }]
      io.emit('new user added', { ...user, userId: user.email })
    }

    socket.sessionUsername = user.userId
    activeUserSessions.push({
      session: id,
      userId: user.userId,
    })
  })

  socket.on('send message', (message: Message) => {
    console.log(`message: ${message.sender}: ${message.messageText}`)

    messages.push(message)

    io.emit('receive message', message)
  })

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.sessionUsername}`)
    activeUserSessions = activeUserSessions.filter(
      (user) => !(user.userId === socket.sessionUsername && user.session === id)
    )
  })
})

app.set('port', PORT)

server.listen(PORT, () => {
  console.log('listening on *:5000')
})
