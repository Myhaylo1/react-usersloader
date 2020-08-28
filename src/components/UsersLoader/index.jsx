import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getUsers} from './../../api';
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
    const {currentPage} = this.state;
    this.setState({
      isFetching: true,
    });
    getUsers({page: currentPage}).then(
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.currentPage !== prevState.currentPage){
      this.loadUsers()
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const {isFetching, users, error, currentPage} = this.state;

    if (error) {
      return <div>Error</div>;

    }
    if (isFetching) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div>
          <button onClick={() => {
            this.setState({
              currentPage: currentPage - 1,
            })
          }}>{currentPage - 1}</button>
          <button onClick={() => {
            this.setState({
              currentPage: currentPage + 1,
            })
          }}>{currentPage + 1}</button>
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
