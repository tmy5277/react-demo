import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { checkLogin } from './redux/actions/login'
import $http from './fetch/index'

import ErrorBoundary from './components/ErrorBoundary'
import { Icon, Layout } from 'antd'
import NavBar from './components/NavBar/index'
import RouteRender from './router/index'

import './App.scss'

window.$http = $http

const { Content } = Layout;

const mapStateToProps = state => ({
  routesMap: state.menu.routesMap
})

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
    let { routesMap } = this.props
    return (
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Layout className="App-layout">
              <NavBar></NavBar>
              {/* <Sider width="260"></Sider> */}
              <Content>
                <Suspense fallback={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                  <RouteRender routes={routesMap} />
                </Suspense>
              </Content>
            </Layout>
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
