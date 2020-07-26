import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Pagination from './Pagination';
import { Link } from 'react-router-dom'

function SearchAppPagination() {

    const [blogs, setBlogs] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    setBlogs(response.data.blogs)
                }
            })
    }, [])

    const filter = blogs.filter(blog => {
        return blog.title.toLowerCase().toString().includes(search.toLowerCase())
    })

    const list = filter.map(blog => {
        return (<div><Link to={`/blog/post/detail/${blog._id}`}>{blog.title}</Link></div>)
    })


    // function onChangePage(pageOfItems) {
    //     // update state with new page of items
    //     this.setState({ pageOfItems: pageOfItems });
    // }

    return (
        <div>
            {/* ===================== */}
                <input type='text' className="ml-4" placeholder="Search..." onChange={e=>setSearch(e.target.value)}/>
                {list}
            {/* '=========================' */}
            {/* <div className="text-center">
                <h3 className="text-center">THÔNG BÁO KHÁC...</h3>
                <hr />
                {this.state.pageOfItems.map(item =>
                    <div key={item._id}>
                        <Link to={`/blog/post/detail/${item._id}`} key={item._id}>{item.title}</Link>
                    </div>
                )}

                <Pagination items={this.state.blogs} onChangePage={onChangePage} />
            </div> */}
        </div>
    );


}

export default SearchAppPagination;