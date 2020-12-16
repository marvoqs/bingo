import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getTicket } from '../../actions/ticket';

// Game intro component
const GameIntro = ({ game: { game }, getTicket }) => {
  const { timelimit, numoftips } = game;
  return (
    <>
      <p>
        Po obdržení tiketu budeš mít {timelimit} sekund, abys označil {numoftips} políček.
      </p>
      <button className='btn btn-primary my-2' onClick={() => getTicket(game._id)}>
        Získat tiket
      </button>
    </>
  );
};

GameIntro.propTypes = {
  game: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getTicket })(GameIntro);
