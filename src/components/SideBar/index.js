import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Layout, Menu, Icon } from 'antd'
import style from './index.module.scss'

const { Sider } = Layout
const { SubMenu } = Menu

const mapStateToProps = state => ({
  mainEntrance: state.menu.mainEntrance
})

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    let sideBarKey = `/${props.location.pathname.split('/')[1]}`
    this.state = {
      sideBarKey
    }
  }
  render() {
    let { backgroundColor = '#fff', mainEntrance, history: { push } } = this.props
    return (
      <Sider style={{
        backgroundColor
      }}>
        <Menu mode="inline" className={style['sidebar-menu']} defaultSelectedKeys={this.state.sideBarKey}>
          {
            mainEntrance[0].children.map(item => {
              return (
                item.meta.isShow && (
                  <Menu.Item
                    key={item.path}
                    disabled={item.meta.disabled}
                    className={style['sidebar-menu__item']}
                    title={item.meta.name}
                    onClick={() => { push({ pathname: item.path }) }}>
                      {(<div><Icon type={item.meta.icon} /> {item.meta.name}</div>)}
                  </Menu.Item>
                )
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(connect(mapStateToProps)(SideBar))