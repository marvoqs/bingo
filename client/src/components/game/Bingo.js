import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

// Bingo component
const Bingo = ({ template, tips, results, handleTileClick }) => {
  return (
    <div className='bingo'>
      {template.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((column, colIndex) => (
            <div key={colIndex} className='column' onClick={() => handleTileClick(rowIndex, colIndex)}>
              <Tile
                value={template[rowIndex][colIndex]}
                isTip={tips ? tips[rowIndex][colIndex] : false}
                isResult={results ? results[rowIndex][colIndex] : false}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Bingo.propTypes = {
  template: PropTypes.array.isRequired,
  tips: PropTypes.array,
  results: PropTypes.array.isRequired,
  handleTileClick: PropTypes.func.isRequired,
};

export default Bingo;
