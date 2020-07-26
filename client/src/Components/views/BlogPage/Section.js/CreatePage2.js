import React, { Component, useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message, Input } from 'antd';
import { useAlert } from "react-alert";


const { Title } = Typography;

function CreatePage(props) {

    const [content, setContent] = useState('');
    // const [text, setText] = useState('');
    const [TitleValue, setTitleValue] = useState("")
    const [type, setType] = useState("")
    const [files, setFiles] = useState([])
    const [file, setFile] = useState(null)



    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onTypeChange = (event) => {
        setType(event.currentTarget.value)
    }

    // const onContentChange = (event) => {
    //     setContent(event.currentTarget.value)
    // }

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onSubmit = (event) => {
        event.preventDefault();



        if (TitleValue === '' | content === '') {
            alert('Vui long nhap tieu de va noi dung cho bai viet')
        }

        else {



            const formdata = new FormData()
            formdata.append('title', TitleValue)
            formdata.append('content', content)
            formdata.append('file', file)

         
            axios.post('http://pcdashboard.herokuapp.com/post/department', formdata, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMCIsImlhdCI6MTU4ODY2NjQzMCwiZXhwIjoxNjIwMjAyNDMwfQ.SYd1YktcIRdO6hN140sveHhQvVPhgvev5ALSi8b1Ez3FfV10ZXlEoM6evgm0JJQL49wfHTBUjm5tHoCTBx-JqA"
                }
            })
                .then(response => {
                    alert("success")
                })


            setTimeout(() => {
                props.history.push('/blogpage')
            }, 1000);
        }



    }

    return (

        <div >

            <div style={{ textAlign: "center" }}>

                <h3>Create Page</h3>

            </div>

            <div style={{ paddingBottom: "20px" }}>
                <Input
                    style={{ width: "100%" }}
                    placeholder={"Nhập tiêu đề"}
                    onChange={onTitleChange}
                    value={TitleValue}
                />
            </div>

            <div style={{ paddingBottom: "20px" }}>
                <form>
                    <div className="">
                        <label>SelectFile</label>
                        <input type="file" onChange={(e) => {
                            let file = e.target.files[0]
                            setFile(file)
                        }} />
                    </div>
                </form>
            </div>


            <div style={{ paddingBottom: "20px" }}>
                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onFilesChange={onFilesChange}
                    onEditorChange={onEditorChange}
                    value={content} />
            </div>
            <button onClick={onSubmit}>Post</button>

        </div>

    )
}

export default CreatePage
