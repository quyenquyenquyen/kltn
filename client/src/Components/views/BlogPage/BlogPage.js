import React, { useEffect, useState, Component } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row, List } from 'antd';
import { Link } from 'react-router-dom'
import { Grid, Paper, withStyles, ListItem, ListItemText, Divider, Button, TextField } from "@material-ui/core";
import './BlogPage.css'
import styled from 'styled-components';



const { Title } = Typography
const { Meta } = Card;

export default class BlogPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            blogs: [],
            blogs1: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchData1()
        console.log("COMPONENTDIDMOUNT FROM BLOGPAGE")
        
    }

    componentWillUpdate(){
        console.log("COMPONENTWILLUPDATE FROM BLOGPAGE")
    }
    componentDidUpdate(){
        console.log("COMPONENTDIDUPDATE FROM BLOGPAGE")
    }


    
    fetchData = () => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    this.setState({
                        blogs: response.data.blogs
                    })
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    }

    fetchData1 = () => {
        axios.get('/api/blog1/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs1)
                    this.setState({
                        blogs1: response.data.blogs1
                    })
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    }

    compare = (a, b) => {
        let comparison = 0
        if (a._id > b._id) {
            comparison = 1;
        } else if (a._id < b._id)
            comparison = -1;
        return comparison * -1;
    }

    render() {

        const { blogs } = this.state;
        const { blogs1 } = this.state;

        // const {blogs1} = this.state;
        const listBanTinChung = blogs.sort(this.compare).slice(0, 20).map((blog, index ) => {
    
            return (
                <div key={blog._id} style={{ paddingLeft: '6px', paddingRight: '6px', marginBottom: '6px' }}>
                    <a href={`/blog/post/detail/${blog._id}/${blogs.length-1-index}`}  >  {blog.title} <a style={{ color: 'orange' }}>({blog.timestamp})</a></a>
                </div>

            )
        })
        const listBanTinGiaoVu = blogs1.sort(this.compare).slice(0, 20).map((blog1, index) => {
           
            return (
                <div key={blog1._id} style={{ paddingLeft: '6px', paddingRight: '6px', marginBottom: '6px' }}>
                    <a href={`/blog1/post/detail/${blog1._id}/${blogs1.length-1-index}`} >  {blog1.title} - {index} <a style={{ color: 'orange' }}>({blog1.timestamp})</a></a>
                </div>

            )
        })
        return (
            <div style={{ width: '100%' }}>

                <Row>

                    <Wrapper>
                        <Paper className="wrapper" elevation={6}>
                            <p style={{ marginBottom: '0px', fontSize: '1.3rem', textAlign: 'center', color: '#34349e', borderBottom: '1px solid gray' }}>Bản tin chung</p>
                            <div className="content" >
                                {listBanTinChung}
                                {/* {
                        visible2 < blogs.length &&
                        <button onClick={() => setVisible2(visible2+2)} type="button" className="load-more">Load more</button>
                        } */}
                                <Link to='/allpostbantinchung'>Xem tất cả</Link>
                            </div>
                        </Paper>


                        <Paper className="wrapper mt-4" elevation={6}>
                            <p style={{ marginBottom: '0px', fontSize: '1.3rem', textAlign: 'center', color: '#34349e', borderBottom: '1px solid gray' }}>Bản tin giáo vụ</p>
                            <div className="content" >
                                {listBanTinGiaoVu}
                                <Link to='/allpostbantingiaovu'>Xem tất cả</Link>
                            </div>
                        </Paper>
                    </Wrapper>
                </Row>
            </div>
        );
    }
}

const Wrapper = styled.nav`
.wrapper {
  overflow: auto;
  max-height: 300px;
  word-break: break-all;
  border-radius:10px;  
  border: 1px solid gray;
  width:100%;
}
.content {
  overflow-y: auto;
}

}
`

// function BlogPage() {

//     const [blogs, setBlogs] = useState([])
//     const [blogs1, setBlogs1] = useState([])

//     const [visible1, setVisible1] = useState(10)
//     const [visible2, setVisible2] = useState(10)


