import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getGameById, pinGame, unpinGame, startGame, stopGame, updateResults } from '../../../actions/game';

// Components
import Spinner from '../../layout/Spinner';
import Bingo from '../../game/Bingo';
import GameTickets from './GameTickets';

// Admin game component
const Game = ({
  match: {
    params: { gameId },
  },
  game: { game, loading },
  getGameById,
  updateResults,
  pinGame,
  unpinGame,
  startGame,
  stopGame,
}) => {
  useEffect(() => {
    getGameById(gameId);
  }, [getGameById, gameId]);

  if (game === null || loading) {
    return <Spinner />;
  }

  const { _id, timelimit, numoftips, active, pinned, template, results, title } = game;

  const handleTileClick = (rowIndex, colIndex) => {
    // Update results in db after every click
    const newResults = results.map((row, index) =>
      index === rowIndex ? row.map((column, index) => (index === colIndex ? !results[rowIndex][colIndex] : column)) : row
    );
    updateResults(_id, newResults);
  };

  return (
    <>
      <Link to='/admin/games' className='btn'>
        Zpět na seznam her
      </Link>
      <div className='my-1'>
        <div className='float-buttons'>
          <button className='btn btn-warning'>Editovat hru</button>
          {pinned ? (
            <button className='btn btn-danger' onClick={() => unpinGame(_id)}>
              Odepnout hru
            </button>
          ) : (
            <button className='btn btn-success' onClick={() => pinGame(_id)}>
              Připnout hru
            </button>
          )}
          {active ? (
            <button className='btn btn-danger' onClick={() => stopGame(_id)}>
              Ukončit výdej tiketů
            </button>
          ) : (
            <button className='btn btn-success' onClick={() => startGame(_id)}>
              Spustit výdej tiketů
            </button>
          )}
        </div>
        <h2>{title}</h2>
      </div>

      <p>Počet tipů: {numoftips}</p>
      <p>Časový limit: {timelimit} sekund</p>

      <Bingo template={template} results={results} handleTileClick={handleTileClick} />
      <hr className='line' />
      <GameTickets />
    </>
  );
};

Game.propTypes = {
  game: PropTypes.object.isRequired,
  getGameById: PropTypes.func.isRequired,
  updateResults: PropTypes.func.isRequired,
  pinGame: PropTypes.func.isRequired,
  unpinGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGameById, pinGame, unpinGame, startGame, stopGame, updateResults })(Game);
