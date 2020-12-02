import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { deleteGame } from '../../../actions/game';

const GameItem = ({ auth, game: { _id, key, title, user, date }, deleteGame }) => {
  return (
    <tr>
      <td>{title ? <>{title}</> : <em>bez názvu</em>}</td>
      <td className='hide-sm'>{key}</td>
      <td className='hide-sm'>
        <DayJS format='D. M. YYYY H:mm'>{date}</DayJS>
      </td>
      <td>
        {!auth.loading && user === auth.user._id && (
          <button type='button' className='btn btn-danger' onClick={() => deleteGame(_id)}>
            <i className='fas fa-times'></i>
          </button>
        )}
      </td>
    </tr>
  );
};

GameItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteGame })(GameItem);
