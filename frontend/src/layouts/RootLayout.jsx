import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { useState, useContext} from 'react'
import { logout } from '../slices/authSlice'


const RootLayout = () => {
  const [isPending, setIsPending] = useState(false)
  // const { userco, dispatch } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall, { isLoading }] = useLogoutMutation()
  const { userco } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    setIsPending(true)    
    // const response = await fetch('/api/logout')
    // const json = await response.json()
    // console.log(json.msg) 

    // if (response.ok) {
    //   setIsPending(false)
    //   dispatch({type: 'LOGOUT'})
    //   console.log('You are logged out.')
    //   if(location.pathname === '/create') {
    //     navigate('/signuplogin') 
    //   }
    // }

    try {
      const json = await logoutApiCall().unwrap()
      console.log(json)

      setIsPending(false)
      dispatch(logout())
      console.log('You are logged out.')
      if(location.pathname === '/create') {
        navigate('/signuplogin') 
      }
    } catch(err) {
      console.log(err)
    }
  }

  return ( 
    <div className="root-layout">
      <header>
        <nav>
          <h1>MyNoteBook</h1>
          <NavLink to="/">All Blogs</NavLink>
          {userco && <NavLink to="create">New Blog</NavLink>}
          {!userco && <Link to="signuplogin">New Blog</Link>}
          <NavLink to="todo">To-Do List</NavLink>
          <NavLink to="help">Help</NavLink>
          {!userco && <NavLink to="signuplogin">My Account</NavLink>}
          {userco && <button onClick={handleLogout}>Log out</button>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
 
export default RootLayout