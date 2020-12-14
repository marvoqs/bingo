import axios from 'axios';
import { setAlert } from './alert';

import { GET_TICKETS, GET_TICKET, TICKET_ERROR } from './types';

// Get tickets
export const getTickets = (gameId = null) => async (dispatch) => {
  let endpoint = '/api/tickets';
  if (gameId) {
    endpoint = `/api/tickets/game/${gameId}`;
  }
  try {
    const res = await axios.get(endpoint);
    dispatch({ type: GET_TICKETS, payload: res.data });
  } catch (err) {
    dispatch({ type: TICKET_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const submitTicket = (gameId, tips) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    tips,
  };

  try {
    const res = await axios.post(`/api/tickets/${gameId}`, body, config);
    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
    dispatch(setAlert('Ticket byl odevzdán. Teď můžeš označovat výsledky.', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
