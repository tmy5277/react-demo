import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isLogin: state.login.isLogin
})

class RouterGuard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this)
  }
  render() {
    let { isLogin, routes } = this.props
    // console.log(this.props)
    return (
      <>
        {
          routes.map((item, index) => {
            return <Route key={item.path} path={item.path} exact={!!item.exact} render={props => {
              if (item.auth) {
                return (isLogin ? <item.component {...props} /> : <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }} />)
              } else {
                return (<item.component {...props} />) 
              }
            }} />
          })
        }
      </>
    );
  }
}

export default connect(mapStateToProps)(RouterGuard);
