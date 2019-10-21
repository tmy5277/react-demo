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
    let { mainEntrance } = this.props
    return (
      <section className="home-main">
        <Collapse bordered={false} className="home-collapse" expandIcon={(props) => {
          return <Icon type="setting" />
        }}>
          {
            mainEntrance.map((item, index) => {
              item.meta = item.meta || {}
              item.children = item.children || []
              if (item.meta.isShow) {
                return (<Panel disabled={item.meta.disabled} header={item.name} key={index} className="home-collapse__panel">
                  {
                    item.children.map(child => {
                      return <Button style={{
                        marginRight: '30px'
                      }}>{child.name}</Button>
                    })
                  }
                </Panel>)
              } else {
                return (<></>)
              }
            })
          }
        </Collapse>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
