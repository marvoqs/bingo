import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import game from './game';
import ticket from './ticket';
import user from './user';

export default combineReducers({
  alert,
  auth,
  game,
  ticket,
  user,
});
