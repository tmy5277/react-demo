import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '',
      timer: null
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('debug this.state.timer', this.state.timer)
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
    if (nextProps.date instanceof Date && nextProps.date.toString() !== 'Invalid Date') {
      let dd = nextProps.date.getTime()
      let timer = setInterval(() => {
        dd += 1000
        this.setState({
          time: new Date(dd).toLocaleString()
        })
      }, 1000)
      this.setState({
        timer
      })
    }
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

export default Timer;
