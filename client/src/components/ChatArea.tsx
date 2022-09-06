import React from 'react'
import dayjs from 'dayjs'

import { Message } from '../utilities/types'

export interface ChatAreaProps {
  messages: Message[]
  messageInput: string
  handleSubmitAsSystem: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  messageInput,
  handleSubmitForm,
  handleSubmitAsSystem,
  handleChangeInput,
}) => {
  return (
    <div className="flex-1 w-full bg-gray-100">
      <div className="flex flex-col chatarea">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse">
          {messages.map((message, i) => (
            <div key={`${message.sender}-${message.creationTime}-${i}`} className="mb-3 p-3">
              <div className="flex items-center mb-2">
                <span className="font-bold text-gray-700 text-lg mr-4">{message.sender}</span>{' '}
                <span className="text-sm text-gray-400">
                  {dayjs(message.creationTime).format('h:mm A')}
                </span>
              </div>
              <p className="text-gray-800">{message.messageText}</p>
            </div>
          ))}
        </div>
        <div className="flex-none pb-4 px-4">
          <form onSubmit={handleSubmitForm}>
            <input
              type="text"
              name="messageInput"
              value={messageInput}
              onChange={handleChangeInput}
              className="w-full p-3 placeholder-gray-300 border border-gray-200 rounded-md shadow-md focus:outline-none focus:border-blue-light"
              placeholder="Reply..."
            />
            <button type="submit" className="bg-blue-dark">Submit as Manual Message</button>
            <button type="button" className="bg-blue" onClick={handleSubmitAsSystem}>Submit as System Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
