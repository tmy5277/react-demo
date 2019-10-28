import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { asyncFetch } from '../../../redux/actions/common'

import { Table, Button } from 'antd'

import style from './index.module.scss'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  asyncFetch: item => dispatch(asyncFetch(item))
})

class Order1 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      columnOptions: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '200px'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: 'Operation',
          key: 'operation',
          render: (text, record, index) => (
            <Button>Operation</Button>
          )
        }
      ]
    }
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
    let { columnOptions } = this.state
    let order1Data = []
    for (let i = 0; i < 11; i++) {
      order1Data.push({
        name: `Order1 - ${i}`,
        age: 12 + Math.round((30 * Math.random())),
        key: i,
        address: Math.random() > 0.5 && `Order1 - ${i} Address: London park No.${i+1}`
      })
    }
    return (
      <section className={style["order-main"]}>
        <Table dataSource={order1Data} columns={columnOptions} pagination={{
          pageSize: 5
        }} />
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order1);
