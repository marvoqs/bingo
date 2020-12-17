import { GET_GAMES, GET_GAME, ADD_GAME, UPDATE_GAME, CLEAR_GAME, DELETE_GAME, GAME_ERROR } from '../actions/types';

const initialState = {
  games: [],
  game: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case GET_GAME:
    case UPDATE_GAME:
      return {
        ...state,
        game: payload,
        loading: false,
      };
    case CLEAR_GAME:
      return {
        ...state,
        game: null,
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [payload, state.games],
        loading: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game._id !== payload),
        loading: false,
      };
    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
