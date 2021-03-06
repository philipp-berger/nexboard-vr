import React from 'React'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react';

//Syncing
import SocketConnector from '../network/VrSocketConnector'

export default class Camera extends React.Component {

  componentDidMount() {
    this.camera.el.addEventListener('positionChange', (event) => this.onPositionChange(event))
    this.camera.el.addEventListener('rotationChange', (event) => this.onRotationChange(event))
  }

  onClick(event) {
    this.props.onClick(event);
  }

  onPositionChange(event) {
    let newPosition = event.detail;
    delete newPosition['target']
    // console.log("New Position", newPosition)
    this.props.onPositionChange(newPosition)
  }

  onRotationChange(event) {
    // console.log8)
    let newRotation = event.detail
    delete newRotation['target']
    // console.log("New Rotation", newRotation)
    this.props.onRotationChange(newRotation)
    // SocketConnector.syncHead(newRotation);
  }

  shouldComponentUpdate(){
    return false;
  }

  render() {
    return (
      <Entity moveable primitive="a-camera" 
        ref={ (cameraEntity) => this.camera = cameraEntity }
        position={`${this.props.x} ${this.props.y} ${this.props.z}`} 
        rotation={`${this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}>
        {this.props.children}
      </Entity> 
    )
  }

}

Camera.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
}

Camera.defaultProps = {
  x: 0,
  y: 0,
  z: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  onRotationChange: () => {},
  onPositionChange: () => {}
}
