import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import game from './game';
import ticket from './ticket';

export default combineReducers({
  alert,
  auth,
  game,
  ticket,
});
