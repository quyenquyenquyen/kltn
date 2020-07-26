

import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Icon, SvgIcon } from '@material-ui/core'

export default function Home(props) {

    const [arr, setArr] = useState([])
    // const fileId = props.match.params.fileId;



    useEffect(() => {
        axios.get('/user/arr')
            .then(response => {


                setArr(response.data)

            })
    }, [])

    const onDelete = (fileId) => {
        if (window.confirm('Are u sure to delete this post')) {
            axios.delete('http://localhost:5000/up/files/' + fileId)
            console.log(fileId)

            // setTimeout(() => {
            //     props.history.push('/home')
            // }, 1000);
        }
    }
    const renderFile = arr.map((arr, index) => {
        if (arr.contentType === 'image/jpeg' || arr.contentType === 'image/png'){
            return (
                <div key={arr._id} className='card mt-2'>
                    
                    <Link to={`/file/image/detail/${arr.name}`}>
                        {arr.name}
                    </Link>

                    <form method="POST" action={`/up/files/${arr.fileId}?_method=DELETE`} >
                        <button className="fa fa-trash ml-1 btn btn-danger" >delete</button>
                    </form>
    
                </div>
            )
        }
        if (arr.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {

            return (
                <div key={arr._id} className='card mt-2'>
                    <a href={`http://localhost:5000/up/document/${arr.name}`} target="_blank">
                        {arr.name}
                    </a>
                    <form method="POST" action={`/up/files/${arr.fileId}?_method=DELETE`} >
                        <button className="fa fa-trash ml-1 btn btn-danger" >delete</button>
                    </form>
    
                </div>
            )
        }
        
    })
    return (
        <div>
            {renderFile}
        </div>
    )
}

