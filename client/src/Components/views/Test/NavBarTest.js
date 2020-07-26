import React, { Component, useState, useEffect,useContext } from 'react'
import styled from 'styled-components'
import jQuery from 'jquery'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import AuthService from '../../Services/AuthService'
import { AuthContext } from '../../Context/AuthContext'

const NavbarTest = props => {

	const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
	const [search, setSearch] = useState('')

	useEffect(() => {
		(function ($) {
			"use strict";

			$(function () {
				var header = $(".start-style");
				$(window).scroll(function () {
					var scroll = $(window).scrollTop();

					if (scroll >= 10) {
						header.removeClass('start-style').addClass("scroll-on");
					} else {
						header.removeClass("scroll-on").addClass('start-style');
					}
				});
			});

			//Animation

			$(document).ready(function () {
				$('body.hero-anime').removeClass('hero-anime');
			});

			//Menu On Hover

			$('body').on('mouseenter mouseleave', '.nav-item', function (e) {
				if ($(window).width() > 750) {
					var _d = $(e.target).closest('.nav-item'); _d.addClass('show');
					setTimeout(function () {
						_d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
					}, 1);
				}
			});

			//Switch light/dark

			$("#switch").on('click', function () {
				if ($("body").hasClass("dark")) {
					$("body").removeClass("dark");
					$("#switch").removeClass("switched");
				}
				else {
					$("body").addClass("dark");
					$("#switch").addClass("switched");
				}
			});

		})(jQuery);
	}, [])

	const onClickLogoutHandler = () => {
		AuthService.logout().then(data => {
		  if (data.success) {
			setUser(data.user);
			setIsAuthenticated(false);
		  }
		});
	  }

	const onChange = (e) => {
		setSearch(e.currentTarget.value)
	}

	const renderSearch = (

		search !== ''
			? <a href={`/search/${search}`} className="ml-1"><i className="fa fa-search ml-1"></i></a>
			: <div></div>
	)

	const unAuthenticatedNavbar =() =>{
		return (
			<Wrapper>
				<body class="dark">
	
					<div class="navigation-wrap bg-light start-header start-style">
						<div class="container">
							<div class="row">
								<div class="col-12">
									<nav class="navbar navbar-expand-md navbar-light ">
	
										<a class="navbar-brand" target="_blank"><img src="img/logoKhoa.jpg" alt="" /></a>
										<div className=" navbar-brand text-center" style={{ height: "45px", paddingBottom: "5px", margin: "0px" }}>
											<h6 style={{ color: '#2a2a72', fontSize: "0.8rem", fontWeight: "600", fontFamily: "Times New Roman", marginBottom: "0px" }} >KHOA VẬT LÝ - VẬT LÝ KỸ THUẬT</h6>
											<h6 style={{ color: '#2a2a72', fontWeight: "1000", fontSize: "1.0rem", fontFamily: "Times New Roman", marginBottom: "0px" }} >BỘ MÔN VẬT LÝ TIN HỌC</h6>
	
										</div>
	
										<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
											<span class="navbar-toggler-icon"></span>
										</button>
	
										<div class="collapse navbar-collapse" id="navbarSupportedContent">
											<ul class="navbar-nav ml-auto py-4 py-md-0 effect-3">
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
													<Link className="nav-link" to='/' >TRANG CHỦ</Link>
												</li>
												{/* <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
														<a class="nav-link" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ĐĂNG BÀI &nbsp;<i className="fa fa-caret-down"/></a>
														<div class="dropdown-menu">
															<Link class="dropdown-item" to='/blog/create'>Bản tin chung</Link>
															<Link class="dropdown-item" to='/blog1/create'>Bản tin giáo vụ</Link>
														</div>
													</li> */}
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
													<a class="nav-link" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">GIỚI THIỆU &nbsp;<i className="fa fa-caret-down" /></a>
													<div class="dropdown-menu">
														<Link class="dropdown-item" to='/gioithieubomon'>Về bộ môn</Link>
														<Link class="dropdown-item" to='/gioithieunhansu'>Về nhân sự</Link>
													</div>
												</li>
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
													<Link className="nav-link" to='/daotao'  >ĐÀO TẠO</Link>
	
												</li>
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
													<a class="nav-link" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">HOẠT ĐỘNG &nbsp;<i className="fa fa-caret-down" /></a>
													<div class="dropdown-menu">
														<Link class="dropdown-item" to='/dgyk'>Đóng góp ý kiến</Link>
														<Link class="dropdown-item" to='/gioithieunhansu'>Về nhân sự</Link>
													</div>
												</li>
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
													<a class="nav-link" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">TUYỂN SINH &nbsp;<i className="fa fa-caret-down" /></a>
													<div class="dropdown-menu">
														<Link class="dropdown-item" to='/gioithieubomon'>Về bộ môn</Link>
														<Link class="dropdown-item" to='/gioithieunhansu'>Về nhân sự</Link>
													</div>
												</li>
	
												<WrapperSearch>
													<form style={{ borderBottom: "15px", marginLeft: "10px" }} role="search" class="search-form">
														{/* <input type="submit" value="" class="search-submit" /> */}
														<input type="search" name="q" class="search-text" placeholder="Search..." onChange={onChange} />
														{renderSearch}
													</form>
	
												</WrapperSearch>
											</ul>
										</div>
	
									</nav>
								</div>
							</div>
						</div>
						{/* <div id="switch" style={{ float: "right" }}>
								<div id="circle"></div>
							</div> */}
					</div>
	
				</body>
			</Wrapper>
		)
	}

	const authenticatedNavbar = ()=>{
		return(
			<Wrapper>
				<body class="dark">
	
					<div class="navigation-wrap bg-light start-header start-style">
						<div class="container">
							<div class="row">
								<div class="col-12">
									<nav class="navbar navbar-expand-md navbar-light ">
	
										<a class="navbar-brand" target="_blank"><img src="img/logoKhoa.jpg" alt="" /></a>
										<div className=" navbar-brand text-center" style={{ height: "45px", paddingBottom: "5px", margin: "0px" }}>
											<h6 style={{ color: '#2a2a72', fontSize: "0.8rem", fontWeight: "600", fontFamily: "Times New Roman", marginBottom: "0px" }} >KHOA VẬT LÝ - VẬT LÝ KỸ THUẬT</h6>
											<h6 style={{ color: '#2a2a72', fontWeight: "1000", fontSize: "1.0rem", fontFamily: "Times New Roman", marginBottom: "0px" }} >BỘ MÔN VẬT LÝ TIN HỌC</h6>
	
										</div>
	
										<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
											<span class="navbar-toggler-icon"></span>
										</button>
	
										<div class="collapse navbar-collapse" id="navbarSupportedContent">
											<ul class="navbar-nav ml-auto py-4 py-md-0 effect-3">
												<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
													<Link className="nav-link" to='/' >AUTHENTICATED</Link>
												</li>
	
											</ul>
										</div>
	
									</nav>
								</div>
							</div>
						</div>
						{/* <div id="switch" style={{ float: "right" }}>
								<div id="circle"></div>
							</div> */}
					</div>
	
				</body>
			</Wrapper>
		)
	}
	
	return(
		<ul className="navbar-nav mr-auto">
			{!isAuthenticated?unAuthenticatedNavbar():authenticatedNavbar()}
		</ul>
	)

}

