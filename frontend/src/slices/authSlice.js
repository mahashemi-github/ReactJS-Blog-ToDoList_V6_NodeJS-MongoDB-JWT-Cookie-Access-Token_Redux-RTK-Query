import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userco: localStorage.getItem('userco')
    ? JSON.parse(localStorage.getItem('userco'))
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userco = action.payload;
      localStorage.setItem('userco', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.userco = null;
      localStorage.removeItem('userco')
    },
  },
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer
