import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getTickets, deleteTickets } from '../../../actions/ticket';

// Components
import Spinner from '../../layout/Spinner';
import TicketItem from './TicketItem';

// Admin game tickets component
const GameTickets = ({
  game: {
    game: { _id: gameId },
  },
  ticket: { tickets, loading },
  getTickets,
  deleteTickets,
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
        <>
          <div className='my-1'>
            <div className='float-buttons'>
              <button className='btn btn-danger' onClick={() => deleteTickets(gameId)}>
                Smazat tikety
              </button>
            </div>
            <h2>Tikety</h2>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Razítko</th>
                <th className='hide-sm'>Vydáno</th>
                <th className='hide-sm'>Odevzdáno</th>
                <th>Výsledek</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

GameTickets.propTypes = {
  getTickets: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getTickets, deleteTickets })(GameTickets);
