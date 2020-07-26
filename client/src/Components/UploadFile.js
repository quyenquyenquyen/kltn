import React, { Component, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import $ from 'jquery'
import axios from 'axios'
import { useAlert } from "react-alert";
import { AuthContext } from '../Context/AuthContext';
import Countdown from 'react-countdown'
import { Paper, Grid } from '@material-ui/core'
import { weekdays } from 'moment';



export default function UploadFile(props) {

  const week = props.match.params.week
  const id = props.match.params.id
  const exerciseName = props.match.params.exerciseName
  const deadline = props.match.params.deadline
  const name = props.match.params.name
  const filename = props.match.params.name

  const alert = useAlert();

  const [subject, setSubject] = useState('')
  const [file, setFile] = useState('')
  const [point, setPoint] = useState()
  const [time, setTime] = useState([])
  const [lastFileNameUpload, setLastFilenameUpload] = useState([])
  const [userList, setUserList] = useState([])
  const [subArr, setSubArr] = useState([])
  const [slide, setSlide] = useState([])

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);


  const dateOfDeadline = new Date(deadline);
  useEffect(() => {
    var droppedFiles = false;
    var fileName = '';
    var $dropzone = $('.dropzone');
    var $button = $('.upload-btn');
    var uploading = false;
    var $syncing = $('.syncing');
    var $done = $('.done');
    var $bar = $('.bar');
    var timeOut;

    $dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
    })
      .on('dragover dragenter', function () {
        $dropzone.addClass('is-dragover');
      })
      .on('dragleave dragend drop', function () {
        $dropzone.removeClass('is-dragover');
      })
      .on('drop', function (e) {
        droppedFiles = e.originalEvent.dataTransfer.files;
        fileName = droppedFiles[0]['name'];
        $('.filename').html(fileName);
        $('.dropzone .upload').hide();
      });

    $button.bind('click', function () {
      startUpload();
    });

    $("input:file").change(function () {
      fileName = $(this)[0].files[0].name;
      $('.filename').html(fileName);
      $('.dropzone .upload').hide();
    });

    function startUpload() {
      if (!uploading && fileName != '') {
        uploading = true;
        $button.html('Uploading...');
        $dropzone.fadeOut();
        $syncing.addClass('active');
        $done.addClass('active');
        $bar.addClass('active');
        window.setTimeout(showDone, 3000);
      }
    }
    function showDone() {
      $button.html('Done');
    }

    axios.get(`/up/files/${name}`)
      .then(response => {
        setFile(response.data)
      })

    axios.get(`/subject/${id}`)
      .then(response => {
        setSubject(response.data)
        setUserList(response.data.userArr)
        setSubArr(response.data.subjectArr)
        setSlide(response.data.exerciseArr)
      })

    axios.get(`/user/arr`)
      .then(response => {
        setLastFilenameUpload(response.data)
      })

  }, [])

  const onPointChange = (event) => {
    setPoint(event.currentTarget.value)
  }

  const onSetSubject = () => {
    const varriable = {
      name: "",
      fileId: "",
      week:week,
      subjectName: subject.subjectName,
    }

    axios.put(`/user/resetarr/${subject.subjectName}/${week}`, varriable)
      .then(response => {
        if (response) {
          alert.success("reset arr success")
        } else {
          alert.error("error when put")
        }
      })

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file)
    axios.post(`/up/upload/${subject.subjectName}/${week}`, data)
      .then(response => {
        if (response) {
          alert.success("Submited!")
          setTimeout(() => {
            window.location.reload(true)
          }, 4000);
        } else {
          alert.error("Error when post file")
        }
      })
    
  }

  const renderFileNameWhenUpload = lastFileNameUpload.map((file, index) => {
    if (file.subjectName === subject.subjectName && file.name !== ""&&file.week===week)
      return (
        <div style={{ color: "#001529", marginTop: "3%", padding: "3%", textAlign: "center" }}>
          <h5 >{file.name}</h5>
          <form method="POST" action={`/up/files/${file.fileId}/${id}?_method=DELETE`} >
            <button className="fa fa-trash  btn btn-danger" onClick={onSetSubject}>delete</button>
          </form>
        </div>
      )
  })

  const renderSlide = slide.map(slide => {
    if (slide.week === week) {
      if (slide.contentType === "application/pdf" || slide.contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"||slide.contentType==="application/octet-stream"||slide.contentType==="image/jpeg") {
        return (
        <div >{
          slide.contentType=="application/octet-stream"?<a href={`http://localhost:5000/up/rar/${slide.name}`} target="_blank"><a style={{ color: "red" }}>Slide tuan {week}</a> {slide.name}</a>
          :slide.contentType=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"?<a href={`http://localhost:5000/up/pdf/${slide.name}`} target="_blank"><a style={{ color: "red" }}>Slide tuan {week}</a> {slide.name}</a>
          :slide.contentType=="image/jpeg"?<a href={`http://localhost:5000/up/image/${slide.name}`} target="_blank"><a style={{ color: "red" }}>Slide tuan {week}</a> {slide.name}</a>
          :slide.contentType=="application/pdf"?<a href={`http://localhost:5000/up/image/${slide.name}`} target="_blank"><a style={{ color: "red" }}>Slide tuan {week}</a> {slide.name}</a>
          :''
          }</div>
        )
      }
    }
  })
  const FileUpload =
    <Wrapper >
      <form onSubmit={handleSubmit} >
        <div class="center" style={{marginBottom:"4%"}}>
          <div class="bar"></div>
          <div class="title">
            <Countdown
              date={new Date(dateOfDeadline)}
            />
          </div>
          <div>
            <div class="dropzone">
              <div class="content">
                <img src="https://100dayscss.com/codepen/upload.svg" class="upload" />
                <span class="filename"></span>
                <input type="file" class="input" onChange={(e) => {
                  let file = e.target.files[0]
                  setFile(file)
                }} />
              </div>
            </div>
          </div>
          <img src="https://100dayscss.com/codepen/syncing.svg" class="syncing" />
          <img src="https://100dayscss.com/codepen/checkmark.svg" class="done" />
          <button type="submit" value="Submit" class="upload-btn"><a style={{ color: "white", fontWeight: "bold" }}>Upload file</a></button>
        </div>
      </form>
    </Wrapper>


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      const varriable = {
        name: "",
        fileId: "",
        week:week,
        subjectName: subject.subjectName,
      }
      axios.put(`/user/resetarrnopush/${subject.subjectName}/${week}`, varriable)
      return <div class="alert alert-danger text-center" style={{margin:"0 20px"}} role="alert"><h4 style={{fontWeight:"bold",margin:"0",color:"blue"}}>Time's up</h4></div>
    } else {
      return (
        <div>
          {user.role === "user" ? FileUpload : ''}
          {renderFileNameWhenUpload}
        </div>
      )
    }
  }


  const renderStateSubmit = lastFileNameUpload.map((file, index) => {
    if (file.subjectName === subject.subjectName && file.name !== ""&&file.week===week)
      return (
        <div style={{ padding: "10px", textAlign: "center" }}>
          <div>{file.name}</div>
          <span class="badge badge-success">SUBMITTED</span>
        </div>
      )
  })

  return (
    <WrapperUploadFile>
      <div className="container">
        <div class="title text-center">
          <h3 className="subjectname">{subject.subjectName}</h3>
          <h6 className="teacher">Giang vien:&nbsp;{subject.Teacher}</h6>
          <br />
        </div>
        <hr />
        <Grid container>
        
          <Grid xs={6}>
            <Paper elevation={6} style={{ padding: "3%" }}>
              <div style={{margin:"0"}} class="alert alert-primary" role="alert">
                <div className="text-center"><h5 className="exercisename">De bai tuan {week}:&nbsp;{exerciseName}</h5>
                </div>
                <a>Deadline: &nbsp;
                  <Countdown date={new Date(dateOfDeadline)}/>
                </a>
                {renderSlide}
              </div>
              <div className="text-center">
              {renderStateSubmit}
              </div>
            </Paper>
          </Grid>
          <Grid xs={6}>
              <div>
                  <Countdown
                    date={new Date(dateOfDeadline)}
                    // Date.now()+5000
                    renderer={renderer}
                  />
              </div>
          </Grid>
         
        </Grid>
        
      </div>
    </WrapperUploadFile>
  )

}


