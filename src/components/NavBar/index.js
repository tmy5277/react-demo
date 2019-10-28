import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd'
import style from './index.module.scss'

const { Header } = Layout
const { SubMenu } = Menu

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  account: state.login.account,
  baseRoutes: state.menu.baseRoutes,
  mainEntrance: state.menu.mainEntrance
})

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    let { location: { pathname } } = props
    let tabIndex = `/${pathname.split('/')[1]}`
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
    let { isLogin, account, baseRoutes, mainEntrance, history: { push } } = this.props
    let { tabIndex } = this.state
    return isLogin && (
      <Header className={style["navbar-header"]}>
        <Link to="/login" className={style["navbar-header__link"]}>{account}</Link>
        <Menu theme="dark" mode="horizontal" selectedKeys={[tabIndex]} onClick={this.handleTopMenuItemClick} className={style["navbar-menu"]}>
          {
            baseRoutes.filter(item => item.path !== '/login').map(item => {
              let { path, meta } = item
              return (
                <Menu.Item key={path} className={style["navbar-menu__item"]}>
                  <NavLink to={path}>{meta.name}</NavLink>
                </Menu.Item>
              )
            })
          }
          {
            mainEntrance[0].children.map(item => {
              return (
                item.meta.isShow && <SubMenu key={item.path} disabled={item.meta.disabled} title={item.meta.name} className={style["navbar-menu__item"]}>
                  {
                    item.children && item.children.length && item.children.map((child, index) => {
                      return (
                        child.meta.isShow && <Menu.Item key={child.path} disabled={child.meta.disabled} className={style["navbar-menu__item"]} onClick={() => {push({ pathname: child.path })}}>{child.meta.name}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Header>
    )
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))