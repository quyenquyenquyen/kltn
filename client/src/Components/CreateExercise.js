import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import $ from 'jquery'

export default function CreateExercise(props) {

    const id = props.match.params.id

    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [week, setWeek] = useState('')
    const [isDisplay, setIsDisplay] = useState(false)
    const [file, setFile] = useState(null)

    //DATE TIME DEADLINE


    const [date1, setDate1] = useState(new Date())
    const [date2, setDate2] = useState(new Date())

    useEffect(() => {
        $('#myFile').bind('change', function () {

            //this.files[0].size gets the size of your file.
            alert(this.files[0].size);

        });
    }, [])

    const onChangeDate = date1 => {
        setDate1(date1)
        alert(date1)
    }

    const onChangeDeadlineRes = date2 => {
        setDate2(date2)
        alert(date2)
    }


    const onChange = (event) => {
        setSubject(event.currentTarget.value)
    }

    const onChangeTeacher = e => {
        setTeacher(e.currentTarget.value)
    }




    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('week', week)
        formdata.append('description', subject)
        formdata.append('exerciseName', teacher)
        formdata.append('deadline', date1)

        const variable = {
            week,
            description:subject,
            exerciseName:teacher,
            deadline:date1
        }

        if (isDisplay) {
            if (subject === '' || teacher === '' || week === '') {
                alert("Vui long nhap du thong tin")
            } else {
                axios.post(`/up/upload/${id}`, formdata)
                    .then(response => {
                        if (response) {
                            alert("Post success")

                        } else {
                            alert("Error when post file")
                        }
                    })
            }
        } else {
            if (subject === '' || teacher === '' || week === '') {
                alert("Vui long nhap du thong tin")
            } else {
                axios.put(`/subject/putExercise/${id}`, variable)
                    .then(response => {
                        if (response) {
                            alert('Post Created!')
                        } else {
                            alert('Error when create subject')
                        }
                    })
            }

        }
    }

    const IsDisplay = () => {
        setIsDisplay(!isDisplay)
    }

    const handleChange = (e) => {
        setWeek(e.target.value);
    }

    return (
        <>
            <div class="col-sm-12 col-md-12 text-center" >
                <h1>Tạo bài tập</h1>
            </div>



            <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>


                <div>
                    <button className="btn btn-primary" onClick={IsDisplay}>
                        {isDisplay ? 'cancel' : 'add file'}
                    </button>
                </div>
                <br />
                <div>
                    <form onSubmit={handleSubmit} >
                        {isDisplay ?
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="myFile"
                                    onChange={(e) => {
                                        let file = e.target.files[0]
                                        setFile(file)
                                    }} />
                            </div>
                            : ''}
                        <div class="container">


                            <form class="">
                                <div class="form-group">
                                    <select class="custom-select"
                                        value={week}
                                        onChange={handleChange}>
                                        <option selected>Chọn...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputName2" style={{ float: "left" }}>Mô tả</label>
                                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                                        value={subject}
                                        onChange={onChange} />
                                </div>

                                <br />
                                <div class="form-group">
                                    <label for="exampleInputEmail2" style={{ float: "left" }}>Tên bài tập</label>
                                    <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                                        value={teacher}
                                        onChange={onChangeTeacher} />
                                </div>




                                <h4 style={{ color: "red" }}>Hạn nộp bài tập</h4>
                                <div>
                                    <DateTimePicker
                                        onChange={onChangeDate}
                                        value={date1}
                                    />

                                    {/* <h4>change deadline regis</h4> */}
                                    {/* <DateTimePicker
                            onChange={onChangeDeadlineRes}
                            value={date2}
                        /> */}
                                </div>

                                <br />

                            </form>

                        </div>

                        <button type="submit" value="Submit" className="btn btn-primary btn-block" >Tạo</button>
                    </form>
                </div>



            </div>
        </>
    )

}

