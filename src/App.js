import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd'
import RouteGuard from './router/index'
import routes from './router/routeMap'

import './App.css'

function NoMatch() {
  return (
    <div><Icon type="warning" theme="twoTone" twoToneColor="red" /><h2 style={{ display: 'block', color: 'white' }}>404 Not Found</h2></div>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    // console.log(this)
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
            <Suspense fallback={<>Loading...</>}>
              <Switch>
                <Redirect exact from="/" to="/login" />
                  <RouteGuard routes={routes}/>
                <Route component={NoMatch} />
              </Switch>
            </Suspense>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
