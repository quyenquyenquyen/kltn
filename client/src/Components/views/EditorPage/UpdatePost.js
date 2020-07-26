import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import QuillEditor from '../../editor/QuillEditor';
import { Typography, Button, Form, message, Input } from 'antd';
import { useAlert } from "react-alert";

const { Title } = Typography;

function UpdatePost(props) {
    const postId = props.match.params.postId;

    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [TitleValue, setTitleValue] = useState("")
    const [files, setFiles] = useState([])

    const alert = useAlert();

    useEffect(() => {
        fetchData()
    }, [])

    const onEditorChange = (value) => {
        setContent(value)
    }

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const fetchData = () => {
        axios.get(`http://localhost:5000/api/blog/getBlogs/${postId}`)
            .then(response => {
                if (response.data) {
                    setContent(response.data.content)
                    setTitleValue(response.data.title)
                    setType(response.data.type)
                } else {
                    alert.error('Couldnt get blog`s lists')
                }
            })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (TitleValue !== '') {
            const variables = {
                content: content,
                title: TitleValue
            }

            axios.put(`http://localhost:5000/api/blog/getBlogs/${postId}`, variables)
                .then(response => {
                    if (response) {
                        alert.success('Update post created!');
                        setTimeout(() => {
                            props.history.push('/blogpage')
                        }, 2000);
                    }
                })
        } else {
            alert.error('Vui long nhap tieu de cho bai viet')
        }
    }

    return (

        <div>
            <div style={{ textAlign: "center" }}>

                <h3 style={{ fontWeight: "bold", color: "#2a2a72" }}>Edit post</h3>

            </div>


            <div style={{ paddingBottom: "20px" }}>
                <Input
                    style={{ width: "100%" }}
                    placeholder={"Nhập tiêu đề"}
                    onChange={onTitleChange}
                    value={TitleValue}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <select class="custom-select"
                    value={type}>
                    <option selected>Type</option>
                    <option value={type}>{type}</option>
                </select>
            </div>


            <QuillEditor
                placeholder={"Start Posting Something"}
                onFilesChange={onFilesChange}
                onEditorChange={onEditorChange}
                value={content} />
            <div style={{ textAlign: "right" }}>
                <button className="btn btn-primary" onClick={onSubmit}>update</button>
            </div>

        </div >

    )
}

export default UpdatePost
