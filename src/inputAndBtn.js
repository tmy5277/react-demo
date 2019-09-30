import React from 'react';

class InputAndBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVal: ''
    }
  }
  handleInputChange = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }
  render() {
    return (
      <div className="app-time-input">
        <div>
          <input style={{ width: 200 }} value={this.state.inputVal} placeholder={this.props.placeholder} onChange={this.handleInputChange}></input>
          <div><button onClick={() => { this.props.handleBtnClick(this.state.inputVal) }}>确认</button></div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default InputAndBtn;
