import { SET_USER_DATA } from '../actions.js'

const userInitialState = {
  id: -1
};

const user = (state = userInitialState, action) => {
  switch(action.type){
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}


export default user;