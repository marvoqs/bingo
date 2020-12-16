import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { submitTicket } from '../../actions/ticket';

// Components
import Spinner from '../layout/Spinner';
import Bingo from './Bingo';

const GameTicket = ({ game: { game, loading: gameLoading }, ticket: { ticket, loading: ticketLoading }, submitTicket }) => {
  const [counter, setCounter] = useState(0);
  const [tips, setTips] = useState([]);
  const [results, setResults] = useState([]);

  const { _id, timelimit, numoftips, template } = game;

  useEffect(() => {
    // Set initial tips array filled with false values
    setTips([...template.map((item) => [...item.map((_) => false)])]);
    // Set initial results array filled with false values
    setResults([...template.map((item) => [...item.map((_) => false)])]);
  }, [setTips, setResults, template]);

  useEffect(() => {
    // Set counter to time limit value
    setCounter(timelimit);
  }, [setCounter, timelimit]);

  const handleTileClick = (rowIndex, colIndex) => {
    // If not ticket and counter bigger than 0, mark tips
    if (!ticket && counter > 0) {
      //const numOfTips = tips.flat().filter(Boolean).length;
      //if (numOfTips < numoftips) {
      const newTips = tips.map((row, index) =>
        index === rowIndex ? row.map((column, index) => (index === colIndex ? !tips[rowIndex][colIndex] : column)) : row
      );
      setTips(newTips);
      //}
    }
    // If ticket, mark results
    if (ticket) {
      const newResults = results.map((row, index) =>
        index === rowIndex ? row.map((column, index) => (index === colIndex ? !results[rowIndex][colIndex] : column)) : row
      );
      setResults(newResults);
    }
  };

  const handleSubmit = () => {
    submitTicket(_id, tips);
    setCounter(0);
  };

  useEffect(() => {
    const counterInterval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(counterInterval);
    };
  });

  // If anything is not ready, show spinner
  if (gameLoading || tips.length === 0 || results.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      {ticket ? (
        <>
          <p>Teď můžeš označovat výsledky.</p>
          <Bingo template={template} tips={ticket.tips} results={results} handleTileClick={handleTileClick} />
          <span className='stamp'>{ticket && ticket.stamp}</span>
        </>
      ) : (
        <>
          {counter > 0 ? <p>Zbývá {counter} sekund.</p> : <p>Časový limit vypršel. Odevzdej svůj tiket, prosím.</p>}
          <Bingo template={template} tips={tips} results={results} handleTileClick={handleTileClick} />
          <button className='btn btn-success' onClick={() => handleSubmit()}>
            Odevzdat tiket
          </button>
        </>
      )}
    </>
  );
};

GameTicket.propTypes = {
  game: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  submitTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { submitTicket })(GameTicket);
