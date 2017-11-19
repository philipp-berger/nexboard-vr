import Paper from 'paper'
import { Path, Size, Point, Color, GradientStop } from 'paper'
import SocketConnector from '../network/socketConnector'

import Postit from '../elements/postit.js'
import Scribble from '../elements/scribble.js'
/* global AFRAME */

/**
 * Draw dynamic colorful rectangles.
 */

/* global AFRAME */

/**
 * Draw dynamic colorful rectangles.
 */


AFRAME.registerComponent('draw-canvas-rectangles', {
  schema: {type: 'selector'},

  init: function () {
    var canvas = this.canvas = this.data;
    // var ctx = this.ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'rgb(0, 0, 0)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // console.log(this.data)

    this.canvas.width = 3200
    this.canvas.height = 2400

    // 6400 x 4800
    Paper.setup(this.canvas)
    var size = new Size(3200, 2400);
    Paper.view.viewSize = size
    Paper.view.update()
    Paper.view.zoom = 3

    var myCircle = new Path.Circle(Paper.view.center , 50);
    myCircle.fillColor = 'black';

    this.socket = new SocketConnector({
      onChange: this.addElement
    })
    // this.socket.connect(5, '297d0668-a617-5yf7-k5s0-1552bd759528')
  },

  tick: function (t) {
    // console.log("Tick event func", t)
    // var event = this.socket.eventStack.shift()
    // // console.log(event)
    // if(!event){
    //   return;
    // }
    // console.log(event)
    // addElement(event.data)

    // var canvas = this.canvas;
    // var ctx = this.ctx;
    // var x;
    // var y;
    // var hue = t / 10;

    // // Bottom layer rectangle.
    // ctx.fillStyle = 'hsl(' + hue + ', 50%, 80%)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // // Middle layer rectangle.
    // hue = t / 15;
    // ctx.fillStyle = 'hsl(' + hue + ', 50%, 60%)';
    // x = canvas.width / 10;
    // y = canvas.height / 10;
    // ctx.fillRect(x, y, canvas.width - x * 2, canvas.height - y * 2);

    // // Top layer rectangle.
    // hue = t / 20;
    // ctx.fillStyle = 'hsl(' + hue + ', 50%, 40%)';
    // x = canvas.width / 5;
    // y = canvas.height / 5;
    // ctx.fillRect(x, y, canvas.width - x * 2, canvas.height - y * 2);
  }
});

function addElement(data) {
    // console.log("Add element", data)
    let element = null
    let elementData = typeof data.data == 'string' ? JSON.parse(data.data) : data.data
    switch(data.type){
      case 'sb':
        element= new Scribble(elementData)
        break
      case 'pt':
        element = new Postit(elementData)
        break
      default:
        return
    }
    // this.elements[data.id] = element
  }