import React, { Component } from 'react'
import Form from './styles/Form';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(
      email: $email,
      password: $password,
    ) {
      id,
      email,
      name,
    }
  }
`;

export default class Signin extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  saveToState = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={{
        ...this.state
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { data, error, loading }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ name: '', email: '', password: '' })
            }}>
              <fieldset>
                <p>Sign In</p>
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Enter email"
                  required={true}
                  onChange={this.saveToState}
                />
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Enter password"
                  required={true}
                  onChange={this.saveToState}
                />
                <button type="submit">Sign In</button>
              </fieldset>
            </Form>)
        }}
      </Mutation>
    )
  }
}