export default NavbarTest

const WrapperSearch = styled.div`
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
body {
  padding: 4rem;
	background: #f3f3f3; 
  font-family: 'Roboto', sans-serif;
}
.contact {
  margin: 4rem 0 0;
  font-weight: bold;
  color: #444;
  line-height: 1.7;
}
.contact a {
  color: #66b;
  font-size: 0.8rem;
}
h1, input{
  color: #444;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
h1{
  border-bottom: 1px dashed #666;
  padding-bottom: 16px;
}
form{
	padding: 0;
  margin: 0;
}
/* Expandable search box */
/* Note: don't change 0.8s in transition. */
/* --------------------- */
input.search-text {
	color: #222;
	position:relative;
	z-index:5;
	transition: z-index 0.8s, width 0.5s, background 0.3s ease, border 0.3s;
	height: 28px;
	width: 0;
	margin: 0;
	padding: 5px 0 5px 40px;
	box-sizing: border-box;
	font-size: 16px;
	font-size: 1rem;
	cursor: pointer;
	border-radius: 30px;
	border: 1px solid transparent;
	/*background: url(search.png) no-repeat left 9px center transparent;*/
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik01MDMuODY2LDQ3Ny45NzRMMzYwLjk1OCwzMzUuMDUyYzI4LjcyNS0zNC41NDQsNDYuMDE3LTc4LjkxMiw0Ni4wMTctMTI3LjMzNiAgYzAtMTEwLjA4NC04OS4yMjctMTk5LjMxMi0xOTkuMzEyLTE5OS4zMTJDOTcuNTk5LDguNDAzLDguMzUxLDk3LjYzMSw4LjM1MSwyMDcuNzE1YzAsMTEwLjA2NCw4OS4yNDgsMTk5LjMxMiwxOTkuMzEyLDE5OS4zMTIgIGM0OC40MzUsMCw5Mi43OTItMTcuMjkyLDEyNy4zMzYtNDYuMDE3bDE0Mi45MDgsMTQyLjkyMkw1MDMuODY2LDQ3Ny45NzR6IE0yOS4zMzEsMjA3LjcxNWMwLTk4LjMzNCw3OS45ODctMTc4LjMzMiwxNzguMzMyLTE3OC4zMzIgIGM5OC4zMjUsMCwxNzguMzMyLDc5Ljk5OCwxNzguMzMyLDE3OC4zMzJzLTgwLjAwNywxNzguMzMyLTE3OC4zMzIsMTc4LjMzMkMxMDkuMzE4LDM4Ni4wNDcsMjkuMzMxLDMwNi4wNSwyOS4zMzEsMjA3LjcxNXoiIGZpbGw9IiMzNzQwNEQiLz48L3N2Zz4=) no-repeat left 9px center transparent;
  background-size:24px;
}
input.search-text:focus {
	z-index:3; 
	width: 200px;
	border: 1px solid #666;  
	background-color: white;
	outline: none;
	cursor:auto;
	padding-right: 10px;
}

input.search-submit {
	position: relative;
	z-index: 4;
	top:17px;
	left: 49px;
	width: 45px;
	height: 45px;
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	border-radius: 30px;
	cursor: pointer; 
	background: none;
}

input.search-text::-webkit-search-cancel-button {
	cursor:pointer;
}
`

