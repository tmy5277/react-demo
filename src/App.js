import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputAndBtn from './inputAndBtn'

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
      snapshotMsg: 'msg from snapshot'
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
  handleTimeInput = (val) => {
    this.setState({
      date: new Date(val)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <InputAndBtn placeholder='请输入YYYY-MM-DD的时间格式' handleBtnClick={this.handleTimeInput}>
            <div>
              {this.props.author.split('').map((char, index) => <div key={index}>{char}</div>)}
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
        </header>
      </div>
    );
  }
}

export default App;
