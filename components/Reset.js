import React, { Component } from 'react'
import Form from './styles/Form';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import PropTypes from 'prop-types';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(
      resetToken: $resetToken,
      password: $password,
      confirmPassword: $confirmPassword,
    ) {
      id,
      name,
      email,
    }
  }
`;

export default class Reset extends Component {
  state = {
    password: '',
    confirmPassword: '',
  }
  static props = {
    resetToken: PropTypes.string.isRequired,
  }

  saveToState = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { data, error, loading }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              await resetPassword();
              this.setState({ password: '', confirmPassword: ''})
            }}>
              <fieldset>
                <p>Reset Password</p>
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
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Enter confirmPassword"
                  required={true}
                  onChange={this.saveToState}
                />
                <button type="submit">Reset My Password</button>
              </fieldset>
            </Form>)
        }}
      </Mutation>
    )
  }
}
