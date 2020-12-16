import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';

const BingoForm = ({ template, handleTemplateChange }) => {
  if (!template.length) {
    return <Spinner />;
  }

  return (
    <div className='bingo'>
      {template.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((_, colIndex) => (
            <div key={colIndex} className='column'>
              <div className='tile'>
                <textarea
                  className='text'
                  data-rowindex={rowIndex}
                  data-colindex={colIndex}
                  onChange={(e) => handleTemplateChange(e)}
                  value={template[rowIndex][colIndex]}></textarea>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

BingoForm.propTypes = {
  template: PropTypes.array.isRequired,
};

export default BingoForm;
