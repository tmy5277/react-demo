import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import InputAndBtn from './components/inputAndBtn'
import Clock from './components/clock'
import AddTodo from './components/addTodo'
import TodoList from './components/todoList'

function Home() {
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

function NoMatch() {
	return (
		<div><h2>NoMatch</h2></div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date()
		}
	}
	componentDidMount() {
		console.log('componentDidMount')
		// this.setState({
		//   date: new Date('1996-04-04') 
		// })
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('getDerivedStateFromProps')
		console.log('nextProps:', nextProps)
		console.log('prevState', prevState)
		return null
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate')
		console.log('nextProps', nextProps)
		console.log('nextState', nextState)
		return true
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('getSnapshotBeforeUpdate')
		console.log('prevProps', prevProps)
		console.log('prevState', prevState)
		return {
			snapshotMsg: 'this is snapshot'
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('componentDidUpdate')
		console.log('prevProps', prevProps)
		console.log('prevState', prevState)
		console.log('snapshot', snapshot)
	}
	componentWillUnmount() {
		console.log('componentWillUnmount')
	}
	handleInputChange = (e) => {
		this.setState({
			date: new Date(e.target.value)
		})
	}
	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<InputAndBtn placeholder='请输入YYYY/MM/DD的时间格式' handleInputChange={this.handleInputChange}>
							<div>
								{this.props.author ? this.props.author.split('').map((char, index) => <div key={index}>{char}</div>) : ''}
							</div>
							<div>{this.state.date.toLocaleString()}</div>
						</InputAndBtn>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
            </a>
						<div><Link to="/test">Test</Link> <Link to={{
							pathname: "/about",
							search: "a=0123",
							query: { b: '456' },
							state: { c: '789' }
						}}>About</Link> <Link to="/todo">TODO</Link></div>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
							<Route path="/about/:msg" component={About} />
							<Route path="/test"><Clock date={this.state.date} /></Route>
							<Route path="/todo" component={TodoComponent} />
							<Route component={NoMatch} />
						</Switch>
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
