import React, {Component} from 'react';
import Signup from '../components/Signup';
import styled from 'styled-components';

class SignupPage extends Component {
  render() {
    return (
      <div>
        <Signup></Signup>
        <Signup></Signup>
        <Signup></Signup>
      </div>
    )
  }
}

export default SignupPage;
