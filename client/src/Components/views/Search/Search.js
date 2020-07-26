import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Search() {

    const [blogs, setBlogs] = useState([])
    const [blogs1, setBlogs1] = useState([])
    const [search,setSearch] = useState('')
    const[visible,setVisible]=useState(5)

    useEffect(() => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    setBlogs(response.data.blogs)
                }
            })
    }, [])

    useEffect(() => {
        axios.get('/api/blog1/getBlogs')
            .then(response => {
                if (response.data.success) {
                    setBlogs1(response.data.blogs1)
                }
            })
    }, [])

    

    const filter = blogs.filter(blog=>{
        return blog.title.toLowerCase().toString().includes(search.toLowerCase())
    })
    const filter1 = blogs1.filter(blog1=>{
        return blog1.title.toLowerCase().toString().includes(search.toLowerCase())
    })

    const list = filter.slice(0,visible).map(blog => {
        return (<div><Link to={`/blog/post/detail/${blog._id}`}>{blog.title}</Link></div>)
    })

    const list1 = filter1.slice(0,visible).map(blog1 => {
        return (<div><Link to={`/blog1/post/detail/${blog1._id}`}>{blog1.title}</Link></div>)
    })

    return (
        <div>
            <input type='text' className="ml-4" placeholder="Search..." onChange={e=>setSearch(e.target.value)}/>
            {list}
            {list1}

            {visible < blogs.length &&
            <button onClick={()=>setVisible(visible+5)}>LoadMore</button>}
        </div>
    )

}

export default Search
