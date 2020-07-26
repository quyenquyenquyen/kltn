import React, { Component,useEffect } from 'react'
import styled from 'styled-components'
import $ from 'jquery'

export default function Uploadfile(props){

    useEffect(() => {
        $("#FileInput").on('change',function (e) {
            var labelVal = $(".title").text();
            var oldfileName = $(this).val();
                fileName = e.target.value.split( '\\' ).pop();

                if (oldfileName == fileName) {return false;}
                var extension = fileName.split('.').pop();

            if ($.inArray(extension,['jpg','jpeg','png']) >= 0) {
                $(".filelabel i").removeClass().addClass('fa fa-file-image-o');
                $(".filelabel i, .filelabel .title").css({'color':'#208440'});
                $(".filelabel").css({'border':' 2px solid #208440'});
            }
            else if(extension == 'pdf'){
                $(".filelabel i").removeClass().addClass('fa fa-file-pdf-o');
                $(".filelabel i, .filelabel .title").css({'color':'red'});
                $(".filelabel").css({'border':' 2px solid red'});

            }
  else if(extension == 'doc' || extension == 'docx'){
            $(".filelabel i").removeClass().addClass('fa fa-file-word-o');
            $(".filelabel i, .filelabel .title").css({'color':'#2388df'});
            $(".filelabel").css({'border':' 2px solid #2388df'});
        }
            else{
                $(".filelabel i").removeClass().addClass('fa fa-file-o');
                $(".filelabel i, .filelabel .title").css({'color':'black'});
                $(".filelabel").css({'border':' 2px solid black'});
            }

            if(fileName ){
                if (fileName.length > 10){
                    $(".filelabel .title").text(fileName.slice(0,4)+'...'+extension);
                }
                else{
                    $(".filelabel .title").text(fileName);
                }
            }
            else{
                $(".filelabel .title").text(labelVal);
            }
        });
    }, [])
    
        return (
            <Wrapper>
                <label class="filelabel">
    <i class="fa fa-paperclip">
    </i>
    <span class="title">
        Add File
    </span>
    <input class="FileUpload1" id="FileInput" name="booking_attachment" type="file"/>
</label>
            </Wrapper>
        )
    
}

const Wrapper = styled.div`
.filelabel {
    width: 120px;
    border: 2px dashed grey;
    border-radius: 5px;
    display: block;
    padding: 5px;
    transition: border 300ms ease;
    cursor: pointer;
    text-align: center;
    margin: 0;
}
.filelabel i {
    display: block;
    font-size: 30px;
    padding-bottom: 5px;
}
.filelabel i,
.filelabel .title {
  color: grey;
  transition: 200ms color;
}
.filelabel:hover {
  border: 2px solid #1665c4;
}
.filelabel:hover i,
.filelabel:hover .title {
  color: #1665c4;
}
#FileInput{
    display:none;
}
`
