import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AuthProvider from './Context/AuthContext';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: positions.BOTTOM_RIGHT
  };

ReactDOM.render(<Provider template={AlertTemplate} {...options}><AuthProvider><App /></AuthProvider></Provider>, document.getElementById('root'));

