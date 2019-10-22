import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { checkLogin } from './redux/actions/index'

import { Icon, Layout } from 'antd'
import NavBar from './components/NavBar/index'
import RouteGuard from './router/index'

import './App.scss'

const { Sider, Content } = Layout;

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
      <Router>
        <div className="App">
          <Layout className="App-layout">
            <NavBar></NavBar>
            {/* <Sider width="260"></Sider> */}
            <Content>
              <Suspense fallback={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <RouteGuard routes={routesMap}/>
              </Suspense>
            </Content>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
