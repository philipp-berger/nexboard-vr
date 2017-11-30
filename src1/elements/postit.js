import { Path, 
  Point, 
  PointText, Group } from 'paper'

export default class Postit {
  constructor(vrId, postitData){
    // console.log(postitData)
    let upperLeft = new Point([postitData.x, postitData.y])
    const bottomRight =  upperLeft.add(new Point(postitData.wi , postitData.he))
    const delta = bottomRight.subtract(upperLeft)

    // uniform gradient (90° degree)
    delta.x = delta.y
    upperLeft = bottomRight.subtract(delta)
    // color stops for gradient
    const stops = this.gridSteps(postitData.cl)

    // Return rectangle item representing a sticky note
    let postit = new Path.Rectangle({
      from: upperLeft,
      to: bottomRight,
      fillColor: 
      this.colorValue(postitData.cl),
      // {
      //   gradient: { stops },
      //   origin: upperLeft,
      //   destination: bottomRight,
      // },
      shadowColor: 'darkgrey',
      shadowBlur: 10,
      shadowOffset: new Point(3, 3),
      // onClick: this.props.onCanvasClick,
    })



    this.textSize = 40
    this.textElement = new PointText( upperLeft.add(new Point(5, this.textSize)) );
    this.textElement.justification = 'left';
    this.textElement.fillColor = 'black';
    this.textElement.content = postitData.tx;
    this.textElement.fontSize = this.textSize
    this.clipText(this.textElement, this.textElement.content, postit.strokeBounds.width-5, postit.strokeBounds.height)

    this._element = new Group(postit, this.textElement)
    this._element.isPostit = true
    // this._element.clipped = true

    this._element.vrId = vrId
    this.id = this._element.id
  }

  change(newPosition) {
    console.log("change", newPosition)
    this._element.position = newPosition
  }

  select() {
    this._element.selected = true
  }

  changeFlow(postitData) {
    // console.log("Change flow postit", postitData)
    var newPosition = new Point(postitData.x, postitData.y)
    this._element.position = newPosition
  }

  toSocketObject(){
    return {}
  }

  gridSteps(color) {
    // TODO Extend this switch block to support text color (and maybe border color)
    switch (color) {
      case 'blue':
        return [['#85ccfd', 0.60], ['#93e0ff', 0.80], ['#0f9dff', 1.0]]
        // return [['deepskyblue', 0.60], ['royalblue', 0.80], ['dodgerblue', 1.0]]
      case 'green':
        return [['#a4fd7d', 0.60], ['#b4ff89', 0.80], ['#3bc300', 1.0]]
        // return [['lime', 0.60], ['limegreen', 0.805], ['darkgreen', 1.0]]
      case 'pink':
        return [['#fda2f8', 0.60], ['#ffb1ff', 0.80], ['#ff47f5',1.0]]
      case 'orange':
        return [['#fdbd89', 0.60], ['#ffd096', 0.80], ['#ff7f15', 1.0]]
      case 'grey':
        return [['#cacaca', 0.60], ['#dedede', 0.80], ['#888888', 1.0]]
      case 'palevioletred':
        return [['#fdbec9', 0.60], ['#ffd1dd', 0.80], ['#ff8197', 1.0]]
      case 'bisque':
        return [['#ecddca', 0.60], ['#fff3de', 0.80], ['#eed0aa', 1.0]]
      case 'turquoise':
        return [['#00e3ec', 0.60], ['#00faff', 0.80], ['#00abb1', 1.0]]
      case 'black':
        return [['#000000', 0.60], ['#000000', 0.80], ['#909090', 1.0]]
      case 'yellow':
        // return [['#fde885', 0.60], ['#ffff92', 0.80], ['#ffd50d', 1.0]]
        return [['gold', 0.60], ['goldenrod', 0.80], ['darkgoldenrod', 1.0]]
      default:
        return [['gold', 0.60], ['goldenrod', 0.80], ['darkgoldenrod', 1.0]]
    }
  }

  colorValue(color) {
    // TODO Extend this switch block to support text color (and maybe border color)
    switch (color) {
      case 'blue':
        return '#85ccfd'
      case 'green':
        return '#a4fd7d'
      case 'pink':
        return '#fda2f8'
      case 'orange':
        return '#fdbd89'
      case 'grey':
        return '#cacaca'
      case 'palevioletred':
        return '#fdbec9'
      case 'bisque':
        return '#ecddca'
      case 'turquoise':
        return '#00e3ec'
      case 'black':
        return '#000000'
      case 'yellow':
        return 'gold'
      default:
        return 'gold'
    }
  }

  clipText(text, content, threshhold, heightThreshhold){
      var textContent = content

      let rearrangeText = (content) => {
        var lines = [ content ]
        text.content = content
        while(text.strokeBounds.width > threshhold){
            let longestLineIndex = this.longestLine(lines)
            lines = this.halfLineWithIndex(lines, longestLineIndex)
            text.content = lines.join('\n')
        }
      }
      rearrangeText(textContent)

      while(text.strokeBounds.height > heightThreshhold){
          this.textSize -= 1
          text.fontSize = this.textSize
          this.textElement.position.y -= 1
          rearrangeText(textContent)
      }
  }

  longestLine(lines){
      var longestLineIndex = 0
      for(var i=0; i<lines.length; i++){
          if(lines[i].length > lines[longestLineIndex].length){
              longestLineIndex = i
          }
      }
      return longestLineIndex
  }

  halfLineWithIndex(lines, index){
      let words = lines[index].split(' ')
      let line1 = ''
      let line2 = ''
      if(index >= lines.length - 1){
          lines.push('')
      }
      line2 = lines[index+1]
      
      if(words.length == 1){
          line1 = words[0].substr(0, words[0].length / 2) + '-'
          line2 = words[0].substr(words[0].length / 2, words[0].length) + ' ' + line2
      }else{
          var overflowWord = words.pop()
          line1 = words.join(' ')
          line2 = overflowWord + ' ' + line2
      }
      lines[index] = line1
      lines[index+1] = line2
      return lines
  }

}