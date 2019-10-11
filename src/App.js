import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd'
import TestDemo from './pages/TestDemo'
import Login from './pages/Login/Login'

function NoMatch() {
  return (
    <div><Icon type="warning" theme="twoTone" twoToneColor="red" /><h2 style={{display: 'block', color: 'white'}}>404 Not Found</h2></div>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
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
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route exact path="/login" component={Login} />
              <Route path="/home" component={TestDemo} />
              <Route path="/testDemo" component={TestDemo} />
              <Route component={NoMatch} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
