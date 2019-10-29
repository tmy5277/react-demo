import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { checkAuth } from '../redux/actions/common'

const mapStateToProps = state => ({
  isLogin: state.login.isLogin
})

const mapDispatchToProps = dispatch => ({
  checkAuth: url => dispatch(checkAuth(url))
})

class RouterGuard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let { checkAuth, match: { path }, location: { pathname }} = nextProps
    if (path === pathname) {
      checkAuth(pathname).then(res => {
        console.log('debug pathname', pathname)
        console.log('debug match', nextProps.match.path)
        console.log('debug res', res)
      })
    }
    return null
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true
  // }
  componentDidMount() {
  }
  render() {
    let { isLogin, routes, location } = this.props
    const { auth } = routes.meta
    return (auth && !isLogin)  ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: location.pathname }
      }} />
    ) : (
        <routes.component {...this.props}></routes.component>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
