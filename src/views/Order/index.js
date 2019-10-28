import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { asyncFetch } from '../../redux/actions/common'

import './index.scss'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  asyncFetch: item => dispatch(asyncFetch(item))
})

class Order extends React.PureComponent {
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
    let { children } = this.props
    return (
      <section className="order-main">
        123
        { children }
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
