import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Bingo = ({ template, handleTemplateChange }) => {
  if (!template.length) {
    return <Spinner />;
  }

  const rowStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
  };

  return (
    <div>
      {template.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((column, colIndex) => (
            <div key={colIndex} style={{ backgroundColor: '#444444', margin: '5px', width: '150px', height: '150px', position: 'relative' }}>
              <textarea
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  bottom: '0',
                  right: '0',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  backgroundColor: 'inherit',
                  border: 'none',
                  color: 'inherit',
                  fontFamily: 'inherit',
                }}
                data-rowindex={rowIndex}
                data-colindex={colIndex}
                onChange={(e) => handleTemplateChange(e)}
                value={template[rowIndex][colIndex]}></textarea>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Bingo.propTypes = {
  template: PropTypes.array.isRequired,
};

export default Bingo;
