import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Přihlášení</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input type='email' placeholder='E-mailová adresa' name='email' value={email} onChange={(e) => handleChange(e)} required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Heslo' minLength='6' name='password' value={password} onChange={(e) => handleChange(e)} required />
        </div>
        <input type='submit' value='Přihlásit se' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Ještě nemáš svůj účet? <Link to='/register'>Založ si ho</Link>.
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
