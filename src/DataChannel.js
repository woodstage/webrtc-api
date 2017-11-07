import * as _ from 'lodash'

export default class DataChannel {

  constructor(peerConnection, type, channel) {
    this._peerConnection = peerConnection;
    this.type = type;
    this._channel = channel;
    this.state = undefined;
    this.onopen = undefined;
    this.onclose = undefined;
    this.onmessage = undefined;
    this.receivedMessages = [];
    this.sentMessages = [];
    this.sendingMessages = [];
  }

  initialize () {
    let dataConstraint = null;
    
    if (!this._channel) {
      this._channel = this._peerConnection.conn.createDataChannel(this.type, dataConstraint);
    }

    let dataChannel = this._channel;

    dataChannel.onopen = () => {
      this.state = 'open';
      if (_.isFunction(this.onopen)) {
        this.onopen(...arguments);
      }
    }

    dataChannel.onclose = () => {
      this.state = 'close';
      if (_.isFunction(this.onclose)) {
        this.onclose(...arguments);
      }
    }

    dataChannel.onmessage = (event) => {
      if (_.isFunction(this.onmessage)) {
        this.onmessage(event, event.data);
      } 
      this.receivedMessages.push(event.data);
    }

    return Promise.resolve(this._channel);
  }

  sendMessage (message) {
    let data;
    if (_.isPlainObject(message)) {
      data = JSON.stringify(message);
    } else if (_.isString(message)) {
      data = message;
    } else {
      throw new Error('Invalid message');
    }

    if (this._channel && this._channel.readyState === 'open') {
      this._channel.send(data);
      this.sentMessages.push({ datetime: Date.now(), data });
    } else {
      this.sendingMessages.push({ datetime: Date.now(), data });
    }
  }
}