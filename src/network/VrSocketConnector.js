// @flow 

import io from 'socket.io-client'

import { 
  AUTHENTICATE, 
  INIT, 
  NEW, CHANGE, CHANGE_FLOW } from './messages'

import { addUser, moveHead, moveHand, removeUser, setUserData } from '../actions.js'
import { ADD_USER, REMOVE_USER, MOVE_HAND, MOVE_HEAD, SYNC_HAND, SYNC_HEAD } from '../actions.js'

import throttle from 'lodash.throttle'

class SocketConnector {

  constructor() {
    this.emitThrottled = throttle(this.emit, 41)
  }

  socketInit = (data : {id: number} ) => {
    this.store.dispatch(setUserData(data));
  }

  init(store) {
    this.store = store;

    this._socket = io(`http://${window.location.hostname}:8888`)
    this._socket.on('init', this.socketInit);
    this._socket.on(ADD_USER, (data) => {this.store.dispatch(addUser(data.id, data)) } );
    this._socket.on(REMOVE_USER, (data) => this.store.dispatch(removeUser(data.id)) );
    this._socket.on(MOVE_HEAD, ({id, side, data}) => id > -1 ? this.store.dispatch(moveHead(id, data)) : null );
    this._socket.on(MOVE_HAND, ({id, side, data}) => id > -1 ? this.store.dispatch(moveHand(id, side, data)) : null );
    // this._socket.emit("HELLO", {1: 2, 3: 4})
  }

  handleReduxActions = (action) => {
    console.log("Sync", action)
    // this._socket.emit(action.type, action.payload)
    // this.emitThrottled(action.type, action.payload)
    this._socket.emit(action.type, action.payload)
  }

  emit(type, message) {
    this._socket.emit(type, message)
  }

  syncUser() {
    // this.store.dispatch( addUser(1, {}) )
  }

  syncHead(data) {
    console.log(data)
    this.store.dispatch( moveHead(1, data) )
  }

}


const instance = new SocketConnector();

export default instance;

