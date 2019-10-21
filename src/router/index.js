import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { urlHandler } from '../utils/index'

function NoMatch({location: {search}}) {
  let pathName = urlHandler.getUrlObj(search).from
  // console.log(pathName)
  return (
    <div><Icon type="warning" theme="twoTone" twoToneColor="red" /><h2 style={{ display: 'block', color: 'white' }}>{`${pathName ? pathName : 404} Not Found`}</h2></div>
  )
}

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
    // console.log(isLogin)
    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {
            routes.map((item, index) => {
              item.meta = item.meta || {}
              const { exact, auth } = item.meta
              return <Route key={index} path={item.path} exact={!!exact} render={props => {
                if (auth) {
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
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default connect(mapStateToProps)(RouterGuard);
