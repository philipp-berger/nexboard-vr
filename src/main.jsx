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
import Hand from './aframe-bindings/Hand.jsx'

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      camera: {
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
      },
      hand: {
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

  onChange(key, newRotation) {
    this.setState({
      [key]:{
        ...this.state[key],
        rotation: {
          x: newRotation.x,
          y: newRotation.y,
          z: newRotation.z,
        }
      }
    })
  }

  onPositionChange(key, newPosition) {
    this.setState({
      [key]:{
        ...this.state[key],
        position: {
          x: newPosition.x,
          y: newPosition.y,
          z: newPosition.z-1,
        }
      }
    })
  }

  

  render () {
    // <a-box color="tomato" depth="100" height="0.1" width="100" position="0 -1 0"></a-box>
    // <a-box color="green" depth="1" height="1" width="1" position="1 0 -1"></a-box> position="-14 -1.7 7"
    return (
      <Entity>
        <a-entity gltf-model="url(/head.gltf)" scale='0.001 0.001 0.001' 
            position={`${this.state.camera.position.x} ${this.state.camera.position.y} ${this.state.camera.position.z}`} 
            rotation={`${this.state.camera.rotation.x} ${this.state.camera.rotation.y} ${this.state.camera.rotation.z}`}>
          </a-entity>
        <a-entity object-model="src: url(/rightHand.json);" 
          rotation={`${this.state.hand.rotation.x} ${this.state.hand.rotation.y} ${this.state.hand.rotation.z}`}
          position={`${this.state.hand.position.x} ${this.state.hand.position.y} ${this.state.hand.position.z}`} 
          animation-mixer="clip: Fist;"></a-entity>

       
        <a-entity gltf-model="url(/scene.gltf)" position="13 -1.7 -4"  rotation="0 180 0" scale='0.03 0.03 0.03'>
        </a-entity>

        <Hand 
          onRotationChange={(newRotation) => this.onChange('hand', newRotation)}
          onPositionChange={(newPosition) => this.onPositionChange('hand', newPosition)} />

        <Camera y={-1.5} 
          onRotationChange={(newRotation) => this.onChange('camera', newRotation)}
          onPositionChange={(newPosition) => this.onPositionChange('camera', newPosition)}>
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
