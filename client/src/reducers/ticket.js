import { GET_TICKET, TICKET_ERROR } from '../actions/types';

const initialState = {
  ticket: null,
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
