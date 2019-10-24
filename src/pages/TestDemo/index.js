import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import logo from '../../logo.svg';
import InputAndBtn from '../../components/InputAndBtn'
import Clock from '../../components/Clock'
import Timer from '../../components/Timer'
import AddTodo from '../../components/AddTodo'
import TodoList from '../../components/TodoList'

import '../../App.scss';

const mapStateToProps = state => ({
  isLogin: state.login.isLogin
})

function Home(props) {
  return (
    <div><h2>home - 123</h2></div>
  )
}

function About(props) {
  let { match } = props
  let routeClick = () => {
    props.history.push({
      pathname: `${match.url}/about/233`,
      search: "?a=222",
      query: { b: '333' },
      state: { c: '444' }
    })
  }
  return (
    <div><h2 onClick={routeClick}>{`about - ${match.params.msg ? match.params.msg : '123'}`}</h2></div>
  )
}

function TodoComponent() {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  )
}

class TestDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      timeNow: new Date(),
      timer: null
    }
  }
  componentDidMount() {
    console.log(this)
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
    console.log(this.props)
  }
  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }
  handleInputChange = (e) => {
    this.setState({
      date: new Date(e.target.value)
    })
  }
  render() {
    let { match } = this.props
    return (
      <>
        <div onClick={() => {
          window.$http.post('http://localhost:8092/v2/cms/account/permission/management/admin/create', {
            account: 'react',
            email: 'mingyu.tan@yff.com'
          })
        }}>{`${this.props.isLogin}`}</div>
        <img src={logo} className="App-logo" alt="logo" />
        <InputAndBtn placeholder='请输入YYYY/MM/DD的时间格式' handleInputChange={this.handleInputChange}>
          <div>
            {this.props.author ? this.props.author.split('').map((char, index) => <div key={index}>{char}</div>) : ''}
          </div>
          <div>{this.state.timeNow.toLocaleString()}</div>
        </InputAndBtn>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          </a>
        <section style={{ color: '#222' }}>
          <Link to={`${match.url}/test`}>Test</Link> <Link to={{
            pathname: `${match.url}/about`,
            search: "a=0123",
            query: { b: '456' },
            state: { c: '789' }
          }}>About</Link> <Link to={`${match.url}/todo`}>TODO</Link>
        </section>
        <section>
          <Switch>
            <Route exact path={`${match.url}`} component={Home} />
            <Route exact path={`${match.url}/about`} component={About} />
            <Route exact path={`${match.url}/about/:msg`} component={About} />
            <Route exact path={`${match.url}/test`}><div><Clock></Clock></div><div><Timer date={this.state.date} /></div></Route>
            <Route exact path={`${match.url}/todo`} component={TodoComponent} />
          </Switch>
        </section>
      </>
    );
  }
}

export default connect(mapStateToProps)(TestDemo);
