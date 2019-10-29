import React, { Suspense } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { Layout, Icon } from 'antd'
import { renderRoutesMap } from '../../utils/index'

import SideBar from '../../components/SideBar/index'
import style from './index.module.scss'

const { Content } = Layout

class MainContent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
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
    console.log('debug', 123)
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <>
        <Layout>
          <SideBar width="260" backgroundColor="#fff"></SideBar>
          <Content className={style["content-main"]}>
            <Suspense fallback={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
              {
                renderRoutesMap(this.props.routes.children)
              }
            </Suspense>
          </Content>
        </Layout>
      </>
    );
  }
}

export default MainContent;
