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

import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Start from './components/start.js'
import Button from './components/button.js'

// require('./images/floor.jpg')
// require('./images/sky.jpg')
// require('./images/office.jpeg')

class App extends React.Component {
  

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  componentDidMount(){
    // this.rightHand.addEventListener('axismove', evt => { console.log(evt); });
  }

  listenTo(hand){
    console.log(hand,hand.el)
  }

  render () {
    return (
      <Scene stats scene-init>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          {/*<img id="groundTexture" src="floor.jpg"/>*/}
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
          {/*<img id="skyTexture" src="sky.jpg"/>*/}
          <img id="sphereTexture" src="https://ucarecdn.com/b90b1ba8-4369-4473-8385-f713ffdbe400/"/>
          {/*<img id="sphereTexture" src="office.jpeg"/>*/}
          <canvas id="abc" ref={(canvas) => this.canvas = canvas}/>
        </a-assets>

        {/*Controllers*/}
        <Entity position="0 -2 0">
           {/* <Entity hand-controls="left" class="hand" aabb-collider="objects: .grabbable;" grab></Entity> */}
            <Entity ref={this.listenTo} hand-controls="right" class="hand" aabb-collider="objects: .grabbable;" grab>
                                                              <Entity raycaster="objects: .grabbable; near: 0.1" position="0 -0.5 0" rotation="90 0 0"></Entity>
                                                              {/*<Entity raycaster="objects: .grabbable; near: 0; far: 0.2" position="-0.04 0.01 0" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}></Entity>*/}
              {/* <Entity 
                primitive="a-cursor"
                cursor="fuse: true; fuseTimeout: 3000" 
                raycaster="objects: .grabbable, .clickable; near: 0" 
                show-on="objects: .clickable;"
                position="-0.04 0.01 -0.5">
                  <a-animation begin="cursor-hovering" easing="ease-in" attribute="scale" dur="3000"
                  fill="forwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
              </Entity>*/}
            </Entity> 
        </Entity>

        {/*<Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>*/}
        {/*<Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>*/}
        {/*<Entity primitive="a-sky" height="2048" radius="40" src="#skyTexture" theta-length="90" width="2048"/>*/}
        <Entity primitive="a-sphere" src="#sphereTexture" material="side: double" radius="20" position="0 0 0 "></Entity>
        
        <Start></Start>
        <Button position={{x: 0, y: 0, z: 0}}></Button>

        <Entity text={{value: 'Hello, A-Frame React!', align: 'center', color: '#85ccfd'}} position={{x: 0, y: 2, z: -1}} />
        

        <Entity primitive="a-camera" position="0 -2 0">
              {/* show-on="objects: .clickable1, .clickable;" */}
          <Entity 
              primitive="a-cursor" 
              cursor="fuse: true; fuseTimeout: 3000" 
              raycaster="objects: .grabbable, .clickable; near: 0.2" 
              rotation="70 0 20"
              geometry="primitive: cone; radiusBottom: 0.01; radiusTop: 0.001; height: 0.1"
              position="0 0 -1">
              <a-animation begin="cursor-hovering" easing="ease-in" attribute="scale" dur="3000"
                fill="forwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
          </Entity>
            {<Entity raycaster="objects: .grabbable; near: 0.1" grab></Entity>}
        </Entity>
      </Scene>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
