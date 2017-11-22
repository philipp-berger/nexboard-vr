// @flow

import { combineReducers } from 'redux';
import users from './users.js'
import user from './user.js'

const lastAction = (state = null, action: ReduxActionType) => action;

export default combineReducers({
  lastAction,
  users,
  user
});