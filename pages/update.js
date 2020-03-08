import React, { Component } from 'react';
import UpdateItem from '../components/UpdateItem';

class update extends Component {
  render() {
    return (
      <div>
        <UpdateItem id={this.props.query.id} />
      </div>
    );
  }
}

export default update;
