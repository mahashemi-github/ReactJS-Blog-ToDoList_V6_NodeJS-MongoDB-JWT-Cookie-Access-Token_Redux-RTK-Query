import { useState } from 'react'
// import { DataContext } from '../context/DataContext'
// import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePostNewTaskMutation } from '../slices/todosApiSlice'
import { newTask } from '../slices/todoSlice'

const ToDoForm = () => {
  // const { dispatch } = useContext(DataContext)

  const [task, setTask] = useState('')
  const [timeinterval, setTimeinterval] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const [postNewTaskApiCall, { isLoading }] = usePostNewTaskMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const todo = {task, timeinterval}
    
    // const response = await fetch('/api/todo', {
    //   method: 'POST',
    //   body: JSON.stringify(todo),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    // const json = await response.json()

    // if (!response.ok) {
    //   setError(json.error)
    // }
    // if (response.ok) {
    //   setError(null)
    //   setTask('')
    //   setTimeinterval('')
    //   dispatch({type: 'NEW_TASK', payload: json})
    // }

    try {
      const json = await postNewTaskApiCall({ task, timeinterval }).unwrap()
      console.log(json, 'newtask')

      dispatch(newTask(json))
      setError(null)
      setTask('')
      setTimeinterval('')
    } catch(err) {
      console.log(err.data)
      setError(err.data.error)
    }
  }

  return (
    <div className="todo-form">
      <h3>Add a New Task</h3>
      <form onSubmit={handleSubmit}> 
        <label>Task:</label>
        <input 
          type="text" 
          onChange={(e) => setTask(e.target.value)} 
          value={task}
        />
        <label>Timeinterval:</label>
        <input 
          type="text" 
          onChange={(e) => setTimeinterval(e.target.value)} 
          value={timeinterval}
        />
        <button>Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default ToDoForm