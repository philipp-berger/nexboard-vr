import React from 'react';
import { Entity } from 'aframe-react';

import Whiteboard from './whiteboard.js'
import Button from './button.js'

export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red',
      showWhiteboard: false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Entity>
       <Whiteboard id="abc" rotation="0 0 0" position="0 -0.5 -1.5" ref={(whiteboard) => this.wb = whiteboard}/> 
       {/*<Whiteboard id="abc" rotation="0 50 0" position="2 -0.5 -0.75" ref={(whiteboard) => this.wb = whiteboard}/>*/}
      </Entity> 
    )
  }
}
      // {/*<Entity>
      //   {
      //     this.state.showWhiteboard ?*/}
      //     {/*: null 
      //   }
      //   {
      //     !this.state.showWhiteboard ?
      //       <Button position="0 -0.5 -1.5" onClick={() => {this.setState({showWhiteboard: true})} }/>
      //     : null 
      //   }
      // </Entity>*/}