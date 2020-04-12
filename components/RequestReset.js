import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default class RequestReset extends Component {
  state = {
    email: '',
  };

  saveToState = e => {
    const { name, value } = e.target;
    console.log({ name, value });
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={{
          ...this.state,
        }}
      >
        {(requestReset, { data, error, loading, called }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await requestReset();
                this.setState({ email: '' });
              }}
              data-test="form"
            >
              <fieldset>
                <p>Reset Password</p>
                <Error error={error} />
                {!loading && !error && called && (
                  <p>Success, check your email!</p>
                )}
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Enter email"
                  required
                  onChange={this.saveToState}
                />
                <button type="submit">Reset My Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export { REQUEST_RESET_MUTATION };
