import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'

const HandleBlogEdit = ({ blog }) => {
  const [title, setTitle] = useState(blog.title)
  const [body, setBody] = useState(blog.body)
  const navigate = useNavigate()
  const id = blog._id
  // const { dispatch } = useContext(AuthContext)
  const dispatch = useDispatch()

  const handleClickEdit = async (e) => {
    e.preventDefault()
    const editedItems = { title, body }
    const patchOptions = {
      method: 'PATCH',
      body: JSON.stringify(editedItems),
      headers: {
        'content-type': 'application/json'
      }
    }
   
    const response = await fetch('/api/blogs/' + id, patchOptions)
    const json = await response.json()
    
    if (response.ok) {
      console.log('Blog successfully edited.')
      // dispatch({type: 'LOGIN', payload: json})
      dispatch(login({ ...json }))
      navigate('/'+id) 
    }
  }

  return ( 
    <div className="edit-form">
      <h3>Edit the Blog</h3>
      <form onSubmit={handleClickEdit}>
        <label>Blog title:</label>
        <input 
        type="text" 
        required 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>Edit Blog</button>
      </form>
    </div>
  )
}
 
export default HandleBlogEdit