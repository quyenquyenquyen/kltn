import React, { Component, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import $ from 'jquery'
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

export default function EditExercise(props) {

    const id = props.match.params.id
    const exerciseName = props.match.params.exerciseName
    const week = props.match.params.week
    const deadline = props.match.params.deadline
    const name = props.match.params.name
    const description = props.match.params.des

    const [subject, setSubject] = useState(description)
    const [teacher, setTeacher] = useState(exerciseName)
    // const [week, setWeek] = useState('')
    const [isDisplay, setIsDisplay] = useState(false)
    const [file, setFile] = useState(null)
    const [length,setLength] = useState(0)

    //DATE TIME DEADLINE
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const [date1, setDate1] = useState(new Date())
    const [date2, setDate2] = useState(new Date())

    useEffect(() => {
        $('#myFile').bind('change', function () {

            //this.files[0].size gets the size of your file.
            setLength(this.files[0].size)
            alert(length)

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
        formdata.append('user', user.username)

        const variables = {
            week:week,
            description: subject,
            exerciseName: teacher,
            deadline:date1,
            user:user.username
        }
        if (length!==0) {
            axios.put(`/up/upload/edit/${id}/${week}`, formdata)
                .then(response => {
                    if (response) {
                        alert("Post success")

                    } else {
                        alert("Error when post file")
                    }
                })
        } else {
            axios.put(`/subject/updateExercise/${id}/${week}`,variables)
                .then(response => {
                    if (response) {
                        alert('Post Created!')
                    } else {
                        alert('Error when create subject')
                    }
                })
        }
    }

    const IsDisplay = () => {
        setIsDisplay(!isDisplay)
    }


    return (
        <>
            <div class="col-sm-12 col-md-12 text-center" >
                <h1>Edit Exercise</h1>
            </div>



            <button className="btn btn-primary" onClick={IsDisplay}>
                {(isDisplay) ? 'cancel' : 'add file'}
            </button>
            <div>
                <form onSubmit={handleSubmit} >
                    {isDisplay ?
                        <div className="custom-file mb-3">
                            <input type="file" name="file" id="myFile"
                                onChange={(e) => {
                                    let file = e.target.files[0]
                                    setFile(file)
                                    setLength(e.target.files[0].length)

                                }} />
                        </div>
                        : ''}

                    <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>

                        <form class="">
                            <div class="form-group">
                                <select class="custom-select"
                                    value={week}>
                                    <option selected>{week}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputName2" style={{ float: "left" }}>description</label>
                                <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                                    value={subject}
                                    onChange={onChange} />
                            </div>


                            <br />
                            <div class="form-group">
                                <label for="exampleInputEmail2" style={{ float: "left" }}>Exercise Name</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                                    onChange={onChangeTeacher}
                                    value={teacher} />
                            </div>

                            <h4 style={{ color: "red" }}>Deadline for this exercise</h4>

                            <div>
                                <DateTimePicker
                                    onChange={onChangeDate}
                                    value={date1}
                                />
                            </div>

                            <br />

                        </form>
                    </div>
                    <button type="submit" value="Submit" className="btn btn-primary btn-block" >Submit</button><br/>
                </form>
            </div>


        </>
    )

}

