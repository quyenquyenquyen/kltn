import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { useAlert } from "react-alert";
import { AuthContext } from '../Context/AuthContext';
export default function ListFileOfExercise(props) {

  const id = props.match.params.id
  const week = props.match.params.week

  const [subArr, setSubArr] = useState([])
  const [point, setPoint] = useState()
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const alert = useAlert();

  useEffect(() => {
    axios.get(`/subject/${id}`)
      .then(response => {
        setSubArr(response.data.subjectArr)
      })
  }, [])

  const onPointChange = (event) => {
    setPoint(event.currentTarget.value)
  }
  const bodyOfTable = subArr.map((subject, index) => {
    if (subject.week === String(week) && (subject.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || subject.contentType === "application/pdf")) {

      return (
        <tbody key={index}>
          <tr>
            <td>{subject.user}</td>
            <td>{subject.username}</td>
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
              <button className="btn-sm btn-outline-primary" style={{ margin: "5px" }} onClick={() => {
                axios.put(`/subject/put/${id}/${subject.fileId}/${subject.user}`, {
                  name: subject.name,
                  contentType: subject.contentType,
                  fileId: subject.fileId,
                  timestamp: subject.timestamp,
                  user: subject.user,
                  point: point,
                  week: week,
                  username:subject.username
                }).then(response => {
                  if (response) {
                    alert.success("put score success")
                    window.location.reload(true)
                  }
                })
              }}>ok</button>
            </td>
          </tr>
        </tbody>

      )
    }
  })
  const renderFileOfStudentForTeacher =
    <div style={{ textAlign: "center" }}>
      <h4 style={{ color: "#2a2a72", fontWeight: "bold", padding: "15px", margin: "0" }}>List Exercise of student - Week {week}</h4>
      <div class="bs-example container" data-example-id="striped-table">
        <table class="table table-striped table-bordered table-hover">
          <caption>Bootstrap Table CSS Demo</caption>
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Name</th>
              <th>File Name</th>
              <th>Time</th>
              <th>point</th>
              <th>Set point</th>
            </tr>
          </thead>
          {bodyOfTable}

        </table>
      </div>
    </div>
  return (
    <div>
      {renderFileOfStudentForTeacher}
    </div>
  )
}