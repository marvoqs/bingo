import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Actions
import { getGameByKey } from '../../actions/game';

// Components
import Spinner from '../layout/Spinner';
import GameIntro from './GameIntro';
import GameTicket from './GameTicket';

// Game component
const Game = ({
  match: {
    params: { gameKey },
  },
  game: { game, loading },
  getGameByKey,
}) => {
  const [isStarted, setIsStarted] = useState(false);

  // Load game
  useEffect(() => {
    getGameByKey(gameKey);
  }, [getGameByKey, gameKey]);

  // Show spinner until game is loaded
  if (loading) {
    return <Spinner />;
  }

  // Check if game exists
  if (!loading && game === null) {
    return <p>Taková hra neexistuje nebo aktuálně není aktivní.</p>;
  }

  const startGame = () => {
    setIsStarted(true);
  };

  return <>{!isStarted ? <GameIntro startGame={startGame} /> : <GameTicket />}</>;
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getGameByKey })(Game);
