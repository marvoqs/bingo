import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import GameItem from './GameItem';
import { getGames } from '../../../actions/game';

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='my-1'>
        <div className='float-buttons'>
          <Link to='/admin/games/create' className='btn btn-success'>
            Vytvořit hru
          </Link>
        </div>
        <h2>Správa her</h2>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Název</th>
            <th className='hide-sm'>Klíč</th>
            <th className='hide-sm'>Vytvořeno</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <GameItem key={game._id} game={game} />
          ))}
        </tbody>
      </table>
    </>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Games);
