import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Actions
import { getPinnedGame } from '../../actions/game';

// Components
import Spinner from '../layout/Spinner';
import GameIntro from './GameIntro';
import GameTicket from './GameTicket';

// Pinned game component
const GamePinned = ({
  match: {
    params: { gameKey },
  },
  game: { game, loading: gameLoading },
  ticket: { ticket, loading: ticketLoading },
  getPinnedGame,
}) => {
  // Load game
  useEffect(() => {
    getPinnedGame(gameKey);
  }, [getPinnedGame, gameKey]);

  // Show spinner until game is loaded
  if (gameLoading) {
    return <Spinner />;
  }

  // Check if game exists
  if (!gameLoading && game === null) {
    return <p>Aktuálně tu není žádná hra.</p>;
  }

  return <>{!ticketLoading && ticket && ticket.game === game._id ? <GameTicket /> : <GameIntro />}</>;
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getPinnedGame })(GamePinned);
