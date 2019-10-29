import React from 'react';
import { connect } from 'react-redux'
import { asyncFetch } from '../../redux/actions/common'
import { renderRoutesMap } from '../../utils/index'
import { Redirect } from 'react-router-dom';

import { Tabs, Button, AutoComplete, Icon, Input } from 'antd'
import style from './index.module.scss'

const { TabPane } = Tabs

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  asyncFetch: item => dispatch(asyncFetch(item))
})

class Order extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
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
  onSearch = searchText => {
    this.setState({
      dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],
    });
  }
  onSelect = item => {
    console.log(item)
  }
  onChange = key => {
    let { history: { push } } = this.props
    push({ pathname: key })
  }
  aaa = obj => {
    console.log(obj)
    return obj
  }
  render() {
    let { routes } = this.props
    console.log('debug this.props', this.props)
    return (
      <section className={style["order-main"]}>
        {
          routes.redirect && <Redirect from='/fund' to={{ pathname: '/fund/fundinfo' }}></Redirect>
        }
        <Tabs
          tabBarExtraContent={(
            <>
              <Button>添加基金</Button>
              <Button>删除</Button>
              <AutoComplete
                dataSource={this.state.dataSource}
                style={{ width: 200 }}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                placeholder="input here"
              >
                <Input suffix={<Icon type="search" />}/>
              </AutoComplete>
            </>
          )}
          tabBarStyle={{ textAlign: 'left' }}
          onChange={this.onChange}>
          {
            routes.children.map(item => {
              return (
                <TabPane tab={item.meta.name} key={item.path}>
                  {
                    renderRoutesMap([item])
                  }
                </TabPane>
              )
            })
          }
        </Tabs>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
