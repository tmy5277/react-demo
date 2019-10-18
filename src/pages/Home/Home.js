import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { PageHeader } from 'antd'
import { userLogin } from '../../redux/actions/index'

import './index.scss'

const mapStateToProps = state => ({
  account: state.login.account
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
    let { account, location } = this.props
    return (
      <section className="home-main">
        <Link to="/testDemo">{account}</Link>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
