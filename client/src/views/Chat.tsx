import React, { useMemo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'

import { Nav } from '../components/Nav'
import { Sidebar } from '../components/Sidebar'
import { ChatArea } from '../components/ChatArea'
import { sendMessage, getMessages } from '../store/messages.slice'
import { logout } from '../store/auth.slice'
import { getUsers, setSelectedUser } from '../store/users.slice'
import { RootState, Message, User } from '../utilities/types'

export const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('')

  const { currentUser } = useSelector((state: RootState) => state.authState)
  const { selectedUser } = useSelector((state: RootState) => state.usersState)
  const { users, loading: usersLoading } = useSelector(
    (state: RootState) => state.usersState
  )
  const { messages, loading: messagesLoading } = useSelector(
    (state: RootState) => state.messagesState
  )

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMessages(selectedUser, currentUser))
  }, [dispatch, selectedUser, currentUser])

  const handleLogoutClick = () => {
    localStorage.removeItem('user')

    dispatch(logout())
  }

  const handleSubmitForm = (event: any) => {
    event.preventDefault()

    if (messageInput && messageInput.trim() !== '') {
      const message: Message = {
        messageText: messageInput.trim(),
        creationTime: dayjs().format(),
        sender: currentUser!.email,
        receiver: selectedUser?.userId,
        type: 'Manual'
      }

      dispatch(sendMessage(message))      
    }

    setMessageInput('')
  }

  const handleSubmitAsSystem = (event: any) => {
    event.preventDefault()

    if (messageInput && messageInput.trim() !== '') {
      const message: Message = {
        messageText: messageInput.trim(),
        creationTime: dayjs().format(),
        sender: currentUser!.userId,
        receiver: null,
        type: 'System'
      }

      dispatch(sendMessage(message))      
    }

    setMessageInput('')
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value)
  }

  const handleSelectUser = (user: User) => {
    dispatch(setSelectedUser(user));
  }

  const reversedMessages = useMemo(() => {
    if (messages.length < 1) {
      return []
    }

    return [...messages].reverse()
  }, [messages])

  if (messagesLoading || usersLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>
  }

  return (
    <>
      <Nav onClick={handleLogoutClick} />
      <div className="flex m-0 content">
        <Sidebar
          users={users}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
        />
        <ChatArea
          messages={reversedMessages}
          messageInput={messageInput}
          handleSubmitForm={handleSubmitForm}
          handleSubmitAsSystem={handleSubmitAsSystem}
          handleChangeInput={handleChangeInput}
        />
      </div>
    </>
  )
}
