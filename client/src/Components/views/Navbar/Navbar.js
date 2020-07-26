import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
    render() {
        return (
            <Wrapper>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div>
                       
                        <div className="navbar-brand text-center" >
                            <h6 style={{color:'white'}}>KHOA VẬT LÝ - VẬT LÝ KỸ THUẬT</h6>
                            <h6 style={{color:'white'}}>BỘ MÔN VẬT LÝ TIN HỌC</h6>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>HOME <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog/create">POST-BTC</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog1/create">POST-BTGV</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    GIỚI THIỆU
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/gioithieubomon">VỀ BỘ MÔN</Link>
                                    <Link className="dropdown-item" to="/gioithieunhansu">VỀ NHÂN SỰ</Link>
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/daotao">ĐÀO TẠO</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </Wrapper>
        )
    }
}

const Wrapper = styled.nav`

background:var(--mainBlue);

li{
     padding:10px;
     font-size:1.0rem;
    }
}  
`
