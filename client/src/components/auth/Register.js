import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Zadaná hesla se neshodují.', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Registrace</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Jméno' name='name' value={name} onChange={(e) => handleChange(e)} required />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='E-mailová adresa' name='email' value={email} onChange={(e) => handleChange(e)} required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Heslo' minLength='6' name='password' value={password} onChange={(e) => handleChange(e)} required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Potvrď heslo' minLength='6' name='password2' value={password2} onChange={(e) => handleChange(e)} required />
        </div>
        <input type='submit' value='Založit účet' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Už más svůj účet? <Link to='/login'>Přihlas se</Link>.
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
