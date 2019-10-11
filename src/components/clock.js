import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date().toLocaleString(),
      timer: null
    }
  }
  componentDidMount() {
    let timer = setInterval(() => {
      this.setState({
        time: new Date().toLocaleString()
      })
    }, 1000)
		this.setState({
		  timer
		})
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  render() {
    return (
      <div className="app-time-clock">{this.state.time}</div>
    );
  }
}

export default Clock;
