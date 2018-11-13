import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <p>This is coming from Page.</p>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {

};

export default Page;
