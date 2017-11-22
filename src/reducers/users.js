// @flow

import { combineReducers } from 'redux';

import { ADD_USER, REMOVE_USER, MOVE_HEAD, MOVE_HAND } from '../actions.js'

const userInitialState = {
  head: {
      rotation: {x:0, y:0, z:0},
      position: {x:0, y:0, z:0},
    },
  hands: {
    left: {
      rotation: {x:0, y:0, z:0},
      position: {x:0, y:0, z:0},
    },
    right: {
      rotation: {x:0, y:0, z:0},
      position: {x:0, y:0, z:0},
    },
  }
};

const user = (state = userInitialState, action) => {
  switch(action.type){
    case MOVE_HAND:
      return {
        ...state,
        hands: {
          ...state.hands,
          [action.payload.side]: action.payload.data
        }
      }
    case MOVE_HEAD:
      delete action.payload.data.target
      return {
        ...state,
        head: action.payload.data
      }
    case ADD_USER:
      return {
        ...state,
        ...action.payload.data
      }
    default:
      return state;
  }
}

const users = (state = [], action) => {
  switch(action.type){
    case ADD_USER:
      return {
        ...state,
        [action.payload.id]: user(undefined, action),
      }
    case REMOVE_USER:
      var newState = {...state};
      delete newState[action.payload.id]
      return newState;
    case MOVE_HAND:
    case MOVE_HEAD:
      return {
        ...state,
        [action.payload.id]: user(state[action.payload.id], action),
      }
    default: 
      return {...state};
  }
};



export default users;