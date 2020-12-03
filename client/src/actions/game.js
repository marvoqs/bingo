import axios from 'axios';
import { setAlert } from './alert';

import { GET_GAMES, ADD_GAME, DELETE_GAME, GAME_ERROR } from './types';

// Get games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');
    dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
    dispatch({ type: GAME_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Add game
export const createGame = (formData, template, history, edit = false) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    ...formData,
    template,
  };

  try {
    const res = await axios.post('/api/games', body, config);
    dispatch({
      type: ADD_GAME,
      payload: res.data,
    });
    dispatch(setAlert('Hra byla přidána.', 'success'));

    if (!edit) {
      history.push('/admin/games');
    }
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete game
export const deleteGame = (id) => async (dispatch) => {
  if (window.confirm('Opravdu chceš smazat tuto hru? Už to nejde vrátit.')) {
    try {
      await axios.delete(`/api/games/${id}`);
      dispatch({
        type: DELETE_GAME,
        payload: id,
      });
      dispatch(setAlert('Hra smazána.', 'success'));
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
