import React from 'react';
import Paper from 'paper'
import { Path, Size, Point, Color, GradientStop } from 'paper'
import { Entity } from 'aframe-react';

import InputDispatcher from '../controls/inputDispatcher.js'
import Postit from '../elements/postit.js'
import Scribble from '../elements/scribble.js'
import Pointer from '../elements/pointer.js'
import SocketConnector from '../network/socketConnector'

import {SCRIBBLE, POSTIT} from '../constants/types'

export default class Whiteboard extends React.Component {
  constructor(props) {
    super(props)
    this.elements = {}

    this.addElement.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  init() {
    var canvas = document.getElementById(this.props.id)
    // this.canvas.width = 6400
    // this.canvas.height = 4800 
    // this.canvas.width = 3200
    // this.canvas.height = 2400

    // 6400 x 4800
    Paper.setup(canvas)
    Paper.settings.hitTolerance = 8
    // var size = new Size(1920, 1440);
    var size = new Size(3200, 2400);
    Paper.view.viewSize = size
    Paper.view.update()
    Paper.view.zoom = 1

    // Initialize Pointer
    this._pointer = new Pointer(Paper.view.center)
    Paper.view.onFrame = () => {
      this._pointer.onFrame()
    }

    // Initialize Socket Connection
    this.socket = new SocketConnector({
      onChange: this.addElement
    })
    this.socket.subscribe('new', (data) => {
      this.addElement(data)
    })
    this.socket.subscribe('change', (data) => {
      this.changeElement(data)
    })
    this.socket.subscribe('changeFlow', (data) => {
      this.changeElement(data, true)
    })
    this.socket.connect(81, '665i8402-t677-9jc2-s4f6-5082zj733633')
    // https://nexboard.nexboard.de/client/pub/81/665i8402-t677-9jc2-s4f6-5082zj733633

    // Initialize Trigger Settings
    this._triggerDown = false
    this._currentPosition = new Point(Paper.view.center)
    this._delta = new Point(Paper.view.center)
    this._hoveredItem = null
    this._inputDispatcher = new InputDispatcher({
      newElement: () => this.newElement(),
      socket: this.socket
    })

    // Tool setup
    this._tool = null

    // Set White background
    // let context = this.canvas.getContext('2d')
    let background = new Path.Rectangle(0,0,3200,2400)
    background.fillColor = 'white'
    // background.autoUpdate = false



    this.xRatio = 3200 / 3.55
    this.yRatio = 2400 / 2.5

    this.newElement = this.newElement.bind(this)
  }

  addPath(pathData) {
    let path = new Scribble(null, pathData)
  }

  addPostit(postitData, id) {
    let postit = new Postit(null, postitData)
    // this.elements[id] = 
  }

  getNewId(){
    var highestId = Object.keys(this.elements)
      .map((key) => key.split(':')[0])
      .sort( (a,b) => {return a > b})
    highestId = parseInt(highestId, 10)
    return `${highestId+1}:0`
  }

  onClick() {

  }

  onIntersection(intersection) {
    // console.log("Canvas Position", this, this.canvas.el)
    // console.log(, this.canvas.el.object3D)
    
    // let cCenter = {x: 0, y: 3.5}
    let cCenter = this.canvas.el.object3D.position
    // console.log("Intersection on: ", intersection, this.canvas)
    let xDiffInPixels = ( intersection.point.x - cCenter.x ) * this.xRatio
    let yDiffInPixels = ( intersection.point.y - cCenter.y ) * this.yRatio * -1

    var center = Paper.view.center
    var point = new Point(xDiffInPixels, yDiffInPixels) 
    point = point.add(center)

    // update current pointer only proceed if intersection point has changed
    if(point.equals(this._currentPosition)) return;
    this._delta = point - this._currentPosition
    this._currentPosition = point
    this._pointer.change(point)
    var pointedItem = Paper.project.hitTest(point)
    if(pointedItem && pointedItem.item.parent.isPostit){
      this._hoveredItem = this.elements[pointedItem.item.parent.vrId]
    }else{
      this._hoveredItem = null
    }

    // this._inputDispatcher.selectItem(this._hoveredItem)
    // console.log(this._hoveredItem)
    // Call on TriggerDrag if moving intersection while trigger down
    this._inputDispatcher.onTriggerMove({
      point: this._currentPosition,
      delta: this._delta,
      item: this._hoveredItem
    })
  }

  onTriggerDown() {
    this._triggerDown = true
    this._inputDispatcher.onTriggerDown({
      point: this._currentPosition,
      delta: this._delta,
      item: this._hoveredItem
    })
  }

  onTriggerUp(){
    this._triggerDown = false
    this._inputDispatcher.onTriggerUp({
      point: this._currentPosition,
      delta: this._delta,
      item: this._hoveredItem
    })
  }

  addElement(data) {
    // console.log("Add element", data)
    let element = null
    let elementData = typeof data.data == 'string' ? JSON.parse(data.data) : data.data
    switch(data.type){
      case 'sb':
        element= new Scribble(data.id, elementData)
        break
      case 'pt':
        element = new Postit(data.id, elementData)
        break
      default:
        return
    }
    this.elements[data.id] = element
    // console.log(element.toSocketObject())
  }

  newElement(type=SCRIBBLE, data={}) {
    let newId = this.getNewId()
    let element = null
    switch(type){
      case SCRIBBLE:
        element = new Scribble(newId, data)
      case POSTIT:
        element = new Postit(newId, data)
      default:
        element = new Scribble(newId, {})
    }
    this.elements[newId] = element

    this.socket.emitNew({
      data: element.toSocketObject(),
      ctId: null,
      id: newId,
      type
    })

    return element
  }

  changeElement(data, flow = false) {
    if(data.type !== 'sb' && data.type !== 'pt') return;
    let element = this.elements[data.id]
    let elementData = typeof data.data == 'string' ? JSON.parse(data.data) : data.data
    if(flow){
      element.changeFlow(elementData)
    }else if(data.type === 'pt'){
      element.change(elementData)
    }
  }

  render() {
    return (
      <Entity>
        {/*<canvas id={this.props.id} style={{display: 'none'}} ref={(canvas) => this.canvas = canvas}/>*/}
        <Entity 
          primitive="a-plane" 
          class="grabbable" 
          material="side: double" 
          src={`#${this.props.id}`}
          height="2.5" 
          width="3.55" 
          position="0 -0.5 -1"
          rotation={this.props.rotation}
          intersectable={{reactComponent: this, hands: '.hand', canvas: this.props.id}}
          ref={(canvas)=>{this.canvas=canvas}}
          />
      </Entity>
    )
  }
}