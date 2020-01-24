import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Error from '../components/ErrorMessage';
import Table from '../components/styles/Table';
import SickButton from '../components/styles/SickButton';
import PropTypes from 'prop-types';

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

export const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatedPermissions($userId: ID!, $permissions: [Permission]) {
    updatePermissions(
      userId: $userId,
      permissions: $permissions,
    ) {
      id,
      permissions,
    }
  }
`

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => {
      if (error) return <Error error={error} />
      if (loading) return <p>Loading...</p>
      if (data) {
        return (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(value => <th key={value}>{value}</th>)}
              <th>👇</th>
            </tr>
          </thead>
            <tbody>{data.users.map(user => <UserPermissions user={user} key={user.id} />)}</tbody>
        </Table>
        )
      }
    }}
  </Query>
)

class UserPermissions extends Component {
  static propTypes = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired;

  state = {
    permissions: this.props.user.permissions,
  }

  handlePermissionChange = (e, updatePermissions) => {
    console.log(e.target.value, e.target, e.target.checked);
    const value = e.target.value;
    const checked = e.target.checked;
    let updatedPermissions = [...this.state.permissions];
    if (checked) {
      updatedPermissions.push(e.target.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== value);
    }
    this.setState({
      permissions: updatedPermissions,
    }, updatePermissions);
  };

  render() {
    const {id, name, email} = this.props.user;

    return (
      <Mutation
      mutation={UPDATE_PERMISSIONS_MUTATION}
      variables={{
        userId: this.props.user.id,
        permissions: this.state.permissions
        }}
        >
          {(updatePermissions, {loading, error, data}) => {
          return <>
          {error &&
          <tr>
            <td colSpan="8">
              <Error error={error}/>
            </td>
          </tr>
          }
          <tr>
            <td>{name}</td>
            <td>{email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                <label htmlFor={`${id}-permission-${permission}`}>
                  <input id={`${id}-permission-${permission}`} type='checkbox' checked={this.state.permissions.includes(permission)}
                    value={permission}
                    onChange={(e) => this.handlePermissionChange(e, updatePermissions)}
                    // the passing the mutation outside
                    />
                </label>
              </td>
              ))}
            <td>
              <SickButton type="button" disabled={loading} onClick={updatePermissions}
              >Updat{loading? 'ing': 'e'}</SickButton></td>
          </tr>
          </>
          }}
      </Mutation>
    )

  }
}

export default Permissions;
