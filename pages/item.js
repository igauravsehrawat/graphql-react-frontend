import React, { Component } from 'react';
import SingleItem from '../components/SingleItem';

class item extends Component {
  render() {
    return (
      <div>
        Item it is!!
        {/*
          Note: You can convert this Component to stateless component and just use props
          instead of props.query
         */}
        <SingleItem id={this.props.query.id} />
      </div>
    );
  }
}

export default item;
