import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'
import { useAlert } from "react-alert";
import { AuthContext } from '../Context/AuthContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function ListSubject(props) {

    const [list, setList] = useState([])
    const [subArr, setSubArr] = useState([])
    const [listUser, setListUser] = useState([])

    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [percent1, setPercent1] = useState('')
    const [percent2, setPercent2] = useState('')
    const [percent3, setPercent3] = useState('')
    const [tinchi, setTinchi] = useState('')
    const [MMH, setMMH] = useState('')
    const [lop, setClass] = useState('')
    const [listStudent, setListStudent] = useState([])
    const [subjectId, setSubjectId] = useState('')
    const [idWhenUpdate, setIdWhenUpdate] = useState('')
    const [total, setTotal] = useState(0)
    const alert = useAlert();

    var total1 = 0
    let sum = a => a.reduce((x, y) => x + y)
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    useEffect(() => {


        axios.get('/subject')
            .then(response => {
                setList(response.data)
            })

        axios.get('/listUser')
            .then(res => {
                setListUser(res.data.filter(x => x.mssv === user.username))
                console.log('listuser', res.data.filter(x => x.mssv === user.username))
            })
    }, [])


    const onChange = (event) => {
        setSubject(event.currentTarget.value)
    }

    const onChangeTeacher = e => {
        setTeacher(e.currentTarget.value)
    }

    const onChangeTinchi = e => {
        setTinchi(e.currentTarget.value)
    }

    const onChangePercent1 = e => {
        setPercent1(e.currentTarget.value)
    }
    const onChangePercent2 = e => {
        setPercent2(e.currentTarget.value)
    }
    const onChangePercent3 = e => {
        setPercent3(e.currentTarget.value)
    }

    const onChangeMMH = e => {
        setMMH(e.currentTarget.value)
    }

    const onChangeClass = e => {
        setClass(e.currentTarget.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            subjectName: subject,
            Teacher: teacher,
            tinchi: tinchi,
            percent1: percent1,
            percent2: percent2,
            percent3: percent3,
            MMH: MMH,
            class: lop
        }
        axios.post(`/subject/create`, variables)
            .then(response => {
                if (response) {
                    alert.success('Post Created!')
                    setSubject('')
                    setTeacher('')
                    setPercent1(0)
                    setPercent2(0)
                    setPercent3(0)
                    setTinchi('')
                    setClass('')
                    setMMH('')
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 1000);
                } else {
                    alert.error('Error when create subject')
                }
            })

    }
    const onEditSubmit = (event) => {
        event.preventDefault();

        const variables = {
            subjectName: subject,
            Teacher: teacher,
            tinchi: tinchi,
            percent1: percent1,
            percent2: percent2,
            percent3: percent3,
            MMH: MMH,
            class: lop
        }
        axios.put(`/subject/editsubject/${idWhenUpdate}`, variables)
            .then(response => {
                if (response) {
                    alert.success('Update successfully!')
                    setSubject('')
                    setTeacher('')
                    setPercent1(0)
                    setPercent2(0)
                    setPercent3(0)
                    setTinchi('')
                    setClass('')
                    setMMH('')
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 1000);
                } else {
                    alert.error('Error when edit subject')
                }
            })

    }


    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div>Timeup! Can't register this!</div>;
        } else {
            return (
                <div>
                    <h6>{days} ngày {hours} giờ {minutes} phút {seconds} giây</h6>
                    <br />
                </div>
            )


        }
    }


    const renderbody = list.map((list, index) => {
        return (
            <tbody key={index}>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{list.MMH}</th>
                    <td><Link to={`/listExercise/${list._id}`}>{list.subjectName}</Link><br />{list.Teacher}</td>

                    <td>
                        <div>So tin chi: {list.tinchi}</div>
                        <div>GK:{list.percent1}% - CK:{list.percent2}% - BT:{list.percent3}%</div>
                    </td>
                    <td>{list.class}</td>
                    {user.role === "admin"
                        ? <td>
                            <button style={{ margin: "0 2px" }} className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    axios.delete(`/subject/${list.subjectName}`)
                                        .then(response => {
                                            alert.success('Delete subject success!')
                                            setTimeout(() => {
                                                window.location.reload(true)
                                            }, 1000);
                                        })
                                }}
                            ><i className="fa fa-trash" />delete</button>
                            <button
                                style={{ margin: "0 2px" }}
                                className="btn btn-outline-secondary btn-sm"
                                data-toggle="modal"
                                data-target="#exampleModal2"
                                onClick={() => {
                                    setMMH(list.MMH)
                                    setSubject(list.subjectName)
                                    setTeacher(list.Teacher)
                                    setTinchi(list.tinchi)
                                    setClass(list.class)
                                    setPercent1(list.percent1)
                                    setPercent2(list.percent2)
                                    setPercent3(list.percent3)
                                    setIdWhenUpdate(list._id)
                                }}>
                                <i className="fa fa-pencil" />Sửa
                                </button>
                        </td> : ''}

                    <td>


                        {(user.role === "user") ?
                            <button type="button" className='btn btn-primary'
                                onClick={() => {

                                    axios.get(`/subject/getone/${list._id}`)
                                        .then(res => {
                                            if (res.data.length === 0) {
                                                axios.put(`/subject/putuser/${list._id}/${list.subjectName}`)
                                                    .then(res => {
                                                        if (res) {
                                                            alert.success('put success')
                                                        }
                                                    })
                                            } else {
                                                alert.error("You're registered")
                                            }
                                        })


                                }
                                }
                            >
                                register
                            </button>
                            : <div>
                                <button className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#exampleModal1"
                                    onClick={() => {
                                        setSubjectId(list._id)
                                        axios.get('/listUser')
                                            .then(response => {
                                                setListStudent(response.data)
                                            })
                                        axios.get(`/subject/${list._id}`)
                                            .then(response => {
                                                setSubArr(response.data.subjectArr)
                                                response.data.exerciseArr.map(exercise => {
                                                    total1 = Number(exercise.week)
                                                })
                                                setTotal(total1)
                                            })

                                    }}><i className="fa fa-list" /></button>
                            </div>
                        }


                    </td>
                </tr>

            </tbody>



        )
    })

    const renderlistsubject = list.map((list, index) => {
        return (
            <tbody key={index}>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{list.MMH}</th>
                    <td><Link to={`/listExercise/${list._id}`}>{list.subjectName}</Link><br />{list.Teacher}</td>

                    <td>
                        <div>So tin chi: {list.tinchi}</div>
                        <div>GK:{list.percent1}% - CK:{list.percent2}% - BT:{list.percent3}%</div>
                    </td>
                    <td>{list.class}</td>
                    {user.role === "admin"
                        ? <td>
                            <button style={{ margin: "0 2px" }} className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    axios.delete(`/subject/${list.subjectName}`)
                                        .then(response => {
                                            alert.success('Delete subject success!')
                                            setTimeout(() => {
                                                window.location.reload(true)
                                            }, 1000);
                                        })
                                }}
                            ><i className="fa fa-trash" />Xóa</button>
                            <button
                                style={{ margin: "0 2px" }}
                                className="btn btn-outline-secondary btn-sm"
                                data-toggle="modal"
                                data-target="#exampleModal2"
                                onClick={() => {
                                    setMMH(list.MMH)
                                    setSubject(list.subjectName)
                                    setTeacher(list.Teacher)
                                    setTinchi(list.tinchi)
                                    setClass(list.class)
                                    setPercent1(list.percent1)
                                    setPercent2(list.percent2)
                                    setPercent3(list.percent3)
                                    setIdWhenUpdate(list._id)
                                }}>
                                <i className="fa fa-pencil" />Sửa
                                        </button>
                        </td> : ''}

                    <td>


                        {(user.role === "user") ?

                            (listUser.filter(x => x.subId === list._id).length !== 0
                                ? <span class="badge badge-danger">Đã đăng kí</span>
                                : <button
                                    className="btn-sm btn-primary"
                                    onClick={() => {
                                        if (window.confirm('Are you sure to register, can not change it later?')) {
                                            axios.put(`/subject/putuser/${list._id}/${list.subjectName}`)
                                                .then(res => {
                                                    if (res) {
                                                        alert.success('register success')
                                                        window.location.reload(false)
                                                    }
                                                })
                                        }
                                    }}
                                >Đăng kí
                                </button>
                            )

                            : <div>
                                <button className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#exampleModal1"
                                    onClick={() => {
                                        setSubjectId(list._id)
                                        axios.get('/listUser')
                                            .then(response => {
                                                setListStudent(response.data)
                                            })
                                        axios.get(`/subject/${list._id}`)
                                            .then(response => {
                                                setSubArr(response.data.subjectArr)
                                                response.data.exerciseArr.map(exercise => {
                                                    total1 = Number(exercise.week)
                                                })
                                                setTotal(total1)
                                            })

                                    }}><i className="fa fa-list" /></button>
                            </div>
                        }


                    </td>
                </tr>

            </tbody>
        )

    })


    const renderlistuser =
        <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>Danh sách lớp học</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div >
                            <ReactHTMLTableToExcel
                                id="btnexport"
                                className="btn btn-primary"
                                table="tableResult"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Download as XLS"
                            />
                        </div>
                        <div class="container table-responsive py-5">
                            <table class="table table-bordered table-hover" id="tableResult">
                                <thead class="thead-dark">
                                    <tr>

                                        <th scope="col">STT</th>
                                        <th scope="col">MSSV</th>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Tổng kết</th>
                                    </tr>
                                </thead>
                                {listStudent.map((listStudent, index) => {
                                    if (listStudent.subId === subjectId) {
                                        return (
                                            <tbody>
                                               <tr>
                                               <td>{index}</td>
                                                <td>{listStudent.mssv}</td>
                                                <td>{listStudent.username}</td>
                                                <td style={{ color: "red" }}>{subArr.filter(x => x.user === listStudent.mssv).length === 0 ? 'null' : (sum(subArr.filter(x => x.user === listStudent.mssv).map(x => Number(x.point))) / total).toFixed(2)}</td>
                                               </tr>

                                            </tbody>
                                        )
                                    }
                                })}
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" style={{ background: "#2a2a72" }} onClick={onSubmit} data-dismiss="modal">Tạo</button>
                    </div>
                </div>
            </div>
        </div>

    const editSubject =
        <div>
            <form onSubmit={onEditSubmit} class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>SỬA MÔN HỌC</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleInputEmail2" style={{ float: "left" }}>MMH</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="PHY18121998"
                                value={MMH}
                                onChange={onChangeMMH}
                                required />

                            <label for="exampleInputName2" style={{ float: "left" }}>Tên môn học</label>
                            <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                                value={subject}
                                onChange={onChange}
                                required />

                            <label for="exampleInputEmail2" style={{ float: "left" }}>Tên giảng viên</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                                value={teacher}
                                onChange={onChangeTeacher}
                                required />

                            <label for="exampleInputEmail2" style={{ float: "left" }}>Số tín chỉ</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="3"
                                value={tinchi}
                                onChange={onChangeTinchi}
                                required />

                            <label for="exampleInputEmail2" style={{ float: "left" }}>Lớp</label>
                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="16VLTH"
                                value={lop}
                                onChange={onChangeClass}
                                required />

                            <div style={{ textAlign: "left" }}><label for="exampleInputEmail2" >Phần trăm điểm:</label></div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" class="form-control" id="exampleInputEmail2" placeholder="30%"
                                            value={percent1}
                                            onChange={onChangePercent1} />
                                    </div>
                                    <div className="col">
                                        <input type="text" class="form-control" id="exampleInputEmail2" placeholder="60%"
                                            value={percent2}
                                            onChange={onChangePercent2} />
                                    </div>
                                    <div className="col">
                                        <input type="text" class="form-control" id="exampleInputEmail2" placeholder="10%"
                                            value={percent3}
                                            onChange={onChangePercent3} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            <button type="submit" class="btn btn-primary" style={{ background: "#2a2a72" }} >Cập nhật</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    const renderList =
        <div class="container table-responsive " style={{ padding: "0.5rem" }}>
            <table class="table table-bordered table-hover" id="tableExportToExcel">
                <thead class="thead-dark">
                    <tr>

                        <th scope="col">STT</th>
                        <th scope="col">MMH</th>
                        <th scope="col">Tên môn học</th>
                        <th>Mô tả</th>
                        <th scope="col">Lớp</th>
                        {user.role === "admin" ? <th>Thao tác</th> : ''}
                        {user.role === "admin" ? <th scope="col">Danh sách sinh viên</th> : <th>?</th>}
                    </tr>
                </thead>
                {renderlistsubject}
            </table>
        </div>


    const renderButtonCreateNewSub =
        <div>
            <div>
                <button style={{ float: "right", margin: "0 15px", borderRadius: "10px" }} data-toggle="modal" data-target="#exampleModal" className="btn btn-primary"><i className="fa fa-plus" />&nbsp;Tạo môn học mới</button>

                <form onSubmit={onSubmit} class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>CREATE NEW SUBJECT</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label for="exampleInputEmail2" style={{ float: "left" }}>MMH</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="PHY18121998"
                                    value={MMH}
                                    onChange={onChangeMMH}
                                    required />

                                <label for="exampleInputName2" style={{ float: "left" }}>Subject Name</label>
                                <input type="text" class="form-control" id="exampleInputName2" placeholder="ReactJS"
                                    value={subject}
                                    onChange={onChange}
                                    required />

                                <label for="exampleInputEmail2" style={{ float: "left" }}>Teacher Name</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Huynh Van Tuan"
                                    value={teacher}
                                    onChange={onChangeTeacher}
                                    required />

                                <label for="exampleInputEmail2" style={{ float: "left" }}>So tin chi</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="3"
                                    value={tinchi}
                                    onChange={onChangeTinchi}
                                    required />

                                <label for="exampleInputEmail2" style={{ float: "left" }}>Lop</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="16VLTH"
                                    value={lop}
                                    onChange={onChangeClass}
                                    required />

                                <div style={{ textAlign: "left" }}><label for="exampleInputEmail2" >Phan tram diem:</label></div>
                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="30%"
                                                value={percent1}
                                                onChange={onChangePercent1} />
                                        </div>
                                        <div className="col">
                                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="60%"
                                                value={percent2}
                                                onChange={onChangePercent2} />
                                        </div>
                                        <div className="col">
                                            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="10%"
                                                value={percent3}
                                                onChange={onChangePercent3} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary" style={{ background: "#2a2a72" }} >Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    return (
        <div className="text-center" style={{ padding: "0 10%" }}>
            <h3 style={{ color: "#2a2a72" }}>Danh sách môn học</h3>

            <a style={{ fontSize: "1em", margin: "0 5px", color: "red", fontStyle: "italic" }}>*Vui long dang ki de xem duoc bai tap</a>
            <hr />
            {user.role === "admin" ? renderButtonCreateNewSub : ''}
            {renderList}
            {editSubject}
            {renderlistuser}
        </div>

    )

}