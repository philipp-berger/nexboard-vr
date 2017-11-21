// @flow

import { combineReducers } from 'redux';

const lastAction = (state = null, action: ReduxActionType) => action;

export default combineReducers({
  lastAction,
});