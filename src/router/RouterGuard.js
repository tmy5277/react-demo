import React from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutesMap } from './routerUtils'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isLogin: state.login.isLogin
})

class RouterGuard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: true
    }
  }
  componentDidMount() {
    console.log(this)
  }
  render() {
    let { isLogin, item, location } = this.props
    const { auth } = item.meta
    return ((auth && !isLogin) || !this.state.check) ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: location.pathname }
      }} />
    ) : (
        <item.component {...this.props}>{item.children && item.children.length ? (<>{renderRoutesMap(item.children)}</>) : null}</item.component>
      )
  }
}

export default connect(mapStateToProps)(RouterGuard);
