import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ value, isTip, isResult }) => {
  let cssClass = 'text';
  if (isTip) {
    cssClass += ' tip';
  }
  if (isResult) {
    cssClass += ' result';
  }
  return (
    <div className='tile'>
      <div className={cssClass}>{value}</div>
    </div>
  );
};

Tile.propTypes = {
  value: PropTypes.string.isRequired,
  isTip: PropTypes.bool.isRequired,
  isResult: PropTypes.bool.isRequired,
};

export default Tile;
