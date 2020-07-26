import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useAlert } from "react-alert";
import { AuthContext } from '../Context/AuthContext';
export default function Result(props) {

    const [listUser, setListUser] = useState([])
    const [listMark, setListMark] = useState([])
    const [id, setId] = useState('')
    const [index, setIndex] = useState(0)
    const alert = useAlert();
    var total = 0
    var temp = 0
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    useEffect(() => {
        axios.get(`/listUser`)
            .then(response => {
                if (response) {
                    setListUser(response.data)
                }
            })
    }, [])


    const renderbody = listUser.map((listUser, index) => {
 
            if (listUser.mssv===user.username) {
            return (
                <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{listUser.subName}</td>
                        {/* <td><a><i className="fa fa-list" /></a></td> */}
                        <td>
                            <button
                                onClick={() => {
                                    axios.get(`/subject/${listUser.subId}`)
                                        .then(res => {
                                            if (res) {
                                                setListMark(res.data.subjectArr)
                                            }
                                            console.log('listmark',listMark)
                                        })
                                }}
                                style={{ margin: "0 15px", borderRadius: "10px" }}
                                data-toggle="modal"
                                data-target="#exampleModal"
                                className="btn btn-primary">
                                <i className="fa fa-list" />&nbsp;Kết quả
                        </button>


                        </td>
                    </tr>
                </tbody>
            )
        }
        
})

const rendertablelistUser =
    <div class="container table-responsive py-5">
        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Môn học</th>
                    <th scope="col">Kết quả</th>
                </tr>
            </thead>
            {renderbody}
        </table>
    </div>

const renderScore =
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#2a2a72" }}>Kết quả môn học</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container table-responsive py-5">
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Bài tập tuần</th>
                                    <th scope="col">Kết quả</th>
                                </tr>
                            </thead>
                            {listMark.map((list) => {
                                if (list.user === user.username) {
                                    temp = list.week
                                    if (list.point === null || list.point === '') {
                                        list.point = 0
                                    }
                                    total += list.point
                                    return (
                                        <tbody>
                                            <td>{list.week}</td>
                                            <td style={{ color: 'red' }}>{list.point}</td>
                                        </tbody>
                                    )
                                }
                            })}
                        </table>
                    </div>
                    <div style={{ color: "red", fontWeight: "bold" }}>TOTAL:&nbsp;{total / temp}</div>
                </div>
                <div class="modal-footer">
                    {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                    <button type="button" class="btn btn-primary" style={{ background: "#2a2a72" }} data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

return (
    <div className="text-center">
        {renderScore}
        <h3 style={{ fontWeight: "bold", color: "#2a2a72" }}>DANH SÁCH MÔN HỌC ĐĂNG KÝ</h3>
        {rendertablelistUser}
    </div>
)

}