import React from 'react';
import PropTypes from 'prop-types';

const UserListItem = props => {
  const {
    onSelect,
    isSelected,
    user: { id, firstName, lastName },
  } = props;

  const styles = {
    backgroundColor: isSelected ? 'rgba(0,0,0,0.5)' : 'initial',
  };

  return (
    <li style={styles}>
      <span>{`${id}: ${firstName} ${lastName}`}</span>
      <button onClick={onSelect}>Select me</button>
    </li>
  );
};

export const userPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
});

UserListItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  user: userPropType,
};

UserListItem.defaultProps = {
  isSelected: false,
};

export default UserListItem;
