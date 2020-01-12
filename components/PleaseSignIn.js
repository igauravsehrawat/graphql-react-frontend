import React, { Component } from 'react'
import {CURRENT_USER_QUERY} from '../components/User';
import SignIn from '../components/Signin';
import { Query } from 'react-apollo';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({data, loading}) => {
      if (loading) { return <p>Loading...</p>}
      if (!data.me) {
        return <div>
            <p>Please Sign In</p>
            <SignIn />
          </div>
      } else {
        return props.children
      }
    }}
  </Query>
)

export default PleaseSignIn;
