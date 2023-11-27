import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages import
import AllBlogs, { allblogsLoader } from './components/AllBlogs'
import BlogDetails, { blogdetailsLoader } from './components/BlogDetails'
import BlogsError from './components/BlogsError'
import ToDoList from './components/ToDoList'
import NewBlog from './components/NewBlog'
import Faq from './components/Faq'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import SignupLogin from './components/SignupLogin'

// layouts import
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import AllBlogsLayout from './layouts/AllBlogsLayout'

const router = createBrowserRouter(
  createRoutesFromElements(        
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<AllBlogsLayout />} errorElement={<BlogsError />}>
        <Route 
          index 
          element={<AllBlogs />} 
          loader={allblogsLoader} 
        />
        <Route 
          path=':id' 
          element={<BlogDetails />}
          loader={blogdetailsLoader}
        />
      </Route>
      <Route path='create' element={<NewBlog />}  />
      <Route path='todo' element={<ToDoList />} />
      <Route path='help' element={<HelpLayout />} >
        <Route path='faq' element={<Faq />} />
        <Route path='contact' element={<Contact />} />
      </Route>
      <Route path='signuplogin' element={<SignupLogin />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App