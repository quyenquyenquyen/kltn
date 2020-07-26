import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default class HoverEffect extends Component {
    render() {
        return (
            <Wrapper>

                <div class="content">
                    <div class="grid">
                        <figure class="effect-layla" >
                            <img src="img/test7.jpg" alt="img1" />
                            <figcaption>
                                <h5 style={{ color: "#2a2a72", fontWeight: "bold" }}>BỘ MÔN VLTH</h5>
                                <p  style={{fontStyle:"italic",fontWeight:"bold",color:"white",marginTop:"2px",fontSize:"0.8rem"}}>...view more</p>
                                <a href="gioithieubomon">View more</a>
                            </figcaption>
                        </figure>
                        <figure class="effect-layla">
                            <img src="img/test8.jpg" alt="img2" />
                            <figcaption>
                                <h5 style={{ color: "#2a2a72", fontWeight: "bold" }}>ĐÀO TẠO</h5>
                                <p  style={{fontStyle:"italic",fontWeight:"bold",color:"white",marginTop:"2px",fontSize:"0.8rem"}}>...view more</p>
                                <a href="daotao">View more</a>
                            </figcaption>
                        </figure>
                        <figure class="effect-layla">
                            <img src="img/test9.jpg" alt="img1" />
                            <figcaption>
                                <h5 style={{ color: "#2a2a72", fontWeight: "bold" }}>VIỆC LÀM</h5>
                                <p  style={{fontStyle:"italic",fontWeight:"bold",color:"white",marginTop:"2px",fontSize:"0.8rem"}}>...view more</p>
                                <a href="vieclam">View more</a>
                            </figcaption>
                        </figure>
                        <figure class="effect-layla">
                            <img src="https://docs.google.com/uc?id=0B7UPM0QugWUjQVlzT0VpTmdYbG8" alt="img2" />
                            <figcaption>
                                <h5 style={{ color: "#2a2a72", fontWeight: "bold" }}>THÔNG BÁO</h5>
                                <p  style={{fontStyle:"italic",fontWeight:"bold",color:"white",marginTop:"2px",fontSize:"0.8rem"}}>...view more</p>
                                <a href="/blogpage">View more</a>
                            </figcaption>
                        </figure>
                    </div>


                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
.fancy-card.one{
    background-image: url("https://docs.google.com/uc?id=0B7UPM0QugWUjQVlzT0VpTmdYbG8");
 }
 .fancy-card.two{
    background-image: url("https://docs.google.com/uc?id=0B7UPM0QugWUjbkR2Um9YZ2pnNzQ");
 }
 .fancy-card.three{
    background-image: url("https://docs.google.com/uc?id=0B7UPM0QugWUjNVVVay1vYkRIV1E");
 }



 .grid {
	position: relative;
	margin: 0 auto;
	padding: 1em 1em 4em;
	max-width: 1000px;
	list-style: none;
    text-align: center;
    height:250px;
}

.grid figure {
	position: relative;
	float: left;
	overflow: hidden;
	margin: 3% 5%;
	max-width: 40%;
	height:100%;
	text-align: center;
    cursor: pointer;
}

.grid figure img {
	position: relative;
	display: block;
	min-height: 100%;
	max-width: 100%;
	opacity: 1;
}

.grid figure figcaption {
	padding: 2em;
	color: #fff;
	text-transform: uppercase;
	font-size: 1.25em;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.grid figure figcaption::before,
.grid figure figcaption::after {
	pointer-events: none;
}

.grid figure figcaption,
.grid figure figcaption > a {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

/* Anchor will cover the whole item by default */
/* For some effects it will show as a button */
.grid figure figcaption > a {
	z-index: 1000;
	text-indent: 200%;
	white-space: nowrap;
	font-size: 0;
	opacity: 0;
}

.grid figure h5 {
	word-spacing: -0.15em;
	font-weight: 300;
}

.grid figure h5 span {
	font-weight: 800;
}

.grid figure h5,
.grid figure p {
	margin: 0;
}

.grid figure p {
	letter-spacing: 1px;
	font-size: 68.5%;
}
figure.effect-layla {
	// background: #18a367;
}

figure.effect-layla img {
	height: 390px;
	opacity:0.5
}

figure.effect-layla figcaption {
	padding: 3em;
}

figure.effect-layla figcaption::before,
figure.effect-layla figcaption::after {
	position: absolute;
	content: '';
	opacity: 0;
}

figure.effect-layla figcaption::before {
	top: 30px;
	right: 30px;
	bottom: 30px;
	left: 30px;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
	-webkit-transform: scale(0,1);
	transform: scale(0,1);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
}

figure.effect-layla figcaption::after {
	top: 30px;
	right: 30px;
	bottom: 30px;
	left: 30px;
	border-right: 1px solid #fff;
	border-left: 1px solid #fff;
	-webkit-transform: scale(1,0);
	transform: scale(1,0);
	-webkit-transform-origin: 100% 0;
	transform-origin: 100% 0;
}

figure.effect-layla h5 {
	padding-top: 26%;
	-webkit-transition: -webkit-transform 0.35s;
	transition: transform 0.35s;
}

figure.effect-layla p {
	padding: 0em 1em;
	text-transform: none;
	opacity: 0;
	-webkit-transform: translate3d(0,-10px,0);
	transform: translate3d(0,-10px,0);
}

figure.effect-layla img,
figure.effect-layla h5 {
	-webkit-transform: translate3d(0,-30px,0);
	transform: translate3d(0,-30px,0);
}

figure.effect-layla img,
figure.effect-layla figcaption::before,
figure.effect-layla figcaption::after,
figure.effect-layla p {
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
}

figure.effect-layla:hover img {
	opacity: 0.7;
	-webkit-transform: translate3d(0,0,0);
	transform: translate3d(0,0,0);
}

figure.effect-layla:hover figcaption::before,
figure.effect-layla:hover figcaption::after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

figure.effect-layla:hover h5,
figure.effect-layla:hover p {
	opacity: 1;
	-webkit-transform: translate3d(0,0,0);
	transform: translate3d(0,0,0);
}

figure.effect-layla:hover figcaption::after,
figure.effect-layla:hover h5,
figure.effect-layla:hover p,
figure.effect-layla:hover img {
	-webkit-transition-delay: 0.15s;
	transition-delay: 0.15s;
}
@media only screen and (min-width: 375px){
	.grid figure {
		position: relative;
		float: left;
		overflow: hidden;
		margin: 1% 1%;
		max-width: 48%;
		height:100%;
		text-align: center;
		cursor: pointer;
	}
}

@media only screen and (min-width: 730px){
	.grid figure {
		position: relative;
		float: left;
		overflow: hidden;
		margin: 1% 1%;
		max-width: 23%;
		height:100%;
		text-align: center;
		cursor: pointer;
	}
}
`
