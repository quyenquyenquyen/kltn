import React, { useEffect, useState, Component, useContext } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext';
import { useAlert } from "react-alert";

const { Title } = Typography


export default function PostPage(props) {

    const [post, setPost] = useState([])
    const postId = props.match.params.postId;
    const index = props.match.params.index
    const [next, setNext] = useState('')
    const alert = useAlert();

    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onDelete = () => {
        
        if (window.confirm('Are u sure to delete this post')) {
            axios.delete('/api/blog/getBlogs/' + postId)
            .then(res=>{
                if(res){
                    alert.success("delete post successfully")
                    setTimeout(() => {
                        props.history.push('/blogpage')
                    }, 1000);
                }
            })

           
        }
    }

    useEffect(() => {

        const variable = { postId: postId }

        axios.post('/api/blog/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.post)
                } else {
                    alert.error('Couldnt get post')
                }
            })
    }, [])



    if (post) {
        return (
            <div className="postPage" style={{ width: '90%', margin: '3rem auto' }}>
                <br />
                <h3 className="text-center">{post.title}</h3>
                <div style={{textAlign:"center"}}>
                {user.role === "admin" ? <button className="btn btn-outline-danger btn-sm" style={{margin:"0 5px"}} onClick={() => onDelete()}><i className="fa fa-trash"/></button> : ""}
                {user.role === "admin" ? < Link to={`/blog/post/update/${postId}`}><button style={{margin:"0 5px"}} className="btn btn-outline-secondary btn-sm"><i className="fa fa-pencil"/></button></Link> : ''}
                </div>
                <hr/>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* <Title level={3} >{post.timestamp}</Title> */}
                    {/* <h6 style={{fontWeight:'bold',fontStyle:"italic"}}>Ngày đăng: {post.timestamp}</h6> */}
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                

            </div >
        )
} else {
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
    )
}

}

