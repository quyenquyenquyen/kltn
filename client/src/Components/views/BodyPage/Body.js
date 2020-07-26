import React, { Component } from 'react'
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import BlogPage from '../BlogPage/BlogPage';
import InfoLandingPaper from './InfoLandingPaper/InfoLandingPaper';
import { Link } from 'react-router-dom';
import HoverEffect from '../Test/HoverEffect';

export default class Body extends Component {
    render() {
        return (
            <Wrapper>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ marginLeft: '0px' }}>
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner ">
                        <div className="carousel-item active ">
                            <img className="d-block w-100" src="img/picClass.jpg" alt="First slide" />
                            <div class="carousel-caption d-none d-md-block" style={{fontWeight:"bold",background:"black",padding:"0px"}}>
                                <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="img/myClass.jpg" alt="Second slide" />
                            <div class="carousel-caption d-none d-md-block" style={{fontWeight:"bold",background:"black",padding:"0px"}}>
                                <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="img/freeTime.jpg" alt="Third slide" />
                            <div class="carousel-caption d-none d-md-block" style={{fontWeight:"bold",background:"black",padding:"0px"}}>
                                <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <InfoLandingPaper className="ml-3" />
                <HoverEffect />
            </Wrapper>



        )
    }
}

const Wrapper = styled.nav`
.carousel-inner img {
    width: auto;
    height: 70%;
}
.carousel {
    position: relative;
    margin-left: 70px;
    margin-top: 15px;
}
`;