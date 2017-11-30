import VRSocketConnector from '../network/VrSocketConnector.js'

const windowSizeMiddleware = store => next => action => {
  if(action.type.startsWith('SYNC')){
    VRSocketConnector.handleReduxActions(action)
  }

  return next(action)
};

export default windowSizeMiddleware