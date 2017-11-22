// ActionTypes
export const MOVE_HAND = 'MOVE_HAND'
export const MOVE_HEAD = 'MOVE_HEAD'

export const SYNC_HAND = 'SYNC_HAND'
export const SYNC_HEAD = 'SYNC_HEAD'

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const SET_USER_DATA = 'SET_USER_DATA'

// own actions
export const setUserData = (data) => (
  {type: SET_USER_DATA, payload: {...data} });

// Actions for incoming Data
export const moveHead = (id, data) => (
  { type: MOVE_HEAD, payload: { id, data } });
export const moveHand = (id, side, data) => (
  { type: MOVE_HAND, payload: { id, side, data } });
  
export const addUser = (id, data) => ( { type: ADD_USER, payload: {id, data} });
export const removeUser = (id) => ( { type: REMOVE_USER, payload: {id} });
  

// Actions for outgoing data
export const syncHead = (id, data) => (
  { type: SYNC_HEAD, payload: { id, data } });
export const syncHand = (id, side, data) => (
  { type: SYNC_HAND, payload: { id, side, data } });
