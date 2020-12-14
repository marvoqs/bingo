import { GET_TICKET, GET_TICKETS, TICKET_ERROR } from '../actions/types';

const initialState = {
  ticket: null,
  tickets: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKET:
      return {
        ...state,
        ticket: payload,
        loading: false,
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false,
      };
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
