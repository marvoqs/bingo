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
  game: { game, loading: gameLoading },
  ticket: { ticket, loading: ticketLoading },
  getGameByKey,
}) => {
  // Load game
  useEffect(() => {
    getGameByKey(gameKey);
  }, [getGameByKey, gameKey]);

  // Show spinner until game is loaded
  if (gameLoading) {
    return <Spinner />;
  }

  // Check if game exists
  if (!gameLoading && game === null) {
    return <p>Taková hra neexistuje nebo aktuálně není aktivní.</p>;
  }

  return <>{ticket && ticket.game === game._id ? <GameTicket /> : <GameIntro />}</>;
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getGameByKey })(Game);
