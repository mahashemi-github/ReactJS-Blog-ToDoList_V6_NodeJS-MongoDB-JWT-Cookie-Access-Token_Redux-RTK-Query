import { Link, useLoaderData } from 'react-router-dom'

const AllBlogs = () => {
  const allblogs = useLoaderData()
  // const reversed = [...allblogs].reverse()

    // 2023-02-09T12:27:31.453Z
    // const year = dateraw.toString().slice(0,4)
    // console.log(dateraw.toString())
    // const monthname = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    // let index
    // if (dateraw.toString().slice(5,6) === 0 ){
    //   index = dateraw.toString().slice(6,7)
    // } else {
    //   index = dateraw.toString().slice(5,7)
    // }
    // const month = monthname[index - 1]
    // const day = dateraw.toString().slice(8,10)

  return (
    <div>
      <h2>Blogs</h2>
      <div className="allblogs">
        {allblogs && (allblogs.length) && allblogs.map(blog => (
          <Link to={blog._id.toString()} key={blog._id}>
            <p>{blog.title}</p>
            <p>By {blog.author}, At {blog.createdAt}</p>
            <p>{ (blog.body).length <= 25
                 ? blog.body
                 : (blog.body).slice(0, 50)}...</p>
          </Link>
        ))}
        {allblogs && (allblogs.length === 0) && <div className='empty-blog'> <h3>No Posts Available!</h3></div>}
      </div>  
    </div>
  )
}

export const allblogsLoader = async () => {
  const res = await fetch('/api/blogs')
  const data = await res.json()

  if (!res.ok) {
    throw Error('Could not fetch the data for that resource.')
  }
  return data
}
 
export default AllBlogs