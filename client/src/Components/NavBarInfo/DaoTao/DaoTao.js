import React, { Component } from 'react'
import styled from 'styled-components'
import $ from 'jquery'

export default class DaoTao extends Component {

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
                <nav id="navbar" class="navbar" style={{paddingLeft: "0px",paddingRight: "0px",right: "385px",width: "130px"}}> 
                    <ul class="nav-menu">
                        <li>
                            <a data-scroll="dtdh" href="#dtdh" class="dot active">
                                <span style={{marginRight:"20px",paddingLeft:"10px",paddingRight:"10px",width:"140px",textAlign:"center"}}>Đào tạo đại học</span>
                            </a>
                        </li>
                        <li>
                            <a data-scroll="dtch" href="#dtch" class="dot">
                                <span style={{marginRight:"20px",paddingLeft:"10px",paddingRight:"10px",width:"140px",textAlign:"center"}}>Đào tạo cao học</span>
                            </a>
                        </li>
                        
                    </ul>
                </nav>
                <section id="dtdh" class="section">
                    <div class="container">
                        <div class="content-wrapper">
                            <div style={{ textAlign: "center",marginTop:"30px" }}>
                                <h6 id="item-1" className="title-style">ĐÀO TẠO ĐẠI HỌC</h6>
                            </div>
                            <p >
                                - Mục tiêu của ngành Vật lý Tin học nhằm đào tạo sinh viên có kiến thức cơ bản
                                về Vật Lý và có kỹ năng cần thiết về Khoa học máy tính để có thể làm việc
                                hiệu quả trong các cơ quan nghiên cứu, các công ty lập trình web, PHP, android,
                                java, C/C++, ... các công ty lập trình nhúng, điều khiển tự động, thiết kế vi mạch,
                                IoTs, quản trị mạng, lập trình trên điện thoại di động, chẩn đoán hình ảnh y khoa,
                                kỹ thuật y sinh. Một số công ty có sinh viên chuyên ngành Vật lý Tin đang làm ciệc
                                như: Renesas, Mitsuba, Bosch, TMA, AMCC, E-Silicon, FPT, HPT, VinFast ...
                    </p>

                            <div className="text-center">
                                <h5>  CHƯƠNG TRÌNH ĐÀO TẠO ĐẠI HỌC
                         <br /> Chuyên ngành Vật lý Tin học</h5>
                            </div>
                            {/* TABLE */}
                            <div style={{ paddingLeft: '25px', paddingRight: '20px' }}>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Môn học</th>
                                            <th scope="col">Loại học phần</th>
                                            <th scope='col'>Lý thuyết</th>
                                            <th scope="col">Thực hành</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">A</th>
                                            <td>Môn chung</td>
                                            <td></td>
                                            <td colspan="2">33</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Hàm phức</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td> Phương pháp tính</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td> Các phương pháp toán lý</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td> Cơ lý thuyết</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Điện tử cơ bản</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>Cơ lượng tử 1</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td>Vật lý hạt nhân</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td> Điện động lực</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">9</th>
                                            <td> Vật lý chất rắn</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">10</th>
                                            <td>Vật lý thống kê</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">11</th>
                                            <td> Vật lý nguyên tử</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">12</th>
                                            <td>Thực tập vật lý đại cương II</td>
                                            <td>BB</td>
                                            <td scope="col"></td>
                                            <td scope="col">2</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td></td>
                                            <td scope="col">28</td>
                                            <td scope="col">5</td>
                                        </tr>


