import { Dispatch } from 'redux'

import { addMessage } from '../store/messages.slice'
import { addUser } from '../store/users.slice'
import { Message, User, RootState } from '../utilities/types'

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
      case 'users/login': {
        socket.connect()

        socket.on('receive message', (message: Message) => {
          dispatch(addMessage(message))
        })

        socket.on('new user added', (user: User) => {
          dispatch(addUser(user))
        })

        socket.emit('new login', payload)

        break
      }

      case 'users/logout': {
        socket.disconnect()

        break
      }

      case 'messages/sendMessage': {
        socket.emit('send message', payload)

        return
      }
    }

    return next(action)
  }
}
