import React from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutesMap } from '../utils/index'
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
    console.log('debug nextProps', nextProps)
    let { checkAuth, location: { pathname }} = nextProps
    checkAuth(pathname).then(res => {
      console.log('debug res', res)
    })
    return null
  }
  componentDidMount() {
    console.log(this)
  }
  render() {
    let { isLogin, item, location } = this.props
    const { auth } = item.meta
    return (auth && !isLogin)  ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: location.pathname }
      }} />
    ) : (
        <item.component {...this.props}>{item.children && item.children.length && (<>{renderRoutesMap(item.children)}</>)}</item.component>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
