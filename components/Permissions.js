import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../components/ErrorMessage';
import Table from '../components/styles/Table';
import SickButton from '../components/styles/SickButton';

export const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

export const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;


const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => {
      if (error) return <Error error={error} />
      if (loading) return <p>Loading...</p>
      if (data) {
        return (
        <Table>
          <thead>
            <td>Name</td>
            <td>Email</td>
            {possiblePermissions.map(value => <td>{value}</td>)}
            <td>👇</td>
          </thead>
            <tbody>{data.users.map(user => <User user={user}/>)}</tbody>
        </Table>
        )
      }
    }}
  </Query>
)

class User extends Component {
  render() {
    const {id, name, email} = this.props.user;

    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
          {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type='checkbox' />
            </label>
          </td>
          ))}
        <td><SickButton>Update</SickButton></td>
      </tr>
    )

  }
}

export default Permissions;
