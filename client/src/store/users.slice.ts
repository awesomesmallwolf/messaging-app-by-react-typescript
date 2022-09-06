import axios from 'axios'
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { User, UsersState } from '../utilities/types'

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload)
    },
    setSelectedUser: (state, { payload }: PayloadAction<User>) => {
      state.selectedUser = payload
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
  setUsers,
  addUser,
  setSelectedUser,
  setLoading,
  setLoadingComplete,
} = usersSlice.actions
export default usersSlice.reducer

export function getUsers() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    dispatch(setLoading())

    try {
      const { data } = await axios('/api/users')

      dispatch(setUsers(data.users))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingComplete())
    }
  }
}
