// import { DataContext } from '../context/DataContext'
// import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteTaskMutation } from '../slices/todosApiSlice'
import { deleteTask } from '../slices/todoSlice'

const ToDoItem = ({ todo }) => {
  // const { dispatch } = useContext(DataContext)
  const [deleteTaskApiCall, { isLoading }] = useDeleteTaskMutation()
  const dispatch = useDispatch()
  const id = todo._id;

  const handleClick = async () => {
    // const response = await fetch('/api/todo/' + id, {
    //   method: 'DELETE'
    // })

    // if (response.ok) {
    //   dispatch({type: 'DELETE_TASK', payload: id})
    // }
    try {
      const json = await deleteTaskApiCall( id ).unwrap()
      console.log(id, 'deleteeee')

      dispatch(deleteTask(id))
    } catch(err) {
      console.log(err,'hiii')
    }
  }

  return (
    <tbody>
    <tr className="todo-details">
      <td>{todo.task}</td>
      <td>{todo.timeinterval}</td>
      <td>
        <span onClick={handleClick}>delete</span>
      </td>
    </tr>
    </tbody>
  )
}
  
export default ToDoItem