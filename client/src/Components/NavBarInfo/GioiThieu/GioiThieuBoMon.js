import React, { Component } from 'react'
import styled from 'styled-components'
import $ from 'jquery'
import { } from './GioiThieu.css';

export default class GioiThieuBoMon extends Component {

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
      <Wrapper style={{textAlign:"justify"}}>
        <nav id="navbar" class="navbar" style={{paddingLeft: "0px",paddingRight: "0px",right: "385px",width: "130px",textAlign:"center"}}>
          <ul class="nav-menu">
            <li>
              <a data-scroll="vlth" href="#vlth" class="dot active">
                <span style={{marginRight:"20px",paddingLeft:"10px",paddingRight:"10px",width:"140px",textAlign:"center"}}>Vật lý tin học</span>
              </a>
            </li>
            <li>
              <a data-scroll="bmvlth" href="#bmvlth" class="dot">
                <span style={{marginRight:"20px",paddingLeft:"10px",paddingRight:"10px",width:"140px",textAlign:"center"}}>B.M Vật lý tin học</span>
              </a>
            </li>
            <li>
              <a data-scroll="mtvlth" href="#mtvlth" class="dot">
                <span style={{marginRight:"20px",paddingLeft:"10px",paddingRight:"10px",width:"140px",textAlign:"center"}}>Mục tiêu của ngành vật lý tin học</span>
              </a>
            </li>

          </ul>
        </nav>
        <section id="vlth" class="section">
          <div class="container">
            <div class="content-wrapper">
              <h6 id="item-1" className="title-style mt-4 text-center">VẬT LÝ TIN HỌC</h6>
              <p>
                - <strong>Vật lý Tin học</strong> là một ngành học kết hợp giữa các phần cốt lõi của ngành Vật lý
                        và ngành Khoa học máy tính. Chương trình của ngành Vật lý Tin học xây dựng trên
                        những kiến thức cơ bản của hai ngành học trên sao cho người học có được một nền
                        tảng vững chắc của hai ngành Vật lý và Khoa học máy tính, nắm bắt được sự giao nhau
                        của hai ngành học trên và có kiến thức về ứng dụng của máy tính trong một số lĩnh vực.
                            </p>

              <div className='text-center'>
                <img src="img/gioithieubomon.jpg" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
          <br />
        </section>
        <section id="bmvlth">
          <div class="container">
            <div class="content-wrapper">
              <h6 id="item-2" className="title-style mt-2 text-center">BỘ MÔN VẬT LÝ TIN HỌC</h6>
              <p>
                - <strong>Bộ môn Vật lý Tin học</strong> thuộc Khoa Vật lý  & Vật lý Kỹ thuật, Trường Đại học Khoa học Tự nhiên,
                    Đại học Quốc gia TPHCM được thành lập vào năm 1998 trên cơ sở 2 phòng thí nghiệm Vật Lý Đại
                    Cương (thuộc Bộ môn Vật Lý Ứng Dụng) của Trường Đại học Khoa học Tự nhiên và Ban Vật Lý của Trường
                    Đại học Đại cương (cũ). Khi thành lập chưa có chuyên ngành đào tạo về Vật lý Tin học. Sau hơn một năm
                    hoạt động, Bộ môn đã đi vào ổn định, nên đã xin trường cho phép mở chuyên ngành đào tạo Cử nhân Vật Lý
                    hướng Vật lý Tin học từ năm 1999. Mỗi năm số sinh viên theo học tại Bộ môn từ 20 đến 50 sinh viên.
                    Sau hơn mười năm đào tạo, đến nay Bộ môn được Đại học Quốc gia Tp.HCM cho phép đào tạo <a style={{ color: 'red' }}>
                  Cao học – chuyên ngành Vật lý Kỹ thuật</a> từ tháng 2/2010 với hai hướng nghiên cứu là Vật lý tính toán và Đo đạc từ xa.
                    </p>
            </div>
            <br />
          </div>
        </section>
        <section id="mtvlth">
          <div class="container">
            <div class="content-wrapper ">
              <h6 id="item-3" className="title-style text-center">MỤC TIÊU CỦA NGÀNH VẬT LÝ TIN HỌC</h6>
              <p>
                -<strong>Mục tiêu của ngành Vật lý Tin học </strong>nhằm đào tạo sinh viên có kiến thức cơ bản về Vật Lý và có kỹ năng cần thiết về
                                    Khoa học máy tính để có thể sử dụng máy tính có hiệu quả trong các cơ quan nghiên cứu, các nhà máy và cơ sở sản xuất,
                                    hoặc giảng dạy ở bậc Cao đẳng và Trung học.
                            </p>
            </div>
          </div>
        </section>



      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
@media only screen and (max-width: 1315px){
  .navbar  {
    display:none;
  }
}
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

.container {
  width: 100%;
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
}
.content {
  display: table-cell;
  width: 100%;
  vertical-align: middle;
}
.navbar {
  position: fixed;
  z-index: 999;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
}
.navbar .nav-menu {
  margin-left:30px;
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
#test,
#test .content-wrapper {
  min-height: 400px;
}
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

}

`
