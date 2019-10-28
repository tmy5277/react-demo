import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions/login'
import { Form, Icon, Input, Button } from 'antd';

import style from './index.module.scss'

const mailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)/

const mapStateToProps = state => ({
  account: state.login.account,
  password: state.login.password,
  isLogin: state.login.isLogin
})

const mapDispatchToProps = dispatch => ({
  userLogin: item => dispatch(userLogin(item))
})

class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.submitBtn = React.createRef()
  }
  componentDidMount() {
    console.log(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isLogin === true) {
      nextProps.history.replace({
        pathname: '/home'
      })
    }
    return null
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      snapshotMsg: 'this is snapshot'
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(11)
  }
  componentWillUnmount() {
  }
  handleSubmit = e => {
    e.preventDefault()
    let form = this.props.form
    form.validateFields((err, values) => {
      if (!err) {
        this.props.userLogin(values)
      }
    });
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { account, password, isLogin } = this.props
    // console.log(this.props)
    return (
      <section className={style["login-main"]}>
        <div className={style["login-wrapper"]}>
          <div className={style["login-title"]}><h2>Login Demo {this.props.isLogin}</h2>{`${account}-${password}-${isLogin}`}</div>
          <Form className={style["login-form"]} onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [{
                  required: true, pattern: mailReg, message: 'Please input your Account corrently!'
                }],
                validateTrigger: 'onBlur'
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Account"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, min: 8, message: 'Please input your Password corrently!' }],
                validateTrigger: 'onBlur'
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      // ref 触发按钮点击 不确定是否是常规写法
                      this.submitBtn.current.handleClick()
                    }
                  }}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={style["login-form-button"]} ref={this.submitBtn}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'normal_login' })(Login));
