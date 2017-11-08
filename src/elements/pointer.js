import {Path, Point, Tool} from 'paper'

export default class Pointer {
  constructor(center) {
    var pointerPosition = center || new Point(0, 0)
    var color = 'green'

    var pointer = new Path.Circle(pointerPosition, 10);
    pointer.strokeColor = color;
    pointer.strokeWidth = 3

    this._element = pointer
    this.position = pointerPosition
    this._color = color

    this.tool = new Tool()
    this.tool.onMouseDown = function(event) {
      console.log("Mouse Down", event)
    } 
  }

  change(newPoint){
    // console.log("Changing Scribble ", data)
    // console.log(newPoint)
    // this._pointerPosition = newPoint
    this._element.position = newPoint
    this._element.bringToFront()

    
  }

  hide() {
    this._element.strokeColor = null
    // this._element.strokeColor = 'green'
  }

  onTriggerDown() {
    this._element.fillColor = this._color
    // setTimeout( () => {
    //   this._element.fillColor = null
    // }, 500)
  }

  onTriggerUp() {
      this._element.fillColor = null
  }

  changeFlow(pathData){
  }

  addPoint(x,y) {
  }

  onFrame() {
    console.log("ON frame")
    this._element.strokeColor.hue += 1
  }
}