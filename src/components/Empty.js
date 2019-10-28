import React from 'react';
import { Empty } from 'antd'

class EmptyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  }
}

export default EmptyContainer;