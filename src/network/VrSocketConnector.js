import io from 'socket.io-client'

import { 
  AUTHENTICATE, 
  INIT, 
  NEW, CHANGE, CHANGE_FLOW } from './messages'

import { addUser, moveHead, moveHand, removeUser, setUserData } from '../actions.js'

class SocketConnector {
  constructor(){
    // this._socket = io()
  }

  init(store) {
    this.store = store;
    this.syncUser();
  }

  syncUser() {
    this.store.dispatch( addUser(1, {}) )
  }

  syncHead(data) {
    console.log(data)
    this.store.dispatch( moveHead(1, data) )
  }

}


const instance = new SocketConnector();

export default instance;

