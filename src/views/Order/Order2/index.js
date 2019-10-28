import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { asyncFetch } from '../../../redux/actions/common'

import { Result } from 'antd'

import style from './index.module.scss'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  asyncFetch: item => dispatch(asyncFetch(item))
})

class Order2 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
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
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <section className={style["order-main"]}>
        <Result
          status="404"
          title="Not Found"
          subTitle="Sorry, Page Not Found."
        />
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order2);
