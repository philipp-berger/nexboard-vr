import React from 'react';
import { Entity } from 'aframe-react';


export default class Whiteboard extends React.Component {
  constructor(props) {
    super(props)
    this.elements = {}
  }

  componentDidMount() {
  }

  onClick() {
    console.log("CLicked on button")
    this.props.onClick()
  }

  onIntersection() {

  }

  render() {
    return (
      <Entity position={this.props.position}>
        {/*<Entity
          primitive="a-plane"
          class="clickable"
          ref={(plane) => this.plane = plane.el}
          intersectable={{reactComponent: this, hands: '.hand'}}>
        </Entity>*/}
        <Entity 
          primitive="a-text" 
          class="clickable"
          geometry="primitive: plane; width: 2; height: 0.5"
          material="color: #c7c7c7"
          color="white"
          align="center"
          value="Start a Whiteboard" 
          intersectable={{reactComponent: this, hands: '.hand'}}
          />
      </Entity>
    )
  }
}