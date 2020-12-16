import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getTickets } from '../../../actions/ticket';

// Components
import Spinner from '../../layout/Spinner';

// Utilities
import DayJS from 'react-dayjs';

// Admin game tickets component
const GameTickets = ({
  game: {
    game: { _id: gameId, results },
  },
  ticket: { tickets, loading },
  getTickets,
}) => {
  useEffect(() => {
    // Check for tickets every 5 seconds
    const loadInterval = setInterval(() => getTickets(gameId), 5000);
    return () => clearInterval(loadInterval);
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {!tickets.length ? (
        <p>Ještě nebyly vydány žádné tikety.</p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Razítko</th>
              <th className='hide-sm'>Odevzdáno</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tickets.map(({ _id, stamp, tips, date }) => (
              <tr key={_id}>
                <td>{stamp}</td>
                <td className='hide-sm'>
                  <DayJS format='D. M. YYYY H:mm'>{date}</DayJS>
                </td>
                <td>{JSON.stringify(tips) === JSON.stringify(results) && <span>BINGO!</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

GameTickets.propTypes = {
  getTickets: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getTickets })(GameTickets);
