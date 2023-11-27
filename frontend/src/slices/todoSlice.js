import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [ ],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    allTasks: (state, action) => {
      state.todos = action.payload
    },
    newTask: (state, action) => {
      state.todos.unshift(action.payload)
    },
    deleteTask: (state, action) => {
       state.todos.splice(state.todos.findIndex(w => w._id === action.payload), 1)
    },
  },
})

export const { allTasks, newTask, deleteTask } = todoSlice.actions

export default todoSlice.reducer
