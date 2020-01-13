import React, { Component } from 'react'
import { Query } from 'react-apollo';
import {possiblePermissions} from '../pages/permissions';

const Permissions = props => (
  <div>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    {possiblePermissions.map(value => {
      return <td>
        <input type="checkbox" htmlFor='value' />
      </td>
    })}
  </div>
)

export default Permissions;
