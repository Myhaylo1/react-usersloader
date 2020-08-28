import React from 'react';
import PropTypes from 'prop-types';

import UserListItem, { userPropType } from './UserListItem';

const UsersList = props => {
  const { users, setUsers } = props;

  const onUserSelectHandler = index => {
    const newUsers = [...users];
    newUsers[index].isSelected = !newUsers[index].isSelected;
    setUsers(newUsers);
  };

  const mapUser = (user, index) => <UserListItem key={user.id} user={user} />;

  return <ul>{users.map(mapUser)}</ul>;
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
};

export default UsersList;
