export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  profilePhoto?: string
}

export interface Message {
  messageText: string
  creationTime: string
  sender: string
  receiver: string
}

export interface Session {
  userId: string
  session: string
}
