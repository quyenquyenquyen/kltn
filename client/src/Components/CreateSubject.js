import React, { Component, useState } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker';
import { Paper } from '@material-ui/core'
import { useAlert } from "react-alert";

export default function CreateSubject(props) {


    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [tinchi, setTinchi] = useState('')
    const [percent, setPercent] = useState(0)
    const alert = useAlert();


    const onChange = (event) => {
        setSubject(event.currentTarget.value)
    }

    const onChangeTeacher = e => {
        setTeacher(e.currentTarget.value)
    }

    const onChangeTinchi = e => {
        setTinchi(e.currentTarget.value)
    }

    const onChangePercent = e => {
        setPercent(e.currentTarget.value)
    }



    const onSubmit = (event) => {
        event.preventDefault();


        const variables = {
            subjectName: subject,
            Teacher: teacher
        }

        axios.post(`/subject/create`, variables)
            .then(response => {
                if (response) {
                    alert.success('Post Created!')
                    setSubject('')
                    setTeacher('')
                    setPercent(0)
                    setTinchi('')
                    setTimeout(() => {
                        props.history.push('/listSubject')
                    }, 1000);
                } else {
                    alert.error('Error when create subject')
                }
            })

    }
    return (
        <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Tạo môn học mới</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleInputName2" style={{ float: "left" }}>Tên môn học</label>
                            <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                                value={subject}
                                onChange={onChange} />
                            <label for="exampleInputEmail2" style={{ float: "left" }}>Tên giảng viên</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                                value={teacher}
                                onChange={onChangeTeacher} />
                            <label for="exampleInputEmail2" style={{ float: "left" }}>Số tín chỉ</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="3"
                                value={tinchi}
                                onChange={onChangeTinchi} />
                            <label for="exampleInputEmail2" style={{ float: "left" }}>Phần trăm điểm</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="10%"
                                value={percent}
                                onChange={onChangePercent} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" onClick={onSubmit} data-dismiss="modal">Tạo</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* <div class="col-sm-12 col-md-12" >
                <h1>Create Subject</h1>
            </div>
            <div>

                <form class="" style={{ border: "1px solid black", width: "50%", padding: "20px", margin: "0" }}>
                    <div class="form-group">
                        <label for="exampleInputName2" style={{ float: "left" }}>Subject Name</label>
                        <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                            value={subject}
                            onChange={onChange} />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputEmail2" style={{ float: "left" }}>Teacher Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                            value={teacher}
                            onChange={onChangeTeacher} />
                    </div>

                    <br />
                    <button type="submit" class="btn btn-success" onClick={onSubmit}>Create</button>
                </form>
            </div> */}

        </div>
    )

}







