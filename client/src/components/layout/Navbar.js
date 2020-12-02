import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <>
      {!loading && (
        <>
          {isAuthenticated && (
            <nav className='navbar bg-dark'>
              <h1>Administrace</h1>
              <ul>
                <li>
                  <Link to='/admin/games'>Správa her</Link>
                </li>
                <li>
                  <Link to='/admin/users'>Správa účtů</Link>
                </li>
                <li>
                  <a href='#!' onClick={logout}>
                    Odhlásit se
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </>
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
