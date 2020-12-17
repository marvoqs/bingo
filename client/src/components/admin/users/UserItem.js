import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DayJS from 'react-dayjs';

const UserItem = ({ user: { _id, name, email, lastlog } }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className='hide-sm'>{email}</td>
      <td className='hide-sm'>
        <DayJS format='D. M. YYYY H:mm'>{lastlog}</DayJS>
      </td>
      <td>{/*<Link to={`/admin/user/${_id}`} className='btn btn-warning'>
          <i className='fas fa-cog'></i>
        </Link>*/}</td>
    </tr>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
