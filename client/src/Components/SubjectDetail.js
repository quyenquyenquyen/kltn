import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Test from './Test'
import Countdown from 'react-countdown'
import DateTimePicker from 'react-datetime-picker';
import $ from 'jquery'
import { Paper } from '@material-ui/core'

import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { ProgressBar } from 'react-bootstrap'
import { useAlert } from "react-alert";
import UploadFile from './UploadFile'


export default function SubjectDetail(props) {

    const id = props.match.params.id
    const exerciseName = props.match.params.exerciseName
    const week = props.match.params.week
    const deadline = props.match.params.deadline
    const name = props.match.params.name
    const alert = useAlert();

    const [subject, setSubject] = useState([])
    const [subjectName, setSubjectName] = useState('')
    const [userName, setUserName] = useState('')
    const [files, setFiles] = useState([])
    const [filename, setFilename] = useState([])
    const [point, setPoint] = useState()
    const [userList, setUserList] = useState([])
    const [file, setFile] = useState([])
    const [percentage, setPercentage] = useState(0)

    const [submit, setSubmit] = useState(0)

    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    // const [week, setWeek] = useState('')

    //DATE TIME DEADLINE

    const [time, setTime] = useState([])


    const [date1, setDate1] = useState(new Date())
    useEffect(() => {

        axios.get(`/up/files/${name}`)
            .then(response => {
                setFile(response.data)
            })

        axios.get(`/subject/subArr/${id}`)
            .then(response => {
                setSubject(response.data)
            })

        axios.get(`/subject/${id}`)
            .then(response => {
                setSubjectName(response.data)
                console.log('SUBNAME', response.data)
            })
        axios.get(`/user/authenticated/`)
            .then(response => {
                setUserName(response.data.user)

            })

        axios.get(`/user/arr`)
            .then(response => {
                setFilename(response.data)
            })
        axios.get(`/subject/${id}`)
            .then(response => {
                setTime(response.data)
                // setSubArr(response.data.subjectArr)

            })

        axios.get(`/subject/${id}`)
            .then(response => {
                setUserList(response.data.userArr)
                console.log("USERARR", response.data.userArr)
            })

    }, [])

    const onChangeDate = date1 => {
        setDate1(date1)
    }

    const onPointChange = (event) => {
        setPoint(event.currentTarget.value)
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor(loaded * 100 / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`)

                if (percent < 100) {
                    setPercentage(percent)
                }
            }
        }

        axios.post(`/up/upload/${subjectName.subjectName}/${week}`, data, options)
            .then(response => {
                if (response) {
                    setPercentage((100), () => {
                        setTimeout(() => {
                            setPercentage(0)
                        }, 1000)
                    })
                    window.location.reload(true)
                    setFiles(response.data)

                } else {
                    alert.error("Error when post file")
                }
            })


    }


   

    const onSetSubject = () => {
        const varriable = {
            name: "",
            fileId: "",
            subjectName: subjectName.subjectName,
        }


        axios.put(`/user/resetarr/${subjectName.subjectName}`, varriable)
            .then(response => {
                if (response) {
                    alert.success("Put success")
                } else {
                    alert.error("error when put")
                }
            })

    }


    const renderFileName = filename.map((file, index) => {
        if (file.subjectName === subjectName.subjectName && file.name !== "")
            return (
                <div>
                    <h3 style={{ color: "red" }}>{file.name}</h3>
                    <form method="POST" action={`/up/files/${file.fileId}/${id}?_method=DELETE`} >
                        <button className="fa fa-trash  btn btn-danger" onClick={onSetSubject}>delete</button>
                    </form>
                </div>
            )
    })





    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            const varriable = {
                name: "",
                fileId: "",
                subjectName: subjectName.subjectName,
            }

            axios.put(`/user/resetarr/${subjectName.subjectName}`, varriable)

            // Render a completed state
            return <div> </div>;
        } else {
            // Render a countdown

            return (
                <div>

                    <h2 style={{color:"#2a2a72",fontWeight:"bold"}}>{days} Day {hours} Hour {minutes} minute {seconds} Second</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="custom-file mb-3">
                            <input type="file" name="file" id="inputFile" className="form-control-file text-danger font-weight-bold" />
                            {percentage > 0 && <ProgressBar now={percentage} label={`${percentage}%`} />}
                            <button type="submit" value="Submit" className="btn btn-primary btn-block" >Submit</button>
                        </div>
                    </form>
                    {/* {renderFileUp} */}
                    {renderFileName}

                    <br />
                </div>
            )
        }
    }

    const dates = new Date(deadline); // 1 Jan 2011, 00:00:00


    const renderSubjectDetail = subject.map((subject, index) => {
        if (subject.week === week && subject.user === userName.username && userName.role === "user")
            return (
                <div key={subject._id}>
                    <div className="card mt-3">
                        <div className="row">
                            <div className="col-10">
                                <div>{subject.name}</div>
                                <div>{subject.point}</div>
                            </div>
                        </div>

                    </div>
                </div>
            )
    })



    const renderbody = subject.map((subject, index) => {
        if (subject.week === week && (subject.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || subject.contentType === "application/pdf")) {

            return (
                <tbody key={index}>
                    <tr>
                        <td>{subject.user}</td>
                        <td>
                            <a href={subject.contentType === 'application/pdf' ? `http://localhost:5000/up/pdf/${subject.name}` : `http://localhost:5000/up/document/${subject.name}`} target="_blank">{subject.name}</a>
                        </td>
                        <td>{subject.timestamp}</td>
                        <td>{subject.point}</td>
                        <td>
                            <input
                                style={{ width: "80px" }}
                                placeholder="Set point"
                                onChange={onPointChange}
                            />
                            <button className="btn btn-dark" onClick={() => {
                                axios.put(`/subject/put/${id}/${subject.fileId}`, {
                                    name: subject.name,
                                    contentType: subject.contentType,
                                    fileId: subject.fileId,
                                    timestamp: subject.timestamp,
                                    user: subject.user,
                                    point: point,
                                    week: week
                                }).then(response => {
                                    if (response) {
                                        alert.success("put score success")
                                    }
                                })
                            }}>ok</button>
                        </td>
                    </tr>
                </tbody>

            )
        }
    })

    const renderMax = userList.map(userlist => {
        if ((userlist.subId === id && userName.role === "user" && userlist.username === user.username)) {
            return (
                <div>
                    <div style={{ textAlign: "center" }}>


                        <div>
                            <h2>De bai tuần {week}:&nbsp;{exerciseName}</h2>
                            {file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                ?
                                <div className="card mt-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div><a href={`http://localhost:5000/up/document/${file.filename}`} target="_blank"><a style={{ color: "red" }}>Slide tuan {week}</a> {file.filename}</a></div>
                                        </div>
                                    </div>
                                </div>
                                : ''
                            }


                            <div style={{ padding:"10px" }}>

                                <Countdown
                                    date={new Date(Date.now()+5000)}

                                    // Date.now()+5000

                                    renderer={renderer}
                                />
                                <br /><br />
                                <h4 style={{ color: "red" }}>Danh sach bai tap cua sinh vien A(student)</h4>

                                {renderSubjectDetail}
                            </div>

                            <br /><br />

                        </div>
                    </div>
                </div>
            )

        }
    })



    return (
        <div style={{ paddingLeft: "150px", paddingRight: "150px", textAlign: "center" }}>
            <h2 >  {subjectName.subjectName}</h2>

            <div>
                <h6 style={{ float: "right" }}>Teacher: {time.Teacher}</h6>
            </div>
            <br />
            <hr />
            {user.role === 'admin' ? <h2>De bai tuan {week}:{exerciseName}</h2> : ''}
            {renderMax}

            {userName.role === "admin" ?
                <Paper elevation={6}>
                    <div style={{ textAlign: "center" }}>

                        <div>


                            <div style={{ paddingTop: "40px", paddingBottom: "40px", paddingLeft: "10px", paddingBottom: "10px" }}>
                                <Countdown
                                    date={new Date(dates)}

                                // Date.now()+5000

                                // renderer={renderer}
                                />
                                <br /><br />

                            </div>
                        </div>
                    </div>


                    <h4 style={{ color: "red" }}>AllPostoFStudent(teacher,table)</h4>
                    <div class="bs-example container" data-example-id="striped-table">
                        <table class="table table-striped table-bordered table-hover">
                            <caption>Bootstrap Table CSS Demo</caption>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>File Name</th>
                                    <th>Time</th>
                                    <th>point</th>
                                    <th>Set point</th>
                                </tr>
                            </thead>
                            {renderbody}

                        </table>
                    </div>
                </Paper> : ''}
            <br /><br /><br />
        </div>

    )

}

const Wrapper = styled.div`
input[type='file]{
    display:none
}
`