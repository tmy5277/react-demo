import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions/index'

import { Collapse, Button, Icon } from 'antd'

import './index.scss'

const { Panel } = Collapse

const mapStateToProps = state => ({
  mainEntrance: state.menu.mainEntrance
})

const mapDispatchToProps = dispatch => ({
  userLogin: item => dispatch(userLogin(item))
})

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      snapshotMsg: 'this is snapshot'
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Home Updated')
  }
  componentWillUnmount() {
  }
  render() {
    let { mainEntrance, history: { push } } = this.props
    return (
      <section className="home-main">
        <Collapse bordered={false} className="home-collapse" expandIcon={(props) => {
          return <Icon type="setting" />
        }}>
          {
            mainEntrance.map((item, index) => {
              item.meta = item.meta || {}
              item.children = item.children || []
              let { isShow, disabled, name } = item.meta
              if (isShow) {
                return (<Panel disabled={disabled} header={name} key={item.path} className="home-collapse__panel">
                  {
                    item.children.map(child => {
                      child.meta = child.meta || {}
                      return <Button key={child.path} style={{
                        marginRight: '30px'
                      }} onClick={() => {push({ pathname: child.path })}}>{child.meta.name}</Button>
                    })
                  }
                </Panel>)
              } else {
                return null
              }
            })
          }
        </Collapse>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
