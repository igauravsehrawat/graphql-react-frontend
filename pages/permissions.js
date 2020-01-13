import React, { Component } from 'react';
import Permissions from '../components/Permissions';
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
      id,
      name,
      email
      permissions,
    }
  }
`;

class PermissionsPage extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (data) {
            console.log('data is here', data);
            return <Table>
              <thead>
                <td>Name</td>
                <td>Email</td>
                {possiblePermissions.map(value => <td>{value}</td>)}
                <td>👇</td>
              </thead>
              <tr>
                {data.users.forEach(user => <Permissions user={user}/>)}
                {possiblePermissions.map(value => <td>
                </td>)}
                <td><SickButton>Update</SickButton></td>
              </tr>
            </Table>
          }
        }}
      </Query>
    )
  }
}

export default PermissionsPage;
