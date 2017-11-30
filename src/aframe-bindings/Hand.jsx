import React from 'React'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react';

export default class Hand extends React.Component {

  componentDidMount() {
    this.hand.el.addEventListener('positionChange', (event) => this.onPositionChange(event))
    this.hand.el.addEventListener('rotationChange', (event) => this.onRotationChange(event))
  }

  onClick(event) {
    this.props.onClick(event);
  }

  onPositionChange(event) {
    let newPosition = event.detail;
    // newPosition.y -= 1.3;
    // console.log("New Position", newPosition)
    delete newPosition['target']
    this.props.onPositionChange(newPosition)
  }

  onRotationChange(event) {
    let newRotation = event.detail
    delete newRotation['target']
    // console.log("New Rotation", newRotation)
    this.props.onRotationChange(newRotation)
  }

  shouldComponentUpdate(){
    return false;
  }

  render() {
    return (
      <Entity position="0 -1.6 0">
        <Entity 
          ref={(element) => this.hand = element} 
          hand-controls={this.props.side} 
          class="hand" 
          aabb-collider="objects: .grabbable;" 
          grab
          moveable />
      </Entity>
    )
  }

}

Hand.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  side: PropTypes.oneOf(['left', 'right']),
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  onRotationChange: PropTypes.func,
  onPositionChange: PropTypes.func
}

Hand.defaultProps = {
  x: 0,
  y: 0,
  z: 0,
  side: 'right',
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  onRotationChange: () => {},
  onPositionChange: () => {}
}
