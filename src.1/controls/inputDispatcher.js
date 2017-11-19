import Scribble from '../elements/scribble'

import {SCRIBBLE, POSTIT} from '../constants/types'

export default class InputDispatcher {
  constructor(props){
    this._clickThreshold = 250
    this._tool = null

    this._downTimestamp = null
    this._isPressed = false
    this._selected = null
    this._newElement = props.newElement
    this._socket = props.socket
  }

  onTriggerDown(data){
    this._downTimestamp = Date.now()
    this._isPressed = true
    this._selected = data.item
    this._drawing = false
  }

  onTriggerUp(data){
    var diff = Date.now() - this._downTimestamp
    this._isPressed = false
    if(diff <= this._clickThreshold){
      // Click registered
      if(data.item){
        data.item.select()
        this._selected = null
      }
    }else{
      if(this._drawing){
        this._selected.smooth()
        this._socket.emitChange({
          data: this._selected.toSocketObject(),
          ctId: null,
          id: this._selected._element.vrId,
          type: 'sb'
        })
        
      }
      this._selected = null
      this._drawing = false
    }
  }

  onTriggerMove(data){
    // console.log('move ', data.point)
    if(this._selected && !this._drawing){
      this._selected.change(data.point)
    }else if(this._selected && this._isPressed){
      this._selected.addPoint(data.point)
      this._socket.emitChangeFlow({
        data: this._selected.toSocketObject(),
        ctId: null,
        id: this._selected._element.vrId,
        type: 'sb'
      })
    }else if(this._isPressed){
      // Otherwise draw mode
      this._drawing = true
      this._selected = this._newElement(SCRIBBLE)
      console.log("Created new Element", this._selected)
    }
  }

  selectItem(item){
    this._selected = item
  }
}