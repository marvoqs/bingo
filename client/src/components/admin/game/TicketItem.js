import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utilities
import DayJS from 'react-dayjs';

const TicketItem = ({
  ticket: { stamp, date, tips },
  game: {
    game: { results },
  },
}) => {
  const [isBingo, setIsBingo] = useState(false);

  useEffect(() => {
    // Check for bingo
    const flattenedResults = results.flat();
    const flattenedTips = tips.flat();
    let newIsBingo = false;
    for (let i = 0; i < flattenedTips.length; i++) {
      // Loop through all the tiles
      if (flattenedTips[i] === true) {
        // If the tile is marked as a tip
        if (flattenedResults[i] === true) {
          // If the same tile is marked as a result, return true
          newIsBingo = true;
        } else {
          // If the same tile is not marked as a result, return false, and stop checking
          newIsBingo = false;
          break;
        }
      }
    }
    setIsBingo(newIsBingo);
  }, [results, setIsBingo]);

  return (
    <tr>
      <td>{stamp}</td>
      <td className='hide-sm'>
        <DayJS format='D. M. YYYY H:mm'>{date}</DayJS>
      </td>
      <td>{isBingo && <span>BINGO!</span>}</td>
    </tr>
  );
};

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(TicketItem);
