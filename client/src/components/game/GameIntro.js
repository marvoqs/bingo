import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Game intro component
const GameIntro = ({ game: { game }, startGame }) => {
  const { timelimit, numoftips } = game;
  return (
    <>
      <p>
        Po obdržení tiketu budeš mít {timelimit} sekund, abys označil {numoftips} políček.
      </p>
      <button className='btn btn-primary my-2' onClick={() => startGame()}>
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

export default connect(mapStateToProps)(GameIntro);
