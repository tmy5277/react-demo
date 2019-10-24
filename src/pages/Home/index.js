import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions/index'

import { Button } from 'antd'

import './index.scss'

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
    let { mainEntrance, history: { push }, children } = this.props
    return (
      <section className="home-main">
        <div>{children}</div>
        <div className="home-list">
          {
            mainEntrance.map(item => {
              return (
                <div key={item.path} className="home-list__item">
                  <h1>{item.meta.name}</h1>
                  {
                    (item.children && item.children.length) &&
                    <div className="home-list__item_block">
                      {
                        item.children.map(child => {
                          return child.meta.isShow && (<Button key={child.path} style={{
                            marginRight: '30px'
                          }} onClick={() => { push({ pathname: child.path }) }} disabled={child.meta.disabled}>{child.meta.name}</Button>)
                        })
                      }
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
