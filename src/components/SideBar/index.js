import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Layout, Menu, Icon } from 'antd'
import './index.scss'

const { Sider } = Layout
const { SubMenu } = Menu

const mapStateToProps = state => ({
  mainEntrance: state.menu.mainEntrance
})

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { backgroundColor = '#fff', mainEntrance, history: { push } } = this.props
    return (
      <Sider style={{
        backgroundColor
      }}>
        <Menu mode="inline" onClick={this.handleTopMenuItemClick} className="sidebar-menu">
          {
            mainEntrance[0].children.map(item => {
              return (
                item.meta.isShow && <SubMenu key={item.path} disabled={item.meta.disabled} title={(<span><Icon type={item.meta.icon} /> {item.meta.name}</span>)} className="sidebar-menu__item">
                  {
                    item.children && item.children.length && item.children.map((child, index) => {
                      return (
                        child.meta.isShow && <Menu.Item key={child.path} className={`sidebar-menu__item`} disabled={child.meta.disabled} onClick={() => { push({ pathname: child.path }) }}>{child.meta.name}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(connect(mapStateToProps)(SideBar))