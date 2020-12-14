import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createGame } from '../../../actions/game';
import BingoForm from './BingoForm';

const CreateGame = ({ createGame, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    timelimit: '',
    numoftips: '',
  });
  const [templateSize, setTemplateSize] = useState({
    rows: 3,
    columns: 3,
  });
  const [template, setTemplate] = useState([]);

  const { title, timelimit, numoftips } = formData;
  const { rows, columns } = templateSize;

  useEffect(() => {
    setTemplate(updateTemplate(template, templateSize));
  }, [setTemplate, templateSize]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTemplateChange = (e) => {
    const rowIndex = parseInt(e.target.getAttribute('data-rowindex'));
    const colIndex = parseInt(e.target.getAttribute('data-colindex'));

    setTemplate((oldTemplate) => {
      // change the value on the correct location in the array
      const newTemplate = oldTemplate.map((row, index) =>
        index === rowIndex ? row.map((column, index) => (index === colIndex ? e.target.value : column)) : row
      );
      return newTemplate;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createGame(formData, template, history);
  };

  return (
    <>
      <h2>Vytvořit hru</h2>
      <form className='form my-1' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Název' name='title' value={title} onChange={(e) => handleChange(e)} />
          <small className='form-text'>Název je jen označení pro tebe, hráši jej neuvidí.</small>
        </div>
        <div className='form-group'>
          <input type='number' placeholder='Časový limit' name='timelimit' value={timelimit} onChange={(e) => handleChange(e)} />
          <small className='form-text'>Kolik vteřin budou hráči mít na své tipy.</small>
        </div>
        <div className='form-group'>
          <input type='number' placeholder='Počet tipů' name='numoftips' value={numoftips} onChange={(e) => handleChange(e)} />
          <small className='form-text'>Kolik tipů bude hráč zadávat.</small>
        </div>

        <div className='form-group'>
          <label htmlFor='rowsInput'>Řádků:</label>
          <input type='number' id='rowsInput' name='rows' value={rows} onChange={(e) => setTemplateSize({ ...templateSize, rows: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='columnsInput'>Sloupců:</label>
          <input
            type='number'
            placeholder='Počet sloupců'
            id='columnsInput'
            name='columns'
            value={columns}
            onChange={(e) => setTemplateSize({ ...templateSize, columns: e.target.value })}
          />
        </div>
        <BingoForm template={template} handleTemplateChange={handleTemplateChange} />
        <input type='submit' className='btn btn-primary my-1' value='Vytvořit' />
        <Link to='/admin/games' className='btn btn-light my-1'>
          Zrušit
        </Link>
      </form>
    </>
  );
};

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const updateTemplate = (oldTemplate, templateSize) => {
  // Declare rows
  const rows = [];

  // Generate rows based on templateSize
  for (let i = 0; i < templateSize.rows; i++) {
    const columns = [];
    // Generate columns based on templateSize
    for (let j = 0; j < templateSize.columns; j++) {
      if (typeof oldTemplate[i] === 'undefined' || typeof oldTemplate[i][j] === 'undefined') {
        // If there is no value in the position of oldTemplate, push new string
        columns.push('');
      } else {
        // If there is a value, push the value
        columns.push(oldTemplate[i][j]);
      }
    }
    // Push columns to rows => template done
    rows.push(columns);
  }
  return rows;
};

export default connect(null, { createGame })(CreateGame);
