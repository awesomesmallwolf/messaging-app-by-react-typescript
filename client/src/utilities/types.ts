export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
  salutation?: string;
  type: 'Student' | 'Teacher' | 'Parent'
}

export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
  selectedUser: User | null
}

export interface Message {
  sender: string
  receiver?: string | null
  messageText: string
  creationTime: string
  type: 'System' | 'Manual'
}

export interface MessagesState {
  messages: Message[]
  loading: boolean
  error: string | null
}

export interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  error: string | null
}

export interface RootState {
  authState: AuthState
  messagesState: MessagesState
  usersState: UsersState
}
