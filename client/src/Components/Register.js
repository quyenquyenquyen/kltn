import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { Paper } from '@material-ui/core';

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", role: "", name: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", role: "", name: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (user.role === 'admin' || user.role === 'user') {
            AuthService.register(user).then(data => {
                const { message } = data;
                setMessage(message);
                resetForm();
                if (!message.msgError) {
                    timerID = setTimeout(() => {
                        props.history.push('/login');
                    }, 2000)
                }
            });
        } else {
            alert("Role Wrong,please just admin or user")

        }
    }



    return (
        <div>
            <form onSubmit={onSubmit} style={{ padding: "3% 5%", width: "50%", margin: "0 auto" }}>
                <Paper elevation={6} style={{ margin: "10px", padding: "10px" }}>
                    <div>
                        <div className="text-center">
                            <img style={{ width: "100px", height: "auto" }} src="http://localhost:5000/up/image/12472320_1726672837602082_5692324023661199345_n.jpg" />
                            <h5 style={{ color: "#2a2a72" }}>Bộ môn Vật lý tin học</h5>
                            <h3>Tạo người dùng mới</h3>
                        </div>

                        <label ><h6 style={{ fontWeight: "bold" }}><i className="fa fa-user" />&nbsp;MSSV:</h6> </label>
                        <input type="text"
                            style={{ marginBottom: "1em" }}
                            name="username"
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter Username"
                            required />

                        <label><h6 style={{ fontWeight: "bold" }}><i className="fa fa-users" />&nbsp;Họ tên:</h6> </label>
                        <input type="text"
                            style={{ marginBottom: "1em" }}
                            name="name"
                            value={user.name}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter Name"
                            required />

                        <label><h6 style={{ fontWeight: "bold" }}><i className="fa fa-key" />&nbsp;Mật khẩu: </h6></label>
                        <input type="password"
                            style={{ marginBottom: "1em" }}
                            name="password"
                            value={user.password}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter Password"
                            required />

                        <label><h6 style={{ fontWeight: "bold" }}><i className="fa fa-tag" />&nbsp;Quyền truy cập:</h6> </label>
                        <input type="text"
                            style={{ marginBottom: "1em" }}
                            name="role"
                            value={user.role}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter role (admin/user)"
                            required />
                        <button style={{ width: "50%", margin: "0 25%" }} className="btn btn-lg btn-primary btn-block" type="submit">Create </button>
                    </div>
                </Paper>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    )
}

export default Register;