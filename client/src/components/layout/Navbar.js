import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <nav className='navbar bg-dark'>
      <h1>Bingo</h1>
      {!loading && (
        <>
          {isAuthenticated ? (
            <ul>
              <li>
                <Link to='/admin/games'>Správa her</Link>
              </li>
              <li>
                <Link to='/admin/users'>Správa účtů</Link>
              </li>
              <li>
                <a href='#!' onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <span>anonymní uživatel</span>
          )}
        </>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
