import axios from 'axios';
import { setAlert } from './alert';

import { GET_GAMES, GET_GAME, ADD_GAME, UPDATE_GAME, DELETE_GAME, GAME_ERROR } from './types';

// Get games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');
    dispatch({ type: GET_GAMES, payload: res.data });
  } catch (err) {
    dispatch({ type: GAME_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Get game by ID
export const getGameById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/id/${id}`);
    dispatch({
      type: GET_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get game by key
export const getGameByKey = (key) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/key/${key}`);
    dispatch({
      type: GET_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get pinned game
export const getPinnedGame = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/pinned`);
    dispatch({
      type: GET_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
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

// Pin game
export const pinGame = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/pin/${id}`);

    dispatch({
      type: UPDATE_GAME,
      payload: res.data,
    });
    dispatch(setAlert(`Hra byla připnuta na hlavní stránku.`, 'success'));
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Unpin game
export const unpinGame = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/unpin/${id}`);

    dispatch({
      type: UPDATE_GAME,
      payload: res.data,
    });
    dispatch(setAlert(`Hra byla odepnuta z hlavní stránky.`, 'success'));
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Start game
export const startGame = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/start/${id}`);

    dispatch({
      type: UPDATE_GAME,
      payload: res.data,
    });
    navigator.clipboard.writeText(`www.something.com/game/${res.data.key}`);
    dispatch(setAlert(`Výdej tiketů byl spuštěn. Odkaz na hru je www.something.com/game/${res.data.key} a byl uložen do tvého klipboardu.`, 'success'));
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Stop game
export const stopGame = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/stop/${id}`);

    dispatch({
      type: UPDATE_GAME,
      payload: res.data,
    });
    dispatch(setAlert(`Výdej tiketů byl ukončen. Hráči mají ještě ${res.data.timelimit} sekund na označení svých tipů.`, 'success'));
    setTimeout(() => dispatch(setAlert(`Časový limit pro označení tipů vypršel.`, 'success')), res.data.timelimit * 1000);
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update results
export const updateResults = (id, results) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(results);
  try {
    const res = await axios.put(`/api/games/results/${id}`, body, config);

    dispatch({
      type: UPDATE_GAME,
      payload: res.data,
    });
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
