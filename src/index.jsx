import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import './controls/grab';
import './controls/aabb-collider';
import './controls/hide-elsewhere';
import './controls/intersectable';
import './components/aframe-comp';
import './components/scene-init';

// New 
import './controls/moveable';


import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Start from './components/start.js'
import Button from './components/button.js'


import ToolGroup from './components/ToolGroup.jsx'
import Camera from './aframe-bindings/Camera.jsx'

import Main from './mainContainer.js'

import {
  compose,
  applyMiddleware,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';

import createMiddlewares from './middlewares/';
import reducers from './reducers/';
import VrSocketConnector from './network/VrSocketConnector'

var extras = require('aframe-extras');

// Redux
function makeStore(initialState: ReduxStateType, middlewares: Array<Middleware<*, *, *>>) {
  let enhancer;

  // If not production
  if (false) {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
  } else {
    enhancer = compose(
      applyMiddleware(...middlewares),
    );
  }

  return createStore(reducers, initialState, enhancer);
}

// $FlowFixMe flow is not able to resolve the CommonJS exports of dev/prod
const store = makeStore({}, createMiddlewares());

// let socketConnector = new SocketConnector(store, authInformation.boardId, response.pubKey, authInformation.username);
let vrSocketConnector = VrSocketConnector.init(store);

// Register a single component.
AFRAME.registerComponent('object-model', extras.loaders["object-model"]);
AFRAME.registerComponent('animation-mixer', extras.loaders["animation-mixer"]);

class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <Scene stats scene-init>
          <Main/>
        </Scene>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
