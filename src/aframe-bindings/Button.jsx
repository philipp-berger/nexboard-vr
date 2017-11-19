import React from 'React'
import PropTypes from 'prop-types'

export default class Button extends React.Component {

  componentDidMount() {
    this.button.addEventListener('hit', (event) => this.onClick(event))
  }

  onClick(event) {
    this.props.onClick(event);
  }

  render() {
    return (
    <a-entity position={`${this.props.x} ${this.props.y} ${this.props.z}`} rotation={`${this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}>

        <a-entity
          class="interactable"
          ref={(butt) => this.button = butt}
          geometry="primitive: plane; height: 0.1; width: 0.2;"
          material="color: #58c3b0; side: double"
          text={`width: 0.3;color: black;side: double; align: center; value: ${this.props.text}`}></a-entity>

      </a-entity>
    )
  }

}

Button.propTypes = {
  onClick: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
}

Button.defaultProps = {
  onClick: () => {},
  x: 0,
  y: 0,
  z: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  text: 'Default Text'
}
