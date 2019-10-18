import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { checkLogin } from './redux/actions/index'

import { Icon } from 'antd'
import RouteGuard from './router/index'
import routes from './router/routeMap'

import './App.css'

const mapDispatchToProps = dispatch => ({
  checkLogin: () => dispatch(checkLogin())
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.checkLogin()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      snapshotMsg: 'this is snapshot'
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Suspense fallback={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
              <RouteGuard routes={routes}/>
            </Suspense>
          </header>
        </div>
      </Router>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
