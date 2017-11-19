import io from 'socket.io-client'

import { 
  AUTHENTICATE, 
  INIT, 
  NEW, CHANGE, CHANGE_FLOW } from './messages'

export default class SocketConnector {
  constructor(props){
    this._socket = io()
    this.initSocketCommunication()
    this.eventStack = []

    this._onChange = props.onChange
    this._events = {
      new: [],
      change: [],
      changeFlow: []
    }
  }

  connect(boardId, authKey) {
      this._socket.emit(AUTHENTICATE, {
        panelId: boardId,
        authKey
      })

      this._socket.on(INIT, (data) => {
        console.log("Init board with ", data)

        data.wb_data.forEach( (element) => {
          this.eventStack.push({type: NEW, data:element})
          this._events.new.forEach( (subscriber) => {
            subscriber(element)
          })
        }
        )
      })
  }

  // event can be 'new' / 'change' / 'changeFlow'
  subscribe(event, callback) {
    this._events[event].push(callback)
  }

  emitNew(data) {
    this._socket.emit(NEW, data)
  }
  emitChangeFlow(data) {
    this._socket.emit(CHANGE_FLOW, data)
  }
  emitChange(data) {
    this._socket.emit(CHANGE, data)
  }

  initSocketCommunication() {
    this._socket.on(NEW, (data) => {
      console.log("new", data)
      onNew(data, this._events.new)
      // this.eventStack.push({type: NEW, data})
    })

    this._socket.on(CHANGE, (data) => {
      onChange(data, this._events.change)
      // this.eventStack.push({type: CHANGE, data})
    })

    this._socket.on(CHANGE_FLOW, (data) => {
      // console.log("flow")
      onChangeFlow(data, this._events.changeFlow)
    })
  }

  new
}

function onNew(data, subscriber) {
  console.log("On new", data)
  subscriber.forEach( (subscriber) => {
    subscriber(data)
  })
}

function onChange(data, subscriber) {
  console.log("On change", data)
  subscriber.forEach( (subscriber) => {
    subscriber(data)
  })
}

function onChangeFlow(data, subscriber) {
  console.log("On change flow", data)
  subscriber.forEach( (subscriber) => {
    subscriber(data)
  })
}