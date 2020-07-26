import React, { Component } from 'react'
import styled from 'styled-components'
import $ from 'jquery'

export default class ScrollSpy extends Component {

    componentDidMount() {
        $(function () {

            var link = $('#navbar a.dot');

            // Move to specific section when click on menu link
            link.on('click', function (e) {
                var target = $($(this).attr('href'));
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 600);
                $(this).addClass('active');
                e.preventDefault();
            });

            // Run the scrNav when scroll
            $(window).on('scroll', function () {
                scrNav();
            });

            // scrNav function 
            // Change active dot according to the active section in the window
            function scrNav() {
                var sTop = $(window).scrollTop();
                $('section').each(function () {
                    var id = $(this).attr('id'),
                        offset = $(this).offset().top - 1,
                        height = $(this).height();
                    if (sTop >= offset && sTop < offset + height) {
                        link.removeClass('active');
                        $('#navbar').find('[data-scroll="' + id + '"]').addClass('active');
                    }
                });
            }
            scrNav();
        });
    }
    render() {
        return (
            <Wrapper>
                <nav id="navbar" class="navbar">
                    <ul class="nav-menu">
                        <li>
                            <a data-scroll="cbch" href="#cbch" class="dot active">
                                <span>Cán bộ cơ hữu</span>
                            </a>
                        </li>
                        <li>
                            <a data-scroll="cbtg" href="#cbtg" class="dot">
                                <span>Cán bộ thỉnh giảng</span>
                            </a>
                        </li>

                    </ul>
                </nav>
                <section id="cbch" class="section">
                    <div class="container">
                        <div class="content-wrapper text-center">
                            <div style={{ textAlign: "center" }}>
                                <h6 id="item-1" className="title-style">CÁN BỘ CƠ HỮU</h6>
                            </div>

                            {/* TABLE */}
                            <div className="mt-3">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Hình ảnh</th>
                                            <th scope="col">Họ tên</th>
                                            <th scope="col">Học hàm/ Học vị</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Huỳnh Văn Tuấn</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>PGS. TS</td>
                                            <td>hvtuan@hcmus.edu.vn</td>
                                            <td>Trưởng bộ môn, Phó trưởng khoa</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Nguyễn Huỳnh Tuấn Anh</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>TS</td>
                                            <td>nhtanh@hcmus.edu.vn</td>
                                            <td>Trưởng PTN VLĐC2</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Nguyễn Chí Linh</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>TS</td>
                                            <td>nclinh@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Hồ Văn Bình</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>hvbinh@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Huỳnh Thanh Nhẫn</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>htnhan@hcmus.edu.vn</td>
                                            <td>Trưởng PTN VLĐC1</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">6</th>
                                            <td>Đỗ Đức Cường</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>ddcuong@hcmus.edu.vn</td>
                                            <td>NCS tại Hàn Quốc</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">7</th>
                                            <td>Hứa Thị Hoàng Yến</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>hthyen@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">8</th>
                                            <td>Phan Nguyệt Thuần</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>pnthuan@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">9</th>
                                            <td>Nguyễn Anh Huy</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>TS</td>
                                            <td>nahuy@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">10</th>
                                            <td>Nguyễn Vương Thùy Ngân</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>ThS</td>
                                            <td>nvtngan@hcmus.edu.vn</td>
                                            <td>NCS tại Mỹ</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">11</th>
                                            <td>Nguyễn Anh Thư</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>TS</td>
                                            <td>nathu@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">12</th>
                                            <td>Lâm Thị Yến</td>
                                            <td><img src='img/giaovien.png' style={{ border: '1px solid black' }} /></td>
                                            <td>TS</td>
                                            <td>ltyen@hcmus.edu.vn</td>
                                            <td>Giáo vụ BM</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="cbtg">
                    <div class="container">
                        <div class="content-wrapper text-center">
                            <div style={{ textAlign: "center" }}>
                                <h6 id="item-2" className="title-style">CÁN BỘ THỈNH GIẢNG</h6>
                            </div>
                            {/* TABLE */}
                            <div className="mt-3">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Họ tên</th>
                                            <th scope="col">Học hàm/ Học vị</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Đơn vị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Đặng Văn Liệt</td>
                                            <td>PGS. TS</td>
                                            <td>dangvanliet@gmail.com</td>
                                            <td>ĐH KHTN</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Dương Hoài Nghĩa</td>
                                            <td>PGS. TS</td>
                                            <td>dhnghia@hcmut.edu.vn</td>
                                            <td>ĐH Bách Khoa</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Trần Công Hùng</td>
                                            <td>TS</td>
                                            <td>conghung@pithcm.edu.vn</td>
                                            <td>Học viện Công nghệ Bưu chính Viễn thông</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Hoàng Minh Trí</td>
                                            <td>GVC. TS</td>
                                            <td></td>
                                            <td>ĐH Bách Khoa</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Lê Đình Việt Hải</td>
                                            <td>GV. ThS</td>
                                            <td>ldvhai@vnuhcm.edu.vn</td>
                                            <td>ĐHQG Tp.HCM</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">6</th>
                                            <td>Lê Hoài Bắc</td>
                                            <td>PGS.TS</td>
                                            <td>lhbac@hcmus.edu.vn</td>
                                            <td>Khoa Công nghệ Thông tin, ĐH KHTN</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </section>




            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
/* Global Styles */
* {
  box-sizing: border-box;
}
body {
  font-size: 14px;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  color: #333;
}
p {
  color: #565656;
  line-height: 1.8;
}
.section {
  min-height: 800px;
}
.container {
  width: 1170px;
  max-width: 90%;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.content-wrapper {
  width: 80%;
  margin: 0 auto;
  display: table;
  min-height: 800px;
}
.content {
  display: table-cell;
  width: 100%;
  vertical-align: middle;
}
/* End Global Styles */

/* Start Nav Styles */
.navbar {
  position: fixed;
  z-index: 999;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
}
.navbar .nav-menu {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.navbar .nav-menu li {
  position: relative;
  min-width: 200px;
  text-align: right;
}
.navbar .nav-menu li .dot {
  display: block;
  color: #fff;
  padding: 5px 0;
}
.navbar .nav-menu li .dot::before,
.navbar .nav-menu li .dot::after {
  display: block;
  position: absolute;
  content: '';
  border-radius: 50%;  
  top: 50%;  
  transition: all .3s ease;
}
.navbar .nav-menu li .dot::before {
  width: 5px;
  height: 5px;
  right: 0;
  border: 2px solid #181818;
  transform: translateY(-50%);
}
.navbar .nav-menu li .dot::after {
  width: 15px;
  height: 15px;
  border: 2px solid #2a2a72;
  right: -5px;
  transform: translateY(-50%) scale(0);
}
.navbar .nav-menu li .dot.active::before,
.navbar .nav-menu li:hover .dot::before {
  background: #2a2a72;
  border-color: #2a2a72;
}
.navbar .nav-menu li .dot.active::after,
.navbar .nav-menu li:hover .dot::after {
  transform: translateY(-50%) scale(1);  
}
.navbar .nav-menu li .dot span {
  display: inline-block;
  opacity: 0;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: capitalize;
  background-color: #2a2a72;
  padding: 10px 20px;
  border-radius: 3px;
  margin-right: 30px;
  transform: translateX(20px);
  transition: all .3s ease;
}
.navbar .nav-menu li .dot span::before {
  display: block;
  position: absolute;
  content: '';
  border-left: 7px solid #2a2a72;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  top: 50%;
  transform: translate(7px, -50%);
  right: 0;
  transition: all .3s ease;
}
.navbar .nav-menu li .dot.active span,
.navbar .nav-menu li:hover .dot span {
  transform: translateX(0px);
  opacity: 1;
}
/* End Nav Styles */

/* Start Home Styles */
#home {
  background-color: #f6f6f6;
}
#home button {
  border: 2px solid #ffc107;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  padding: 12px 25px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  transition: all .3s ease;
  margin-top: 20px;
}
#home button:hover {
  background-color: #ffc107;
  color: #fff;
}
/* End Home Styles */

/* Start About Styles */
#about .container {
  padding: 100px 0;
}
#about p {
  width: 60%;
  margin: 10px auto;
}
#about img {
  margin-top: 40px;
}
/* End About Styles */

/* Start Services Styles */
#services {
  background-color: #eee;
}
#services .services {
  margin: 40px auto;
}
#services .services .service {
  width: 50%;
  padding: 1%;
}

#services .text-right {
  float: right;
}
#services .text-left {
  float: left;
}
/* End Services Styles */

/* Start Testimonials Styles */
#test,
#test .content-wrapper {
  min-height: 400px;
}
/* End Testimonials Styles */

/* Start Contact Styles */
#contact {
  min-height: 600px;
  background-color: #222;
  color: #fff;
}
#contact .content-wrapper {
  min-height: 600px;
}
#contact p {
  color: #eee
}
#contact .mail {
  font-size: 30px;
  margin-top: 40px;
}
/* End Contact Styles */

/* Start Footer Styles */
footer {
  background-color: #000;
  padding: 40px 0;
}
footer p {
  margin: 0;
  color: #fff;
  font-size: 20px;
  letter-spacing: .5px;
  font-weight: 700;
}
/* End Footer Styles */



/**
*
*  I used Normalize.css to reset elements.
*  I used Autoprifixer to make sure that I'm using the necessary vendor prefixes.
*
**/

`
