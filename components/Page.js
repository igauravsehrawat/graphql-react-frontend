import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';
import styled from 'styled-components';

const MyButton = styled.button`
  background-color:red;
  font-size: 50px;
  .poop {
    font-size: 100px;
  }
`

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <p>This is coming from Page.</p>
        <MyButton>
          Click me!!
          <span className="poop">💩</span>
        </MyButton>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  // TODO:
};

export default Page;
