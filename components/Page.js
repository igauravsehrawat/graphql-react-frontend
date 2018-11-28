import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  red: '#FA0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px rgba(0, 0, 0, 0.01)',
}

const StyledPage = styled.div`
  background-color: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => props.theme.red};
`
class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <p>This is coming from Page.</p>
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

Page.propTypes = {
  // TODO:
};

export default Page;
