import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';
import styled from 'styled-components';

const StyledPage = styled.div`
  background-color: white;
  color: black;
`

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: red;
`

class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <p>This is coming from Page.</p>
        <Header />
        <Inner>
          {this.props.children}
        </Inner>
      </StyledPage>
    );
  }
}

Page.propTypes = {
  // TODO:
};

export default Page;
