import axios from 'axios';
import { setAlert } from './alert';

import { GET_GAMES, GAME_ERROR, DELETE_GAME } from './types';

// Get games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');
    dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
    dispatch({ type: GAME_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Delete game
export const deleteGame = (id) => async (dispatch) => {
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
};
