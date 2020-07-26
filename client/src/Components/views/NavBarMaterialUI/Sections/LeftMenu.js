import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="blog">
      <a href="/blog">Blog</a>
    </Menu.Item>
    <Menu.Item key="createBtc">
      <Link to='/blog/create'>Post Btc</Link>
    </Menu.Item>
    <Menu.Item key="createBtgv">
      <Link to='/blog1/create'>Post btgv</Link>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu