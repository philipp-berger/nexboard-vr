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
import UserGhost from './aframe-bindings/UserGhost.jsx'

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
      handRight: {
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
      handLeft: {
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

  componentWillReceiveProps(n){
    console.log("new props", n);
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
    if(key == 'camera'){
      this.props.syncHead(this.props.user.id, {position: newPosition})
    }else{
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
  }

  

  render () {
    // <a-box color="tomato" depth="100" height="0.1" width="100" position="0 -1 0"></a-box>
    // <a-box color="green" depth="1" height="1" width="1" position="1 0 -1"></a-box> position="-14 -1.7 7"
    const user = {
        head: this.state.camera,
        hands: {
          left: this.state.handLeft,
          right: this.state.handRight,
        }
    }
    return (
      <Entity>
      <Entity gltf-model="url(/scene.gltf)" position="13 -1.7 -4"  rotation="0 180 0" scale='0.03 0.03 0.03'>
      </Entity>
        <UserGhost user={user}/>
      
        <Hand 
          onRotationChange={(newRotation) => this.onChange('handRight', newRotation)}
          onPositionChange={(newPosition) => this.onPositionChange('handRight', newPosition)} />
        <Hand 
          side='left'
          onRotationChange={(newRotation) => this.onChange('handLeft', newRotation)}
          onPositionChange={(newPosition) => this.onPositionChange('handLeft', newPosition)} />

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
