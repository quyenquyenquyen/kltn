import { Link } from 'react-router-dom';
import styled from 'styled-components';

import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
                <FooterWrapper>

                    <div className="mt-3 pt-5 pb-3 footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-xs-12 about-company">
                                    <h2 >About us</h2>
                                    <p className="text-white-50">Bộ môn Vật Lý Tin Học, Khoa Vật Lý - Vật Lý Kỹ Thuật <br/> Phòng E304, Tòa nhà E, Trường Đại Học Khoa Học Tự Nhiên <br/> Website: www.phys.hcmus.edu.vn/vlth </p>
                                    <p>
                                        <a href="#"><i className="fa fa-facebook-square mr-2"></i></a>
                                        <a href="#"><i className="fa fa-skype mr-2"></i></a>
                                        <a href="#"><i className="fa fa-envelope-square mr-2"></i></a>
                                    </p>
                                </div>
                                <div className="col-lg-3 col-xs-12 links">
                                    <h4 className="mt-lg-0 mt-sm-3">Liên kết</h4>
                                    <ul className="m-0 p-0">
                                    <li>- <a href="#">Lorem ipsum</a></li>
                                    <li>- <a href="#">Nam mauris velit</a></li>
                                    <li>- <a href="#">Etiam vitae mauris</a></li>
                                    <li>- <a href="#">Fusce scelerisque</a></li>
                                    <li>- <a href="#">Sed faucibus</a></li>
                                    <li>- <a href="#">Mauris efficitur nulla</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-xs-12 location">
                                <h4 className="mt-lg-0 mt-sm-4 ">Địa chỉ</h4>
                                <p>227, Nguyễn Văn Cừ, P7, Q5, TP.Hồ Chí Minh</p>
                                <p className="mb-0"><i className="fa fa-phone mr-3"></i>08-38-304092</p>
                                <p><i className="fa fa-envelope-o mr-3"></i>hcmphy@edu.com</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col copyright">
                                    <p className="">
                                        <small className="text-white-50">© 2020. All Rights Reserved.<br/> </small>
                                        <small className="text-white-50">Design by 1613163.</small>   
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </FooterWrapper>

        )
    }
}


const FooterWrapper = styled.nav`
.footer{
    margin:0;
    background: #2a2a72;
    color:white;

    .links{
      ul {list-style-type: none;}
      li a{
        color: white;
        transition: color .2s;
        &:hover{
          text-decoration:none;
          color:#2a2a72;
          }
      }
      h4{
        color:white;
        font-weight:bold;
        }
    }  
  .about-company{
    //fontsize of fa fa-icon
    i{font-size: 40px;}
    a{
      color:white;
      transition: color .2s;
      &:hover{color:#4180CB}
    }
    h2{
        color:white;
        font-weight:bold;
    }
   
  } 
  .location{
    i{font-size: 18px;}
    h4{
        color:white;
        font-weight:bold;
    }
  }
  .copyright p{border-top:1px solid rgba(255,255,255,.1);} 
}
`;
