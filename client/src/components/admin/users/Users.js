import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../../actions/user';

const Users = ({ getUsers, user: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='my-1'>
        {/* <div className='float-buttons'>
          <Link to='/admin/users/create' className='btn btn-success'>
            Vytvořit účet
          </Link>
        </div> */}
        <h2>Správa účtů</h2>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Jméno</th>
            <th className='hide-sm'>E-mail</th>
            <th className='hide-sm'>Poslední přihlášení</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(Users);
