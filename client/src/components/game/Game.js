import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Actions
import { getGameByKey } from '../../actions/game';
import { submitTicket } from '../../actions/ticket';

// Components
import Spinner from '../layout/Spinner';
import Bingo from './Bingo';

// Game component
const Game = ({
  match: {
    params: { gameKey },
  },
  game: { game, loading: gameLoading },
  ticket: { ticket, loading: ticketLoading },
  getGameByKey,
  submitTicket,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [tips, setTips] = useState([]);
  const [results, setResults] = useState([]);

  // load game
  useEffect(() => {
    getGameByKey(gameKey);
  }, [getGameByKey, gameKey]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  // show spinner until game is loaded
  if (gameLoading) {
    return <Spinner />;
  }

  if (!gameLoading && game === null) {
    return <p>Taková hra neexistuje nebo aktuálně není aktivní.</p>;
  }

  const { _id, timelimit, numoftips, template } = game;

  const startGame = () => {
    setIsStarted(true);
    // Set initial tips array filled with false values
    setTips([...template.map((item) => [...item.map((item) => false)])]);
    // Set initial results array filled with false values
    setResults([...template.map((item) => [...item.map((item) => false)])]);
    // Set counter to time limit value
    setCounter(timelimit);
  };

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

  return (
    <>
      {!isStarted ? (
        <>
          <p>
            Po obdržení tiketu budeš mít {timelimit} sekund, abys označil {numoftips} políček.
          </p>
          <button className='btn btn-primary my-2' onClick={() => startGame()}>
            Získat tiket
          </button>
        </>
      ) : (
        <>
          <div className='my-2'>
            {ticket ? (
              <p>Teď můžeš označovat výsledky.</p>
            ) : counter > 0 ? (
              <p>Zbývá {counter} sekund.</p>
            ) : (
              <p>Časový limit vypršel. Odevzdej svůj tiket, prosím.</p>
            )}
          </div>
          <Bingo template={template} tips={ticket ? ticket.tips : tips} results={results} handleTileClick={handleTileClick} />
          {!ticket ? (
            <button className='btn btn-success' onClick={() => handleSubmit()}>
              Odevzdat tiket
            </button>
          ) : (
            <span className='stamp'>{ticket && ticket.stamp}</span>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getGameByKey, submitTicket })(Game);
