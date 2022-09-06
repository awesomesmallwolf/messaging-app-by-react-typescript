import axios from 'axios'
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { Message, MessagesState, User } from '../utilities/types'

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload
    },
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload)
    },
    sendMessage: (state, { payload }: PayloadAction<any>) => {
    },
    setLoading: (state) => {
      state.loading = true
    },
    setLoadingComplete: (state) => {
      state.loading = false
    },
  },
})

export const {
  sendMessage,
  addMessage,
  setMessages,
  setLoading,
  setLoadingComplete,
} = messagesSlice.actions
export default messagesSlice.reducer

export function getMessages(user: User | null, currentUser: User | null) {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())

    console.log({ user, currentUser })

    try {
      const { data } = await axios('/api/messages', {
        params: { currentUser: currentUser?.email, opponent: user?.email }
      })

      dispatch(setMessages(data.messages))
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(setLoadingComplete())
    }
  }
}
