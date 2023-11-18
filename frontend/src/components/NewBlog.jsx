import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/authSlice'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  // const { userco, dispatch } = useContext(AuthContext)
  const { userco } = useSelector((state) => state.auth)

  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
  if(userco?.accessToken)  {
    e.preventDefault()
    const blog = { author: userco.user, title, body }
    setIsPending(true)
    
    const response = await fetch('/api/blogs/create', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: { 
        'Content-Type': 'application/json'
       }
    })
    const json = await response.json()
    
    if (response.ok) {
      console.log('Blog successfully added')
      setIsPending(false)
      // dispatch({type: 'LOGIN', payload: json})
      dispatch(login({ ...json }))

      navigate('/') 
    }    
  } else {
      throw Error('User is not valid. Request is not authorized')
   }
   setIsPending(false)
 } 

  return ( 
    <div className="create-form">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
      <label>Blog author:</label>
        <input 
        type='text' 
        required 
        value={userco ? userco.user : ''}
        className='author-input'
        readOnly
        />
        <label>Blog title:</label>
        <input 
        type='text' 
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
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
    </div>
  )
}
 
export default NewBlog