                                        {/* B */}
                                        <tr>
                                            <th scope="row">B</th>
                                            <td>Môn chuyên ngành</td>
                                            <td></td>
                                            <td colspan="2">31+6 (tự chọn)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">I</th>
                                            <td>Học ký II - Giai đoạn II</td>
                                            <td></td>
                                            <td colspan="2">11</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Vật lý tính toán</td>
                                            <td>BB</td>
                                            <td scope="col">1</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Kỹ thuật lập trình C</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td> Mạch điện tử và kỹ thuật số</td>
                                            <td>BB</td>
                                            <td scope="col">3</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Cơ sở dữ liệu</td>
                                            <td></td>
                                            <td scope="col">1</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td></td>
                                            <td scope="col">7</td>
                                            <td scope="col">4</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">II</th>
                                            <td>Học kỳ III - Giai đoạn II</td>
                                            <td></td>
                                            <td colspan="2">15</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Vi điều khiển</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td> Phân tích mạch</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td> Cấu trúc dữ liệu</td>
                                            <td>BB</td>
                                            <td scope="col">1</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td>Xử lý tín hiệu số</td>
                                            <td>BB</td>
                                            <td scope="col">1</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">9</th>
                                            <td>Lập trình hướng đối tượng C++	</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">10</th>
                                            <td>Lập trình Java</td>
                                            <td></td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>

                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td></td>
                                            <td scope="col">10</td>
                                            <td scope="col">5</td>
                                        </tr>

                                        {/* Học ky IV giai doan 2 */}
                                        <tr>
                                            <th scope="row">III</th>
                                            <td>Học kỳ IV - Giai đoạn II</td>
                                            <td></td>
                                            <td colspan="2">5+6 (tự chọn)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">11</th>
                                            <td>Thiết kế vi mạch</td>
                                            <td>tự chọn</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">12</th>
                                            <td>Mạng máy tính</td>
                                            <td>tự chọn</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">13</th>
                                            <td> Lập trình trên thiết bị di động</td>
                                            <td>tự chọn</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">14</th>
                                            <td>Phát triển ứng dụng web</td>
                                            <td>tự chọn</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">15</th>
                                            <td>Cảm biến và đo lường</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">4</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">16</th>
                                            <td>Thực tập thực tế (*)</td>
                                            <td>BB</td>
                                            <td scope="col"></td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td></td>
                                            <td scope="col">6</td>
                                            <td scope="col">5</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">IV</th>
                                            <td> Học kỳ V - Giai đoạn II (Sinh viên chọn chương trình Va hoặc Vb)</td>
                                            <td></td>
                                            <td colspan="2">10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Va</th>
                                            <td> Khóa luận tốt nghiệp</td>
                                            <td></td>
                                            <td scope="col"></td>
                                            <td scope="col">10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vb</th>
                                            <td>Chương trình Vb – (Học – seminar)</td>
                                            <td></td>
                                            <td scope="col"></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vb1</th>
                                            <td>Phát triển ứng dụng IoT</td>
                                            <td>BB</td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vb2</th>
                                            <td>Mô phỏng các bài toán trong vật lý</td>
                                            <td></td>
                                            <td scope="col">2</td>
                                            <td scope="col">1</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Vb3</th>
                                            <td>Thiết kế logic</td>
                                            <td></td>
                                            <td scope="col">2</td>
                                            <td scope="col">2</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <p>(*) Môn thực tập thực tế: Vào cuối năm thứ 3, sinh viên sẽ được giới thiệu đến các công ty, xí nghiệp để thực tập các chủ đề chuyên môn ứng dụng vào môi trường thực tế trong 2 tháng, điều này giúp cho sinh viên có kinh nghiệm cho việc tìm việc làm phù hợp sau tốt nghiệp.</p><br />
                        </div>
                    </div>
                </section>
                <section id="dtch">
                <div class="container">
                        <div class="content-wrapper">
                <div style={{ textAlign: "center",marginTop:"0px" }}>
                        <h6 id="item-2" className="title-style">ĐÀO TẠO CAO HỌC</h6>
                    </div>

                    <div className="text-center">
                        <h5>  CAO HỌC CHUYÊN NGÀNH “VẬT LÝ KỸ THUẬT”
                         <br /> (Hướng Vật lý Tin học – Khoa Vật lý & Vật lý Kỹ thuật) – Mã số: 60 52 04 01</h5>
                    </div>
                    <h5 id="item-1-1">Mục tiêu đào tạo</h5>
                    <p> - Mục tiêu đào tạo Thạc sĩ của chuyên ngành Vật lý Kỹ thuật (hướng Vật lý Tin học) nhằm cung cấp
                    các kiến thức vừa đảm bảo nâng cao vừa mang tính thiết thực và cập nhật hóa sao cho người học được
                    trang bị những kiến thức đáp ứng được các nhu cầu đòi hỏi chuyên sâu trong nghiên cứu khoa học và thực
                        tế sản xuất. Chương trình gồm hai hướng: <br />

