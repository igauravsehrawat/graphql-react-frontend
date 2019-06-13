import React, { Component } from 'react'
import Form from './styles/Form';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(
      name: $name,
      email: $email,
      password: $password,
    ) {
      name,
      email,
    }
  }
`;

export default class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  saveToState = (e)=> {
    const {name, value} = e.target;
    console.log({name, value});
    this.setState({ [name]:  value });
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={{
        ...this.state
      }}>
      {(signup, {data, error, loading}) => {
        if (error) return <Error error={error} />
        if (loading) return <p>Loading...</p>
        return (
        <Form method="post" onSubmit={async (e) => {
          e.preventDefault();
          const res = await signup();
          console.log(res);
        }}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Enter name"
              required={true}
              onChange={this.saveToState}
            />
            <label htmlFor="email">email</label>
            <input
              id="email"
              name="email"
              type="text"
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
            <button type="submit">Sign Up Now!!</button>
          </fieldset>
        </Form>)
        }}
      </Mutation>
    )
  }
}
