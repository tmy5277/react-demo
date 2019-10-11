import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions/index'
import { Form, Icon, Input, Button } from 'antd';

import './index.scss'

const mailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)/

const mapStateToProps = state => ({
  account: state.account,
  pwd: state.pwd
})

const mapDispatchToProps = dispatch => ({
  userLogin: item => dispatch(userLogin(item))
})

class Login extends React.Component {
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
    let { getFieldDecorator } = this.props.form
    return (
      <section className="login-wrapper">
        <div className="login-title"><h2>Login Demo</h2></div>
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{
                required: true, pattern: mailReg, message: 'Please input your Account correctly!'
              }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Account"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 8, max: 16, message: 'Please input your Password correctly!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
}

const loginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
