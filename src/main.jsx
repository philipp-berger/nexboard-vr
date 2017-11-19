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

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      position: {
        x: 0,
        y: 0,
        z: -1,
      }
    }
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  componentDidMount(){
  }

  listenTo(hand){
    // console.log(hand,hand.el)
  }

  onChange(newRotation) {
    this.setState({
      rotation: {
        x: newRotation.x,
        y: newRotation.y-180,
        z: newRotation.z,
      }
    })
  }

  onChange(newRotation) {
    this.setState({
      rotation: {
        x: newRotation.x,
        y: newRotation.y-180,
        z: newRotation.z,
      }
    })
  }

  onPositionChange(newPosition) {
    console.log("Position Changed", newPosition)
    this.setState({
      position: {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z-1,
      }
    })
  }

  

  render () {
    return (
      <Entity>
        <a-box color="tomato" depth="100" height="0.1" width="100" position="0 -1 0"></a-box>
        <a-box color="green" depth="1" height="1" width="1" position="1 0 -1"></a-box>
        <a-entity gltf-model="url(/head.gltf)" scale='0.0005 0.0005 0.0005' 
          position={`${this.state.position.x} ${this.state.position.y} ${this.state.position.z}`} 
          rotation={`${this.state.rotation.x} ${this.state.rotation.y} ${this.state.rotation.z}`}>
        </a-entity>

        <Camera y={-1.5} 
          onRotationChange={(newRotation) => this.onChange(newRotation)}
          onPositionChange={(newPosition) => this.onPositionChange(newPosition)}>
          <ToolGroup show={false}/>
        
          <Entity 
              primitive="a-cursor" 
              cursor="fuse: true; fuseTimeout: 3000" 
              aabb-collider="objects: .interactable"
              rotation="70 0 20"
              geometry="primitive: cone; radiusBottom: 0.01; radiusTop: 0.001; height: 0.1"
              position="0 0 -1">
              <a-animation begin="cursor-hovering" easing="ease-in" attribute="scale" dur="3000"
                fill="forwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
          </Entity>
            {<Entity raycaster="objects: .grabbable; near: 0.1" grab></Entity>}
        </Camera> 
      </Entity>
    )
  }
}
