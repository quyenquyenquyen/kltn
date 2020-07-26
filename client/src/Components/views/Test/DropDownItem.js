import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class DropDownItem extends Component {
    render() {
        return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item">
                             <Link to={this.props.link1}>{this.props.drop1}</Link>
                        </a>
                        <a className="dropdown-item">
                             <Link to={this.props.link2}>{this.props.drop2}</Link>
                        </a>
                        <a className="dropdown-item">
                             <Link to={this.props.link3}>{this.props.drop3}</Link>
                        </a>
                        <a className="dropdown-item">
                             <Link to={this.props.link4}>{this.props.drop4}</Link>
                        </a>
                        <a className="dropdown-item">
                             <Link to={this.props.link5}>{this.props.drop5}</Link>
                        </a>
                    </div>
                </li>
        )
    }
}
