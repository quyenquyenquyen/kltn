import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message, Input } from 'antd';
import { useAlert } from "react-alert";


const { Title } = Typography;

function CreatePage1(props) {
    const postId = props.match.params.postId;
    const alert = useAlert();

    const [content, setContent] = useState('');
    // const [text, setText] = useState('');
    const [TitleValue, setTitleValue] = useState("")
    const [type, setType] = useState("")
    const [files, setFiles] = useState([])
    const [user, setUser] = useState('')


    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onTypeChange = (event) => {
        setType(event.currentTarget.value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    useEffect(() => {
        axios.get('user/authenticated')
            .then(response => {
                setUser(response.data.user)
            })
    }, [])


    const onSubmit = (event) => {
        event.preventDefault();

        if (TitleValue === '' | content === '') {
            alert('Vui long nhap tieu de va noi dung cho bai viet')
        }

        else {
            const variables = {
                content: content,
                title: TitleValue,
                type: "bantingiaovu",
                username: user.username
            }

            axios.post(`http://localhost:5000/api/blog1/createPost`, variables)
                .then(response => {

                    if (response) {
                        alert.success("Post Created!");
                    } else {
                        alert.error('Couldnt get blog`s lists')
                    }
                })
            setTimeout(() => {
                props.history.push('/blogpage')
            }, 1000);
        }



    }



    return (

        <div >

            <div style={{ textAlign: "center" }}>

                <h3>Bản tin giáo vụ</h3>

            </div>

            <div style={{ paddingBottom: "20px" }}>
                <Input
                    style={{ width: "100%" }}
                    placeholder={"Nhập tiêu đề"}
                    onChange={onTitleChange}
                    value={TitleValue}
                />
            </div>



            <QuillEditor
                placeholder={"Start Posting Something"}
                onFilesChange={onFilesChange}
                onEditorChange={onEditorChange}
                value={content} />

            <div style={{ textAlign: "right" }}><button className="btn btn-primary" onClick={onSubmit}>Post</button></div>

        </div>

    )
}

export default CreatePage1
