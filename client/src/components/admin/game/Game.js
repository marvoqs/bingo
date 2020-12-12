import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameById, startGame, stopGame, updateResults } from '../../../actions/game';
import Spinner from '../../layout/Spinner';

const Game = ({
  match: {
    params: { gameId },
  },
  game: { game, loading },
  getGameById,
  updateResults,
  startGame,
  stopGame,
}) => {
  useEffect(() => {
    getGameById(gameId);
  }, [getGameById, gameId]);

  if (game === null || loading) {
    return <Spinner />;
  }

  const { _id, timelimit, numoftips, active, template, results, title } = game;

  const handleTileClick = (rowIndex, colIndex) => {
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

      <div className='bingo'>
        {template.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((column, colIndex) => (
              <div key={colIndex} className='column'>
                <div className={results[rowIndex][colIndex] ? 'tile result' : 'tile'} onClick={() => handleTileClick(rowIndex, colIndex)}>
                  <div className='text'>{template[rowIndex][colIndex]}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

Game.propTypes = {
  getGameById: PropTypes.func.isRequired,
  updateResults: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGameById, startGame, stopGame, updateResults })(Game);