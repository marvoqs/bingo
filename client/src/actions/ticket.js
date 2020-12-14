import axios from 'axios';
import { setAlert } from './alert';

import { GET_TICKET, TICKET_ERROR } from './types';

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
