// @flow

import { combineReducers } from 'redux';
import users from './users.js'
import user from './user.js'

const lastAction = (state = null, action: ReduxActionType) => {
  console.log(`## ACTION ## 
    ${action.type}`, action.payload)
  return action
};

export default combineReducers({
  lastAction,
  users,
  user
});