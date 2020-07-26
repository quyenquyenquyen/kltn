import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import styled from 'styled-components'

export default class InfoLandingPaper extends Component {
    render() {
        return (
            <Wrapper >
                {/* <Paper elevation={10} > */}
                        <p >
                            <strong>Vật lý Tin học</strong> là một ngành học kết hợp giữa các phần cốt lõi của ngành Vật lý và ngành Khoa học máy tính.
                            Chương trình của ngành Vật lý Tin học xây dựng trên những kiến thức cơ bản của hai ngành học trên sao cho 
                            người học có được một nền tảng vững chắc của hai ngành Vật lý và Khoa học máy tính, nắm bắt được sự giao nhau 
                            của hai ngành học trên và có kiến thức về ứng dụng của máy tính trong một số lĩnh vực.
                        </p>
                        <p>
                            <strong>Bộ môn Vật lý Tin học</strong> thuộc Khoa Vật lý & Vật lý Kỹ thuật, Trường Đại học Khoa học Tự nhiên, Đại học Quốc 
                            gia TPHCM được thành lập vào năm 1998 trên cơ sở 2 phòng thí nghiệm Vật Lý Đại Cương (thuộc Bộ môn Vật Lý Ứng Dụng) 
                            của Trường Đại học Khoa học Tự nhiên và Ban Vật Lý của Trường Đại học Đại cương (cũ). Khi thành lập chưa có chuyên 
                            ngành đào tạo về Vật lý Tin học. Sau hơn một năm hoạt động, Bộ môn đã đi vào ổn định, nên đã xin trường cho phép mở 
                            chuyên ngành đào tạo Cử nhân Vật Lý hướng Vật lý Tin học từ năm 1999. Mỗi năm số sinh viên theo học tại Bộ môn từ 20 đến 
                            50 sinh viên. Sau hơn mười năm đào tạo, đến nay Bộ môn được Đại học Quốc gia Tp.HCM cho phép đào tạo Cao học – chuyên ngành 
                            Vật lý Kỹ thuật từ tháng 2/2010 với hai hướng nghiên cứu là Vật lý tính toán và Đo đạc từ xa.
                        </p>
                        <p>
                        <strong>Mục tiêu của ngành Vật lý Tin học</strong> nhằm đào tạo sinh viên có kiến thức cơ bản về Vật Lý và có kỹ năng cần thiết về Khoa học 
                        máy tính để có thể sử dụng máy tính có hiệu quả trong các cơ quan nghiên cứu, các nhà máy và cơ sở sản xuất, hoặc giảng dạy 
                        ở bậc Cao đẳng và Trung học.
                        </p>
                {/* </Paper>     */}
            </Wrapper>
        
        )
    }
}

const Wrapper=styled.div`
p{
    font-size: 12pt;
    text-align: justify;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.width{
    max-width: 70%;
}

.ml{
    margin-left: 35px;
}


`