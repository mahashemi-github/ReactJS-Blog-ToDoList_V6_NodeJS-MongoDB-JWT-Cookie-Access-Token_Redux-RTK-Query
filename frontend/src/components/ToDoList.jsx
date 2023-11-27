import { useState, useEffect } from 'react'
import ToDoForm from './ToDoForm'
import ToDoItem from './ToDoItem'
// import { DataContext } from '../context/DataConKtext'
// import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllTasksMutation } from '../slices/todosApiSlice'
import { allTasks } from '../slices/todoSlice'

const ToDoList = () => {
  const [errorr, setErrorr] = useState(null)

  // const { todos, dispatch } = useContext(DataContext)
  const dispatch = useDispatch()

  const [getAllTasksApiCall, { isLoading }] = useGetAllTasksMutation()
  const { todos } = useSelector((state) => state.todo)

  useEffect(() => {
    const fetchtodos = async () => {
      try{
        // const response = await fetch('/api/todo')
        // const json = await response.json()
  
        // if (response.ok) {
        //   dispatch({type: 'ALL_TASKS', payload: json})
        // }  
        // if (!response.ok) {
        //   setErrorr('Something went wrong! Failed to fetch.')
        //   setErrorr('')
        // }

        const json = await getAllTasksApiCall().unwrap()
        console.log(json, 'todos all list')
  
        dispatch(allTasks(json))
        
      } catch(err) {
        console.log(err, 'errror list')
        if(err.message.includes('Unexpected token')) {
          setErrorr('Something went wrong! Failed to fetch.')
        }
      }
    }

  fetchtodos()
  }, [dispatch])

  return (
    <div>
      <div className="todo-container">
        <ToDoForm />
        <div className="todo">
          <h2>To-Dos</h2>
          <table>
            <thead>
              <tr>
              <th>Task </th>
              <th>Timeinterval</th>
              <th></th>
              </tr>
            </thead>
            {!errorr && todos && todos.map(todo => (
              <ToDoItem todo={todo} key={todo._id} />
            ))}
          </table>
          {errorr && <div className="error">
          <span className="material-symbols-outlined">Error</span>&nbsp; 
          {errorr}</div>}
        </div>
      </div>
    </div>
  )
}
 
export default ToDoList