const Wrapper = styled.nav`
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');

/* #Primary
================================================== */


body{
    font-family: 'Poppins', sans-serif;
	font-size: 16px;
	line-height: 24px;
	font-weight: 400;
	color: #212112;
	background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg');
	background-position: center;
	background-repeat: repeat;
	background-size: 7%;
	background-color: #fff;
	overflow-x: hidden;
    transition: all 200ms linear;
}
::selection {
	color: #fff;
	background-color: #8167a9;
}
::-moz-selection {
	color: #fff;
	background-color: #8167a9;
}


/* #Navigation
================================================== */

.start-header {
	opacity: 1;
	transform: translateY(0);
	padding: 10px 0;
	box-shadow: 0 10px 30px 0 rgba(138, 155, 165, 0.15);
	-webkit-transition : all 0.3s ease-out;
	transition : all 0.3s ease-out;
}
.start-header.scroll-on {
	box-shadow: 0 5px 10px 0 rgba(138, 155, 165, 0.15);
	padding: 5px 0;
	-webkit-transition : all 0.3s ease-out;
	transition : all 0.3s ease-out;
}
.start-header.scroll-on .navbar-brand img{
	height: 40px;
	-webkit-transition : all 0.3s ease-out;
	transition : all 0.3s ease-out;
}
.navigation-wrap{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 1000;
	-webkit-transition : all 0.3s ease-out;
	transition : all 0.3s ease-out;
}
.navbar{
	padding: 0;
}
.navbar-brand img{
	height: 52px;
	width: auto;
	display: block;
	-webkit-transition : all 0.3s ease-out;
	transition : all 0.3s ease-out;
}
.navbar-toggler {
	float: right;
	border: none;
	padding-right: 0;
}
.navbar-toggler:active,
.navbar-toggler:focus {
	outline: none;
}
.navbar-light .navbar-toggler-icon {
	width: 24px;
	height: 17px;
	background-image: none;
	position: relative;
	border-bottom: 1px solid #000;
    transition: all 300ms linear;
}
.navbar-light .navbar-toggler-icon:after, 
.navbar-light .navbar-toggler-icon:before{
	width: 24px;
	position: absolute;
	height: 1px;
	background-color: #000;
	top: 0;
	left: 0;
	content: '';
	z-index: 2;
    transition: all 300ms linear;
}
.navbar-light .navbar-toggler-icon:after{
	top: 8px;
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:after {
	transform: rotate(45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:before {
	transform: translateY(8px) rotate(-45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
	border-color: transparent;
}
.nav-link{
	color: #999 !important;
	
    transition: all 200ms linear;
    font-size:0.8rem
}

.nav-logo{
	color: #212121 !important;
	font-weight: 550;
    transition: all 200ms linear;
    font-size:1.0rem
}
.nav-item:hover .nav-link{
	color: #2a2a72 !important;
}
.nav-item.active .nav-link{
	color: #2a2a72 !important;
}
.nav-link {
	position: relative;
	padding: 5px 0 !important;
	display: inline-block;
}
.nav-item:after{
	position: absolute;
	bottom: -5px;
	left: 0;
	width: 100%;
	height: 2px;
	content: '';
	background-color: #2a2a72;
	opacity: 0;
    transition: all 200ms linear;
}
.nav-item:hover:after{
	bottom: 0;
	opacity: 1;
}
.nav-item.active:after{
	opacity: 1;
}
.nav-item{
	position: relative;
    transition: all 200ms linear;
}

/* #Primary style
================================================== */

.bg-light {
	background-color: #fff !important;
    transition: all 200ms linear;
}
.section {
    position: relative;
	width: 100%;
	display: block;
}
.full-height {
    height: 100vh;
}
.over-hide {
    overflow: hidden;
}
.absolute-center {
	position: absolute;
	top: 50%;
	left: 0;
	width: 100%;
  margin-top: 40px;
	transform: translateY(-50%);
	z-index: 20;
}
h1{
	font-size: 48px;
	line-height: 1.2;
	font-weight: 700;
	color: #212112;
	text-align: center;
}
p{
	text-align: center;
	margin: 0;
	padding-top: 10px;
	opacity: 1;
	transform: translate(0);
    transition: all 300ms linear;
    transition-delay: 1700ms;
}
body.hero-anime p{
	opacity: 0;
	transform: translateY(40px);
    transition-delay: 1700ms;
}
h1 span{
	display: inline-block;
    transition: all 300ms linear;
	opacity: 1;
	transform: translate(0);
}
body.hero-anime h1 span:nth-child(1){
	opacity: 0;
	transform: translateY(-20px);
}
body.hero-anime h1 span:nth-child(2){
	opacity: 0;
	transform: translateY(-30px);
}
body.hero-anime h1 span:nth-child(3){
	opacity: 0;
	transform: translateY(-50px);
}
body.hero-anime h1 span:nth-child(4){
	opacity: 0;
	transform: translateY(-10px);
}
body.hero-anime h1 span:nth-child(5){
	opacity: 0;
	transform: translateY(-50px);
}
body.hero-anime h1 span:nth-child(6){
	opacity: 0;
	transform: translateY(-20px);
}
body.hero-anime h1 span:nth-child(7){
	opacity: 0;
	transform: translateY(-40px);
}
body.hero-anime h1 span:nth-child(8){
	opacity: 0;
	transform: translateY(-10px);
}
body.hero-anime h1 span:nth-child(9){
	opacity: 0;
	transform: translateY(-30px);
}
body.hero-anime h1 span:nth-child(10){
	opacity: 0;
	transform: translateY(-20px);
}
h1 span:nth-child(1){
    transition-delay: 1000ms;
}
h1 span:nth-child(2){
    transition-delay: 700ms;
}
h1 span:nth-child(3){
    transition-delay: 900ms;
}
h1 span:nth-child(4){
    transition-delay: 800ms;
}
h1 span:nth-child(5){
    transition-delay: 1000ms;
}
h1 span:nth-child(6){
    transition-delay: 700ms;
}
h1 span:nth-child(7){
    transition-delay: 900ms;
}
h1 span:nth-child(8){
    transition-delay: 800ms;
}
h1 span:nth-child(9){
    transition-delay: 600ms;
}
h1 span:nth-child(10){
    transition-delay: 700ms;
}
body.hero-anime h1 span:nth-child(11){
	opacity: 0;
	transform: translateY(30px);
}
body.hero-anime h1 span:nth-child(12){
	opacity: 0;
	transform: translateY(50px);
}
body.hero-anime h1 span:nth-child(13){
	opacity: 0;
	transform: translateY(20px);
}
body.hero-anime h1 span:nth-child(14){
	opacity: 0;
	transform: translateY(30px);
}
body.hero-anime h1 span:nth-child(15){
	opacity: 0;
	transform: translateY(50px);
}
h1 span:nth-child(11){
    transition-delay: 1300ms;
}
h1 span:nth-child(12){
    transition-delay: 1500ms;
}
h1 span:nth-child(13){
    transition-delay: 1400ms;
}
h1 span:nth-child(14){
    transition-delay: 1200ms;
}
h1 span:nth-child(15){
    transition-delay: 1450ms;
}
#switch,
#circle {
	cursor: pointer;
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear; 
} 
#switch {
	width: 60px;
	height: 8px;
	border: 2px solid #8167a9;
	border-radius: 27px;
	background: #000;
	position: relative;
	display: block;
	margin: 0 auto;
	text-align: center;
	opacity: 1;
	transform: translate(0);
    transition: all 300ms linear;
    transition-delay: 1900ms;
}
body.hero-anime #switch{
	opacity: 0;
	transform: translateY(40px);
    transition-delay: 1900ms;
}
#circle {
	position: absolute;
	top: -11px;
	left: -13px;
	width: 26px;
	height: 26px;
	border-radius: 50%;
	background: #000;
}
.switched {
	border-color: #000 !important;
	background: #8167a9 !important;
}
.switched #circle {
	left: 43px;
	box-shadow: 0 4px 4px rgba(26,53,71,0.25), 0 0 0 1px rgba(26,53,71,0.07);
	background: #fff;
}
.nav-item .dropdown-menu {
    transform: translate3d(0, 10px, 0);
    visibility: hidden;
    opacity: 0;
	max-height: 0;
    display: block;
	padding: 0;
	margin: 0;
    transition: all 200ms linear;
}
.nav-item.show .dropdown-menu {
    opacity: 1;
    visibility: visible;
	max-height: 999px;
    transform: translate3d(0, 0px, 0);
}
.dropdown-menu {
	padding: 10px!important;
	margin: 0;
	font-size: 13px;
	letter-spacing: 1px;
	background-color: #fcfaff;
	border: none;
	border-radius: 3px;
	box-shadow: 0 5px 10px 0 rgba(138, 155, 165, 0.15);
    transition: all 200ms linear;
}
.dropdown-toggle::after {
	display: none;
}

.dropdown-item {
	padding: 3px 15px;
	color: #2a2a72;
	border-radius: 2px;
    transition: all 200ms linear;
}
.dropdown-item:hover, 
.dropdown-item:focus {
	color: #fff;
	background-color: #846ad4;
}

body.dark{
	color: #fff;
	background-color: #1f2029;
}
body.dark h1{
	color: #fff;
}
body.dark h1 span{
    transition-delay: 0ms !important;
}
body.dark p{
	color: #fff;
    transition-delay: 0ms !important;
}
body.dark .bg-light {
	background-color: #fff !important;
}
body.dark .start-header {
	box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.15);
}
body.dark .start-header.scroll-on {
	box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
}
body.dark .nav-link{
	color: #999 !important;
}
body.dark .nav-item.active .nav-link{
	color: #2a2a72 !important;
}
body.dark .dropdown-menu {
	color: #fff;
	background-color: #fff;
	box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
}
body.dark .dropdown-item {
	color: #1f2029;
}
body.dark .navbar-light .navbar-toggler-icon {
	border-bottom: 1px solid #2a2a72;
}
body.dark .navbar-light .navbar-toggler-icon:after, 
body.dark .navbar-light .navbar-toggler-icon:before{
	background-color:#2a2a72;
}
body.dark .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
	border-color: transparent;
}



/* #Media
================================================== */

@media (max-width: 767px) { 
	h1{
		font-size: 38px;
	}
	.nav-item:after{
		display: none;
	}
	.nav-item::before {
		position: absolute;
		display: block;
		top: 15px;
		left: 0;
		width: 11px;
		height: 1px;
		content: "";
		border: none;
		background-color: #2a2a72;
		vertical-align: 0;
	}
	.dropdown-toggle::after {
		position: absolute;
		display: block;
		top: 10px;
		left: -23px;
		width: 1px;
		height: 11px;
		content: "";
		border: none;
		background-color: orange;
		vertical-align: 0;
		transition: all 200ms linear;
	}
	.dropdown-toggle[aria-expanded="true"]::after{
		transform: rotate(90deg);
		opacity: 0;
	}
	.dropdown-menu {
		padding: 0 !important;
		background-color: orange;
		box-shadow: none;
		transition: all 200ms linear;
	}
	.dropdown-toggle[aria-expanded="true"] + .dropdown-menu {
		margin-top: 10px !important;
		margin-bottom: 20px !important;
	}
	body.dark .nav-item::before {
		background-color: #2a2a72;
	}
	body.dark .dropdown-toggle::after {
		background-color: #2a2a72;
	}
	body.dark .dropdown-menu {
		background-color: transparent;
		box-shadow: none;
	}
}

/* #Link to page
================================================== */

.link-to-portfolio {
	  position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 200;
    cursor: pointer;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 3px;
    background-position: center center;
    background-size: cover;
    background-image: url('https://ivang-design.com/ig-logo.jpg');
    box-shadow: 0 0 0 2px rgba(12,12,12,.1);
    transition: opacity .2s, border-radius .2s, box-shadow .2s;
    transition-timing-function: ease-out;
}
.link-to-portfolio:hover {
    opacity: 0.8;
    border-radius: 50%;
    box-shadow: 0 0 0 20px rgba(12,12,12,.1);
}
`