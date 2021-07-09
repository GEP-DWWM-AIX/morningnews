import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to="/screen-source"><Icon type="home" />Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screen-my-article"><Icon type="read" />My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/screen-home"><Icon type="logout" />Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
