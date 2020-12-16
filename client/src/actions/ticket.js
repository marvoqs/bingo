import axios from 'axios';
import { setAlert } from './alert';

import { GET_TICKETS, GET_TICKET, DELETE_TICKETS, TICKET_ERROR } from './types';

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

// Delete tickets
export const deleteTickets = (gameId = null) => async (dispatch) => {
  if (window.confirm('Opravdu chceš smazat všechny tikety? Už to nejde vrátit.')) {
    let endpoint = '/api/tickets';
    if (gameId) {
      endpoint = `/api/tickets/game/${gameId}`;
    }
    try {
      const res = await axios.delete(endpoint);
      dispatch({ type: DELETE_TICKETS, payload: res.data });
      dispatch(setAlert('Tikety byly smazány.', 'success'));
    } catch (err) {
      dispatch({ type: TICKET_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
  }
};

// Get new ticket
export const getTicket = (gameId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/tickets/${gameId}`);
    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Submit ticket
export const submitTicket = (ticketId, tips) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    tips,
  };

  try {
    const res = await axios.put(`/api/tickets/${ticketId}`, body, config);
    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Submit ticket
// export const submitTicket = (gameId, tips) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const body = {
//     tips,
//   };

//   try {
//     const res = await axios.post(`/api/tickets/${gameId}`, body, config);
//     dispatch({
//       type: GET_TICKET,
//       payload: res.data,
//     });
//     dispatch(setAlert('Ticket byl odevzdán. Teď můžeš označovat výsledky.', 'success'));
//   } catch (err) {
//     dispatch({
//       type: TICKET_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
