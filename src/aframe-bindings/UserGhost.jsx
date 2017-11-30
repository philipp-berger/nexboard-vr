import React from 'React'
import PropTypes from 'prop-types'
import { Entity } from 'aframe-react';

export default class UserGhost extends React.Component {

  render() {
    return (
      <Entity rotation="0 0 0" position="0 0 0">
      <Entity gltf-model="url(/head.gltf)" scale='0.001 0.001 0.001'
          position={`${this.props.user.head.position.x} ${this.props.user.head.position.y} ${this.props.user.head.position.z}`}
          rotation={`${this.props.user.head.rotation.x} ${this.props.user.head.rotation.y} ${this.props.user.head.rotation.z}`}>
        </Entity>
        <Entity position="0 -1.3 0">
          <Entity object-model="src: url(/rightHand.json);"
            rotation={`${this.props.user.hands.right.rotation.x} ${this.props.user.hands.right.rotation.y} ${this.props.user.hands.right.rotation.z}`}
            position={`${this.props.user.hands.right.position.x} ${this.props.user.hands.right.position.y} ${this.props.user.hands.right.position.z}`}
            animation-mixer="clip: Fist;"></Entity>
          <Entity object-model="src: url(/leftHand.json);"
            rotation={`${this.props.user.hands.left.rotation.x} ${this.props.user.hands.left.rotation.y} ${this.props.user.hands.left.rotation.z}`}
            position={`${this.props.user.hands.left.position.x} ${this.props.user.hands.left.position.y} ${this.props.user.hands.left.position.z}`}
            animation-mixer="clip: Fist;"></Entity>
        </Entity>
      </Entity>
    )
  }

}

const ThreeDimensionalType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
})

UserGhost.propTypes = {
  user: PropTypes.shape({
    head: PropTypes.shape({
      rotation: ThreeDimensionalType,
      position: ThreeDimensionalType,
    }),
    hands: PropTypes.shape({
      left: PropTypes.shape({
        rotation: ThreeDimensionalType,
        position: ThreeDimensionalType,
      }),
      right: PropTypes.shape({
        rotation: ThreeDimensionalType,
        position: ThreeDimensionalType,
      })
    })
  })
}

UserGhost.defaultProps = {
  user: {
    head: {
      rotation: {x:0, y:0, z:0},
      position: {x:0, y:0, z:0},
    },
    hands: {
      left: {
        rotation: {x:0, y:0, z:0},
        position: {x:0, y:0, z:0},
      },
      right: {
        rotation: {x:0, y:0, z:0},
        position: {x:0, y:0, z:0},
      },
    }
  }
}
