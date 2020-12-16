import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { submitTicket } from '../../actions/ticket';

// Components
import Spinner from '../layout/Spinner';
import Bingo from './Bingo';

// Game ticket component
const GameTicket = ({ game: { game, loading: gameLoading }, ticket: { ticket }, submitTicket }) => {
  const [countdown, setCountdown] = useState(0);
  const [tipCounter, setTipCounter] = useState(0);
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
    // Update tip counter
    setTipCounter(tips.flat().filter(Boolean).length);
  }, [tips, setTipCounter]);

  useEffect(() => {
    // Set countdown to time limit value
    setCountdown(timelimit);
  }, [setCountdown, timelimit]);

  useEffect(() => {
    // Set countdown interval
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    // Clear countdown interval
    return () => {
      clearInterval(countdownInterval);
    };
  });

  const markTip = (rowIndex, colIndex) => {
    if (tipCounter < numoftips) {
      // If new tips allowed, set the value of clicked tile to opposite than it is
      const newTips = tips.map((row, index) =>
        index === rowIndex ? row.map((column, index) => (index === colIndex ? !tips[rowIndex][colIndex] : column)) : row
      );
      setTips(newTips);
    } else {
      // If new tips are not allowed, set the value of clicked tile to false
      const newTips = tips.map((row, index) => (index === rowIndex ? row.map((column, index) => (index === colIndex ? false : column)) : row));
      setTips(newTips);
    }
  };

  const markResult = (rowIndex, colIndex) => {
    const newResults = results.map((row, index) =>
      index === rowIndex ? row.map((column, index) => (index === colIndex ? !results[rowIndex][colIndex] : column)) : row
    );
    setResults(newResults);
  };

  const handleTileClick = (rowIndex, colIndex) => {
    // If not ticket and countdown bigger than 0, mark tips
    if (!ticket && countdown > 0) {
      markTip(rowIndex, colIndex);
    }
    // If ticket, mark results
    if (ticket) {
      markResult(rowIndex, colIndex);
    }
  };

  const handleSubmit = () => {
    submitTicket(_id, tips);
    setCountdown(0);
  };

  // If anything is not ready, show spinner
  if (gameLoading || !tips.length || !results.length) {
    return <Spinner />;
  }

  return (
    <>
      {ticket ? (
        <>
          {/* If is ticket, mark the results */}
          <p>Teď můžeš označovat výsledky.</p>
          <Bingo template={template} tips={ticket.tips} results={results} handleTileClick={handleTileClick} />
          <span className='stamp'>{ticket && ticket.stamp}</span>
        </>
      ) : (
        <>
          {/* If is not ticket, mark the tips */}
          {countdown > 0 ? <p>Zbývá {countdown} sekund.</p> : <p>Časový limit vypršel. Odevzdej svůj tiket, prosím.</p>}
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
