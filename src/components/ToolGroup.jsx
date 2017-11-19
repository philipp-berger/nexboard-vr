import React from 'react';
import PropTypes from 'prop-types'

import AButton from '../aframe-bindings/Button.jsx';


export default class ToolGroup extends React.Component {

  render() {
    return (
      <a-entity x={this.props.x} y={this.props.y} z={this.props.z} visible={this.props.show}>
        <AButton x={0.22} y={0} z={-0.2} rotationY={-40} rotationX={-40} text={'Stickynotes'}/>
        <AButton x={0} y={0} z={-0.27} rotationX={-40} text={'Interaction'}/>
        <AButton x={-0.22} y={0} z={-0.2} rotationY={40}  rotationX={-40}text={'Draw'}/>
      </a-entity>
    )
  }
}

ToolGroup.defaultProps = {
  x: 10,
  y: 1,
  z: 0,
  show: true
}

