import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Icon } from 'antd'
import { urlHandler, renderRoutesMap } from '../utils/index'

function NoMatch({ location: { search } }) {
  let pathName = urlHandler.getUrlObj(search).from
  // console.log(pathName)
  return (
    <div><Icon type="warning" theme="twoTone" twoToneColor="red" /><h2 style={{ display: 'block' }}>{`${pathName ? pathName : 404} Not Found`}</h2></div>
  )
}

class RouterRender extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this)
  }
  render() {
    let { routes } = this.props

    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {
            renderRoutesMap(routes)
          }
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default RouterRender;
