import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from './../../api';
import UsersList from '../UsersList';

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      users: [],
      currentPage: 1,
      error: null,
    };
  }

  loadUsers = () => {
    const { currentPage } = this.state;
    this.setState({
      isFetching: true,
    });
    getUsers({ page: currentPage }).then(
      data => {
        this.setState({
          users: data.results,
          isFetching: false,
        });
      },
      err => {
        this.setState({
          error: err,
          isFetching: false,
        });
      }
    );
  };

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { isFetching, users, error, currentPage } = this.state;

    if (error) {
      return <div>Loading...</div>;
    }
    if (isFetching) {
      return <div>Error...</div>;
    }
    return (
      <>
        <div>
          <button onClick={() => { this.loadUsers(1) }}>{currentPage}</button>
        </div>
        <ul>
          {users.map(u => (
            <li key={u.email}>{JSON.stringify(u, null, '\t')}</li>
          ))}
        </ul>
      </>
    );
  }
}
export default UsersLoader;