const WrapperUploadFile = styled.div`
.paper-container{
  margin:0 0 3% 10%;
  // background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/652/confectionary.png");
}
.subjectname{
  color:#2a2a72;
  margin:0;
  padding:10px;
}
.exercisename{
  font-weight:bold;
}
.teacher{
  float:right;
}
@media only screen and (min-width: 375px){
  .container{
    padding: 3rem 15px;
    max-width:100%;
  }
}
@media only screen and (min-width:719px){
  .container{
    padding: 0 10%;
    max-width:100%;
  }
 
}

`

const Wrapper = styled.div`
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400);


.frame {
  position: relative;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
  border-radius: 2px;
  box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.3);
  background: #2a2a72;
  background: -webkit-linear-gradient(bottom left, #3A92AF 0%, #5CA05A 100%);
  background: -moz-linear-gradient(bottom left, #3A92AF 0%, #5CA05A 100%);
  background: -o-linear-gradient(bottom left, #3A92AF 0%, #5CA05A 100%);
  background: linear-gradient(to top right, #3A92AF 0%, #5CA05A 100%); 
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3A92AF', endColorstr='#5CA05A',GradientType=1 );
  color: #fff;
	font-family: 'Open Sans', Helvetica, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.center {
  position: relative;
  width: 300px;
  margin-bottom:0;
  background:#001529;
	height: 260px;
	box-shadow: 8px 10px 15px 0 rgba(0,0,0,0.2);
	border-radius: 3px;
}

.title {
	font-size: 1.5em;
	color: white;
	line-height: 50px;
	height: 50px;
	border-bottom: 1px solid #D8D8D8;
	text-align: center;
}

.dropzone {
	position: absolute;
	z-index: 1;
	box-sizing: border-box;
	display: table;
	table-layout: fixed;
	width: 100px;
	height: 80px;
	top: 86px;
	left: 100px;
	border: 1px dashed #A4A4A4;
	border-radius: 3px;
	text-align: center;
	overflow: hidden;
	
	&.is-dragover {
		border-color: #666;
		background: #eee;
	}
	
	.content {
		display: table-cell;
		vertical-align: middle;
	}
	
	.upload {
		margin: 6px 0 0 2px;
	}
	
	.filename {
		display: block;
		color: #676767;
		font-size: 14px;
		line-height: 18px;
	}
	
	.input {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	
}

.upload-btn {
	position: absolute;
	width: 140px;
	height: 40px;
	left: 80px;
	bottom: 24px;
	background: #1890ff;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	box-shadow: 0 2px 0 0 #1890ff;
	cursor: pointer;
	transition: all .2s ease-in-out;
	
	&:hover {
		box-shadow: 0 2px 0 0 #1890ff, 0 2px 10px 0 #1890ff;
	}
}

.bar {
	position: absolute;
	z-index: 1;
	width: 300px;
	height: 3px;
	top: 49px;
	left: 0;
	background: #6ECE3B;
	transition: all 3s ease-out;
	transform: scaleX(0);
	transform-origin: 0 0;
	
	&.active {
		transform: scaleX(1) translate3d(0,0,0);
	}
}

.syncing {
	position: absolute;
	top: 109px;
	left: 134px;
	opacity: 0;
	
	&.active {
		animation: syncing 3.2s ease-in-out;
	}
}

.done {
	position: absolute;
	top: 112px;
	left: 132px;
	opacity: 0;
	
	&.active {
		animation: done .5s ease-in 3.2s;
		animation-fill-mode: both;
	}
}

@keyframes syncing {
	0% {
		transform: rotate(0deg);
	}
	10% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		transform: rotate(360deg);
		opacity: 0;
	}
}

@keyframes done {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

`