                        <strong>Hướng thứ nhất</strong>: MÔ PHỎNG TÍNH TOÁN (Computational Physics)
                                - Việc mô phỏng các bài toán Vật lý và Kỹ thuật trên máy tính giúp cho việc tìm kiếm các thông số
                                tối ưu cho thực nghiệm, cũng như cung cấp những thông tin về các vấn đề mà thực nghiệm chưa thực
                                hiện được đang được áp dụng rộng rãi ở trong và ngoài nước. Hướng Vật Lý tính toán cung cấp các kỹ
                                thuật tính toán cũng như các kiến thức nâng cao để người học có thể giải quyết các bài toán Vật Lý
                                và Kỹ Thuật bằng máy tính. Do hướng Vật lý tính toán rất rộng; do đó, việc đào tạo không thể bao phủ
                                hết; trong giai đoạn trước mắt chỉ giới hạn trong các lĩnh vực vật liệu, vật lý hạt và hạt nhân và bài
                                toán trường thế trong địa vật lý; Xử lý ảnh, đặc biệt là ảnh y khoa. Các lĩnh vực này hiện đang có
                                 nhu cầu tính toán ở nước ta.<br />

                        <strong>Hướng thứ hai</strong>: Điện tử ứng dụng
                                Đây là một hướng quan trọng, chưa thấy các trường Đại học trong nước đào tạo chuyên sâu về hướng này.
                                 Để triển khai cần phải trang bị cho học viên các kiến thức về mạch điện tử, cảm biến, DSP,
                                 lý thuyết điều khiển, truyền và ghi nhận dữ liệu, hệ thống nhúng.<br /></p>

                    <h5 id="item-1-2">Đối tượng dự thi</h5>
                    <p>  - Sinh viên tốt nghiệp đại học có nhu cầu nâng cao trình độ chuyên môn đề làm công tác khoa học kỹ thuật,
                    giảng dạy hay làm luận án Tiến sĩ chuyên ngành đều có thế ghi danh dự tuyển vào cao học ngành Vật lý
                        Kỹ thuật (hướng Vật lý Tin học).<br /></p>
                    <p><strong>Đối tượng không phải bổ túc kiến thức</strong><br />
                    - Có bằng đại học chính qui: ngành Vật Lý, Sư phạm Vật lý, Vật lý kỹ thuật, Công nghệ Thông tin, Tin học,
                    Toán, Toán - Tin, Điện – Điện Tử, Điện Tử - Viễn Thông, Cơ Điện Tử, Công nghệ Vật liệu, Khoa học Vật liệu
                    của các trường đại học trong và ngoài nước.
                    </p>

                    <p><strong>Đối tượng phải bổ túc kiến thức</strong><br />
                    -    Sinh viên tốt nghiệp ngành Kỹ thuật Hệ thống Công nghiệp, Kỹ thuật Y sinh, Hải dương học, Môi trường, Kinh tế, Quản trị kinh doanh, ...  thuộc các trường đại học trong và ngoài nước. Các đối tượng này phải học các môn học chuyển đổi sau khi trúng tuyển (nếu môn học nào đã học trong chương trình đại học thì được miễn) như sau:
                    </p>

                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Môn học chuyển đổi</th>
                                    <th scope="col">số tiết học</th>
                                    <th scope="col">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Kỹ thuật lập trình</td>
                                    <td>45</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Mạch điện tử</td>
                                    <td>45</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Cảm biến và đo lường</td>
                                    <td >45</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p><strong> Đối tượng được xét chuyển tiếp sinh</strong><br />   Đối tượng xét chuyển tiếp sinh theo tiêu chuẩn quy định của Quy định Đào tạo Sau Đại Học của Đại học Quốc gia TPHCM, Trường Đại học Khoa Học Tự Nhiên TPHCM.</p><br />
                    <h5 id="item-1-3">Các môn thi tuyển</h5>

