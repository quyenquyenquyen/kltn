import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import DateTimePicker from 'react-datetime-picker'
import Countdown from 'react-countdown'
import $ from 'jquery'
import { useAlert } from "react-alert";

export default function ListExercise(props) {

    const id = props.match.params.id
    const [subject, setSubject] = useState([])

    const [description, setDescription] = useState('')
    const [exerciseName, setExerciseName] = useState('')
    const [week, setWeek] = useState('')
    const [isDisplay, setIsDisplay] = useState(false)
    const [file, setFile] = useState(null)
    const [length, setLength] = useState(0)
    const [userArr, setUserArr] = useState([])

    const [date, setDate] = useState(new Date())
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    const alert = useAlert();

    useEffect(() => {

        axios.get(`/subject/${id}`)
            .then(response => {
                setSubject(response.data.exerciseArr)
            })
        axios.get(`/subject/${id}`)
            .then(response => {
                setUserArr(response.data.userArr)
                console.log("userarr", response.data.userArr)
            })
    }, [])

    const onChangeDate = date => {
        setDate(date)
    }

    const onChangeDescription = (event) => {
        setDescription(event.currentTarget.value)
    }

    const onChangeExerciseName = e => {
        setExerciseName(e.currentTarget.value)
    }

    const IsDisplay = () => {
        setIsDisplay(!isDisplay)
    }

    const handleChange = (e) => {
        setWeek(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('week', week)
        formdata.append('description', description)
        formdata.append('exerciseName', exerciseName)
        formdata.append('deadline', date)

        const variable = {
            week,
            description: description,
            exerciseName: exerciseName,
            deadline: date
        }

        if (length !== 0) {

            if (week === '') {
                alert.error("Invalid week")
            } else {
                axios.post(`/up/upload/${id}`, formdata)
                    .then(response => {
                        if (response) {
                            alert.success("Post successs")
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 1000);
                        } else {
                            alert.error("Error when post file")
                        }
                    })
            }

        } else {

            if (week === '') {
                alert.error("Invalid week")
            } else {
                axios.put(`/subject/putExercise/${id}`, variable)
                    .then(response => {
                        if (response) {
                            alert.success('Post Created!')
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 1000);
                        } else {
                            alert.error('Error when create subject')
                        }
                    })
            }


        }
    }

    const onUpdate = (event) => {
        event.preventDefault();

        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('week', week)
        formdata.append('description', description)
        formdata.append('exerciseName', exerciseName)
        formdata.append('deadline', date)
        formdata.append('user', user.username)

        const variables = {
            week: week,
            description: description,
            exerciseName: exerciseName,
            deadline: date,
            user: user.username
        }
        if (length !== 0 && exerciseName !== '' && week !== '') {
            axios.put(`/up/upload/edit/${id}/${week}`, formdata)
                .then(response => {
                    if (response) {
                        alert.success("Post success")
                        setTimeout(() => {
                            window.location.reload(true)
                        }, 1000);
                    } else {
                        alert.error("Error when post file")
                    }
                })
        } else {
            if (exerciseName === '' || week === '') {
                alert.error("vui long nhap du thong tin")
            } else {
                axios.put(`/subject/updateExercise/${id}/${week}`, variables)
                    .then(response => {
                        if (response) {
                            alert.success('Post Created!')
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 1000);
                        } else {
                            alert.error('Error when create subject')
                        }
                    })
            }
        }
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div>Time up! </div>;
        } else {
            return (
                <div style={{ color: "red" }}>
                    <h6>{days} Day {hours} Hour {minutes} minute {seconds} Second</h6>
                </div>
            )
        }
    }
    const renderExercise = subject.map((sub, index) => {

        return (
            <tbody key={index}>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/exercise/${id}/${sub.week}/${sub.exerciseName}/${sub.deadline}/${sub.name}`}>Bai tap {sub.week}</Link></td>
                    <td>{sub.exerciseName}</td>
                    {user.role==="admin"?<td><Link to={`/listfile/${sub.week}/${id}`}><i className="fa fa-list" /></Link></td>:''}
                    {user.role === "admin" ?
                        <td>
                            <button style={{ margin: "0 2px" }} className="btn btn-outline-danger btn-sm" onClick={() => {
                                axios.put(`/subject/delete/${id}/${sub.week}`)
                                    .then(response => {
                                        if (response) {
                                            alert.success("delete success")
                                            setTimeout(() => {
                                                window.location.reload(true)
                                            }, 1000);
                                        } else {
                                            alert.error('no')
                                        }
                                    })
                            }}><i className="fa fa-trash" />delete</button>

                            <button onClick={() => {
                                setWeek(sub.week)
                                setDescription(sub.description)
                                setExerciseName(sub.exerciseName)
                            }
                            }
                                style={{ margin: "0 2px" }} className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#exampleModal1"><i className="fa fa-pencil" />edit
                                {/* <Link to={`/edit/exercise/${id}/${sub.week}/${sub.exerciseName}/${sub.deadline}/${sub.name}/${sub.description}`}><i className="fa fa-pencil" />edit</Link> */}
                            </button>

                            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>EDIT EXERCISE </h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div>
                                                <button className="btn btn-primary" onClick={IsDisplay}>
                                                    {isDisplay ? 'cancel' : 'add file'}
                                                </button>
                                            </div>
                                            <br />
                                            <div>
                                                <form >
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
                                                    <div class="container">


                                                        <form class="">
                                                            <div class="form-group">
                                                                <select class="custom-select"
                                                                    value={week}>
                                                                    <option selected></option>
                                                                    <option value={week}>{week}</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="exampleInputName2" style={{ float: "left" }}>description</label>
                                                                <input type="text" class="form-control" id="exampleInputName2" placeholder="Nop bai tap bang file word"
                                                                    value={description}
                                                                    onChange={onChangeDescription} />
                                                            </div>

                                                            <br />
                                                            <div class="form-group">
                                                                <label for="exampleInputEmail2" style={{ float: "left" }}>Exercise Name</label>
                                                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="ReactJS" required
                                                                    value={exerciseName}
                                                                    onChange={onChangeExerciseName} />
                                                            </div>




                                                            <h4 style={{ color: "red" }}>Deadline for this exercise</h4>
                                                            <div>
                                                                <DateTimePicker
                                                                    onChange={onChangeDate}
                                                                    value={date}
                                                                />
                                                            </div>

                                                            <br />

                                                        </form>

                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                        <div class="modal-footer">
                                            {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                            <button type="button" class="btn btn-primary" style={{ background: "#2a2a72" }} data-dismiss="modal" onClick={onUpdate}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        : <td>
                            <Countdown
                                date={new Date(sub.deadline)}
                                renderer={renderer}
                            />
                        </td>
                    }

                </tr>
            </tbody>
        )
    })

    const rendertableTeacher =
        <div class="container table-responsive" style={{ padding: "8px" }}>
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Week</th>
                        <th scope="col">Exercise</th>
                        <th scope="col">Exercise name</th>
                        <th scope="col">List exercise</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {renderExercise}
            </table>
        </div>

    const rendertable = userArr.map(userArr => {
        if ((userArr.username === user.username && user.role === "user" && userArr.subId === id)) {
            return (
                <div class="container table-responsive py-5">
                    <table class="table table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Week</th>
                                <th scope="col">Exercise</th>
                                <th scope="col">Description</th>
                                <th scope="col">Deadline</th>

                            </tr>
                        </thead>
                        {renderExercise}
                    </table>
                </div>
            )
        }
    })


    const renderButtonCreateNewEx =
        <div>
            <div>
                <button style={{ float: "right", margin: "0px 15px", borderRadius: "10px" }} data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" onClick={() => {
                    setWeek('')
                    setDescription('')
                    setExerciseName('')
                }}><i className="fa fa-plus" />&nbsp;Create new exercise</button>

                <form onSubmit={handleSubmit} class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>CREATE NEW EXERCISE</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <button type="button" className="btn btn-primary" onClick={IsDisplay}>
                                        {isDisplay ? 'cancel' : 'add file'}
                                    </button>
                                </div>
                                <br />
                                <div>
                                    <div >
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
                                        <div class="container">
                                            <div >
                                                <div class="form-group">
                                                    <select type="text" class="custom-select" required
                                                        value={week}
                                                        onChange={handleChange}>
                                                        <option selected>Choose...</option>
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
                                                    <label for="exampleInputName2" style={{ float: "left" }}>description</label>
                                                    <input type="text" class="form-control" placeholder="Nop bai tap bang file word"
                                                        value={description}
                                                        onChange={onChangeDescription} />
                                                </div>

                                                <br />
                                                <div class="form-group">
                                                    <label for="exampleInputEmail2" style={{ float: "left" }}>Exercise Name</label>
                                                    <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Bai tap a"
                                                        value={exerciseName}
                                                        onChange={onChangeExerciseName}
                                                        required />
                                                </div>
                                                <h4 style={{ color: "red" }}>Deadline for this exercise</h4>
                                                <div>
                                                    <DateTimePicker
                                                        onChange={onChangeDate}
                                                        value={date}
                                                    />
                                                </div>

                                                <br />

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary" style={{ background: "#2a2a72" }}>Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    return (
        <div style={{ padding: "0 10%", textAlign: "center" }}>
            <h3 style={{ color: "red", fontWeight: "bold", color: "#2a2a72" }}>List Exercise</h3>

            <hr />

            {user.role === "admin" ? renderButtonCreateNewEx : ''}

            {subject.length === 0
                ? 'No exercise'
                : <div>{rendertable}</div>}

            {user.role === 'admin' ? <div>{rendertableTeacher}</div> : ''}

        </div>
    )
}