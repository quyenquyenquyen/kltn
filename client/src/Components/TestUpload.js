import React, { Component } from 'react'
import styled from 'styled-components'

export default class TestUpload extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <Wrapper >
                <form className="md-form" >
                    <div className="file-field big">
                        <a className="btn-floating btn-lg pink lighten-1 mt-0 float-left">
                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                            <input type="file"   />
                        </a>
                        <div className="file-path-wrapper">
                          
                        </div>
                    </div>
                </form>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
margin-left:200px;
.file-field.big .file-path-wrapper {
    height: 3.2rem; }
    .file-field.big .file-path-wrapper .file-path {
    height: 3rem; }

`