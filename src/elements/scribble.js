import {Path, Point} from 'paper'

export default class Scribble {
  constructor(vrId, pathData = {d:[]}) {
    this.color = pathData.cl || 'black'

    var path = new Path();
    path.strokeColor = this.color
    path.strokeWidth = 3

    let datapoints = pathData.d || []
    datapoints.forEach( (pointData) => {
      var point = new Point(pointData.x, pointData.y)
      path.add(point)
    })

    path.translate(new Point(pathData.x, pathData.y))
    path.smooth()

    this._element = path
    this._element.vrId = vrId
    this.id = this._element.id
  }

  toSocketObject(){
    let datapoints = [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ]
    var numberOfPoints = this._element.segments.length
    var boundingRect = this._element.strokeBounds
    var origin = boundingRect.topLeft
    // console.log(origin, this._element.segments)
    // console.log(this._element.segments[0].point.subtract(origin))
    for(var i=0; i<numberOfPoints; i++){
      var point = this._element.segments[i].point.subtract(origin)
      datapoints.push({
        x: point.x,
        y: point.y
      })
    }
    return {
      cl: this.color,
      d: datapoints,
      he: ( parseInt(boundingRect.height * 100) / 100) || 1,
      wi: ( parseInt(boundingRect.width * 100) / 100) || 1,
      x:  ( parseInt(origin.x  * 100) / 100),
      y:  ( parseInt(origin.y  * 100) / 100)
    }
  }

  change(pathData){
    // console.log("Changing Scribble ", data)
    var origin = new Point(pathData.x, pathData.y)
    pathData.d.forEach( (pointData) => {
      var point = new Point(pointData.x, pointData.y)
      this._element.add(point.add(origin))
    })
  }

  changeFlow(pathData){
    // console.log("Changing Flow Scribble ", pathData)
    var origin = new Point(pathData.x, pathData.y)
    if(pathData.d.length <= 6){
      pathData.d.forEach( (pointData) => {
        var point = new Point(pointData.x, pointData.y)
        this._element.add(point.add(origin))
      })
    }else{
      var lastPoint = pathData.d.pop()
      var point = new Point(lastPoint.x, lastPoint.y)
      this._element.add(point.add(origin))
    }
  }

  addPoint(x,y) {
    console.log("Before add point")
    this._element.add(new Point(x,y))
    console.log("After add point")
    // this._element.smooth()
  }

  select(){
    this._element.selected = true
  }

  smooth(){
    this._element.smooth()
  }
}