                    <p>
                        - Môn cơ bản: Toán cho Vật lý (theo chương trình thi tuyển dành cho ngành Vật Lý- Trường Khoa học Tự nhiên, Tp. HCM)<br />

                        - Môn cơ sở: Vật lý nguyên tử và điện tử<br />

                        -Ngoại ngữ (theo chương trình thi tuyển của Trường ĐH Khoa học Tự nhiên)<br />

                        Thời gian tổ chức ôn tập các môn thi tuyển theo qui định chung của Trường Khoa học Tự nhiên.<br />
                    </p>

                    <h5 id="item-1-4">Chương trình đào tạo</h5>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên môn học</th>
                                    <th scope="col">Lý thuyết</th>
                                    <th scope="col">Thực hành</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">A</th>
                                    <td>Kiến thức chung</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Triết học</td>
                                    <td>4</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td >Ngoại ngữ</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">B</th>
                                    <td>Kiến thức cơ sở và chuyên ngành</td>
                                    <td colspan="2">29</td>
                                </tr>
                                <tr>
                                    <th scope="row">I</th>
                                    <td >Môn học bắt buộc</td>
                                    <td colspan="2">14</td>
                                </tr>

                                <tr>
                                    <th scope="row">3</th>
                                    <td>Phương pháp NCKH</td>
                                    <td>2</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Vật lý tính toán</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Trí tuệ nhân tạo</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Xử lý ảnh</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Điều khiển</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>

                                <tr>
                                    <th scope="row">II</th>
                                    <td >Môn học tự chọn</td>
                                    <td colspan="2">15</td>
                                </tr>

                                <tr>
                                    <th scope="row">8</th>
                                    <td>Mô phỏng</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">9</th>
                                    <td>DSP</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>SCADA</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">11</th>
                                    <td>Thiết kế vi mạch</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">12</th>
                                    <td>Mạng tốc độ cao</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">13</th>
                                    <td>Truyền và nhận dữ liệu</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">14</th>
                                    <td>Lập trình song song</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">15</th>
                                    <td>Chuyển đổi tín hiệu và đo lường từ xa</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th scope="row">16</th>
                                    <td>Đồ án</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>

                                <tr>
                                    <th scope="row">C</th>
                                    <td >Luận văn</td>
                                    <td colspan="2">15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p style={{ fontWeight: 'italic' }}>(*) Thực hành có thể là bài tập, thực tập, seminar, …</p>

                    <p>- Trong các môn học trên, các môn Ngoại ngữ và Triết học (khối kiến thức chung) học cùng với các ngành khác theo chương trình của Trường ĐHKHTN; môn Phương pháp nghiên cứu khoa học học chung với các ngành khác của Khoa Vật lý & Vật lý kỹ thuật.<br />

                    - Môn Seminar do Bộ môn mời các GS, PGS, TS và Chuyên gia thuyết trình các vấn đề hiện đại liên quan đến các môn học của chuyên ngành. Môn học này giúp học viên tiếp cận với các vấn đề mới đang đặt ra trong nghiên cứu và sản xuất.<br />

                    - Môn đồ án, học viên thực hiện một đồ án dưới sự hướng dẫn của Giảng viên, sau đó trình bày trước lớp. Môn này để tập học viên làm quen với tham khảo tài liệu và viết một vấn đề khoa học cũng như trình bày một vấn đề khoa học trước tập thể. Đây là môn học chuẩn bị cho việc thực hiện luận văn ở học kỳ cuối. </p>

                    <h5 id="item-1-5">Điều kiện tốt nghiệp</h5>
                    <p>
                        - Hoàn thành đầy đủ các học phần cơ bản theo qui định của Bộ, qui định về chuyên môn cũng như ngoại ngữ.<br />

                        - Bảo vệ thành công luận văn thạc sĩ.</p>
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
