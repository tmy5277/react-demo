import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd'
import './index.scss'

const { Header } = Layout
const { SubMenu } = Menu

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  account: state.login.account,
  topBar: state.menu.topBar
})

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    let { location: { pathname } } = props
    let tabIndex = pathname.split('/')[1] === 'testDemo' ? '1' : '0'
    this.state = {
      tabIndex
    }
  }
  handleTopMenuItemClick = (e) => {
    this.setState({
      tabIndex: e.key
    })
  }
  render() {
    let { isLogin, account, topBar } = this.props
    let { tabIndex } = this.state
    return isLogin ? (
      <Header className="navbar-header">
        <Link to="/login" className="navbar-header__link">{account}</Link>
        <Menu theme="dark" mode="horizontal" selectedKeys={[tabIndex]} onClick={this.handleTopMenuItemClick} className="navbar-menu">
          {
            topBar.map((item, index) => {
              let { path, name } = item
              return (
                <Menu.Item key={index} className="navbar-menu__item">
                  <NavLink to={path}>{name}</NavLink>
                </Menu.Item>
              )
            })
          }
          <SubMenu title="展开菜单" style={{lineHeight: '64px'}}>
            <Menu.Item key="sub1" className="navbar-menu__item">sub1</Menu.Item>
            <Menu.Item key="sub2" className="navbar-menu__item">sub2</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    ) : (<></>)
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))