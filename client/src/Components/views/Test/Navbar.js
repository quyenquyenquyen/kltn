import React, { Component } from 'react';
import styled from 'styled-components';
import DropDownItem from './DropDownItem';
import {Link} from 'react-router-dom';


class Navbar extends Component {
    render() {
        return(
            <Wrapper>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className = "nav-link " >
                                    TRANG CHỦ
                                </Link> 
                            </li>

                            <DropDownItem 
                                name="GIỚI THIỆU"
                                drop1="GIỚI THIỆU"
                                drop2="VỀ BỘ MÔN"
                                drop3="NHÂN SỰ"
                                drop4="BAN CỐ VẤN"/>
                                

                            <DropDownItem 
                                name="ĐÀO TẠO"
                                drop1="ĐẠI HỌC"
                                drop2="THẠC SĨ"
                                drop3="TIẾN SĨ"/>
                            
                            <DropDownItem 
                                name="NGHIÊN CỨU - HỢP TÁC"
                                drop1="HƯỚNG NGHIÊN CỨU"
                                drop2="CÔNG TRÌNH KHOA HỌC"
                                drop3="HỢP TÁC"/>

                            <DropDownItem 
                                name="DANH SÁCH SV-HV-NCS"
                                drop1="ĐẠI HỌC"
                                drop2="CAO HỌC"
                                drop3="NGHIÊN CỨU SINH"/>

                            <DropDownItem 
                                name="LIÊN HỆ VÀ ĐÓNG GÓP Ý KIẾN"
                                drop1="LIÊN HỆ"
                                drop2="ĐÓNG GÓP Ý KIẾN"
                                drop3="CÂU HỎI THƯỜNG GẶP"/>

                            <Link to="/" className = "nav-link " >
                                THƯ VIỆN
                            </Link> 

                            <Link to="/" className = "nav-link " >
                                HỘI CỰU SINH VIÊN
                            </Link>

                            <Link to="/" className = "nav-link " >
                                LỊCH LÀM VIỆC
                            </Link>

                            <DropDownItem 
                                name="TUYỂN SINH ĐẠI HỌC 2020"
                                drop1="BROCHURE"
                                drop2="HỎI ĐÁP TUYỂN SINH"/>

                            <DropDownItem  
                                name="ĐĂNG BẢN TIN"
                                drop1="BẢN TIN CHUNG" link1="/postMessages"
                                drop2="BẢN TIN GIÁO VỤ"
                                drop3="BẢN TIN KHOA HỌC"/>
                        </ul>
                    </div>
                </nav>
            </Wrapper>
        );
    }
}


const Wrapper= styled.nav`
// .nav-link{
//     color:var(--mainWhite)!important;
//     text-tranform:capitalize;
// }
a:hover{
    color:white;
    background-color:var(--mainPurple);
    font-weight: bold;
    border-radius:5px;
    text-tranform:capitalize;
}
`;
export default Navbar;