//     useEffect(() => {
//         axios.get('/api/blog/getBlogs')
//             .then(response => {
//                 if (response.data.success) {
//                     console.log(response.data.blogs)
//                     setBlogs(response.data.blogs)
//                 } else {
//                     alert('Couldnt get blog`s lists')
//                 }
//             })
//     }, [])

//     useEffect(() => {
//         axios.get('/api/blog1/getBlogs')
//             .then(response => {
//                 if (response.data.success) {
//                     console.log(response.data.blogs1)
//                     setBlogs1(response.data.blogs1)
//                 } else {
//                     alert('Couldnt get blog`s lists')
//                 }
//             })
//     }, [])


//     // const renderCards = blogs.map((blog, index) => {
//     //     return <Col key={index} lg={8} md={12} xs={24}>
//     //         <Card
//     //             hoverable
//     //             style={{ width: 370, marginTop: 16 }}
//     //             actions={[
//     //                 <Icon type="setting" key="setting" />,
//     //                 <Link to={`/blog/post/detail/${blog._id}`}>detail</Link>,
//     //             ]}
//     //         >
//     //             <h4 className="bold">{blog.title}</h4>
//     //             {/* <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
//     //                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//     //             </div> */}
//     //         </Card>
//     //     </Col>
//     // })


//     function compare(a, b) {
//         let comparison = 0
//         if (a._id > b._id) {
//             comparison = 1;
//         } else if (a._id < b._id)
//             comparison = -1;
//         return comparison * -1;
//     }

//     const listBanTinGiaoVu = blogs1.sort(compare).slice(0, visible1).map((blog1, index) => {
//         return (
//             <div style={{ paddingLeft: '6px', paddingRight: '6px', marginBottom: '6px' }}>
//                 <a href={`/blog1/post/detail/${blog1._id}`} >  {blog1.title}</a>
//             </div>

//         )
//     })


//     const listBanTinChung = blogs.sort(compare).slice(0, visible2).map((blog, index) => {
//         return (
//             <div style={{ paddingLeft: '6px', paddingRight: '6px', marginBottom: '6px' }}>
//                 <a href={`/blog/post/detail/${blog._id}`} >  {blog.title}</a>
//             </div>

//         )
//     })

//     return (
//         <div style={{ width: '70%', margin: '2rem auto' }}>
//             {/* <Title level={2}> Blog Lists </Title> */}
//             <Row gutter={[32, 16]}>

//                 <div style={{ width: '270px', height: '283px', border: '1px solid gray', float: 'right', borderRadius: '7px', marginBottom: '10px' }}>
//                     <p style={{ marginBottom: '0px', fontSize: '1.3rem', textAlign: 'center', color: '#34349e', borderBottom: '1px solid gray' }}>Bản tin chung</p>
//                     <div className="scrollbar" style={{ width: '268px', height: '238px', float: 'right' }}>
//                         {listBanTinChung}
//                         {/* {
//                         visible2 < blogs.length &&
//                         <button onClick={() => setVisible2(visible2+2)} type="button" className="load-more">Load more</button>
//                         } */}
//                         <Link to='/allpostbantinchung'>Xem tất cả</Link>
//                     </div>
//                 </div>





//                 <div style={{ width: '270px', height: '283px', border: '1px solid gray', float: 'right', borderRadius: '7px', marginTop: '20px' }}>
//                     <p style={{ marginBottom: '0px', fontSize: '1.3rem', textAlign: 'center', color: '#34349e', borderBottom: '1px solid gray' }}>Bản tin giáo vụ</p>
//                     <div className="scrollbar" style={{ width: '268px', height: '238px', float: 'right' }}>
//                         {listBanTinGiaoVu}
//                         {/* {
//                         visible1 < blogs1.length &&
//                         <button onClick={() => setVisible1(visible1+2)} type="button" className="load-more">Load more</button>
//                         } */}
//                         <Link to='/allpostbantingiaovu'>Xem tất cả</Link>
//                     </div>



//                 </div>

//             </Row>
//         </div>
//     )
// }

// export default BlogPage
