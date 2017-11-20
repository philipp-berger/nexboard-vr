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

import Main from './main.jsx'

var extras = require('aframe-extras');

// Register a single component.
AFRAME.registerComponent('object-model', extras.loaders["object-model"]);
AFRAME.registerComponent('animation-mixer', extras.loaders["animation-mixer"]);

class App extends React.Component {

  render () {
    return (
      <Scene stats scene-init>
        <Main/>
      </Scene>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
