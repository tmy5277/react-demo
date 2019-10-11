import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import InputAndBtn from '../components/InputAndBtn'
import Clock from '../components/Clock'
import Timer from '../components/Timer'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import ErrorBoundary from '../components/ErrorBoundary'

function Home(props) {
  return (
    <div><h2>home - 123</h2></div>
  )
}

function About(props) {
  let { match } = props
  let routeClick = () => {
    props.history.push({
      pathname: "/about",
      search: "?a=222",
      query: { b: '333' },
      state: { c: '444' }
    })
  }
  return (
    <ErrorBoundary>
      <div><h2 onClick={routeClick}>{`about - ${match.params.msg ? match.params.msg : '123'}`}</h2></div>
    </ErrorBoundary>
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
    return (
        <>
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
          <div><Link to="/testDemo/test">Test</Link> <Link to={{
            pathname: "/testDemo/about",
            search: "a=0123",
            query: { b: '456' },
            state: { c: '789' }
          }}>About</Link> <Link to="/testDemo/todo">TODO</Link></div>
          <Switch>
            <Route exact path="/testDemo" component={Home} />
            <Route path="/testDemo/about" component={About} />
            <Route path="/testDemo/about/:msg" component={About} />
            <Route path="/testDemo/test"><div><Clock></Clock></div><div><Timer date={this.state.date} /></div></Route>
            <Route path="/testDemo/todo" component={TodoComponent} />
          </Switch>
        </>
    );
  }
}

export default TestDemo;
