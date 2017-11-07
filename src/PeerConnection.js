import DataChannel from './DataChannel'
import * as _ from 'lodash'

export default class PeerConnection {

  constructor (iceServers = [ {url: "stun:stun.l.google.com:19302"} ]) {
    this.iceServers = iceServers;
    this.conn = this.connection = undefined;
    this.offer = undefined;
    this.answer = undefined;
    this.isCaller = undefined;
    this.state = undefined;
    this.candidate = undefined;
    this.isCandidateFired = undefined;

    this.onicecandidate = undefined;
    this.onaddstream = undefined;
    this.ondatachannel = undefined;
  }

  initialize () {

    let conn = new RTCPeerConnection({ iceServers: this.iceServers }, null);
    
    conn.oniceconnectionstatechange = (event) => {
      this.state = conn.iceConnectionState;
    }

    conn.onicecandidate = (event) => {
      if (!this.isCandidateFired && event.candidate && event.candidate.candidate) {
        this.isCandidateFired = true;
        this.candidate = event.candidate
        _.isFunction(this.onicecandidate) && this.onicecandidate(this.candidate);
      }
    }

    conn.ondatachannel = (event) => {
      let channel = new DataChannel(null, null, event.channel);
      channel.initialize();
      if (channel) {
        _.isFunction(this.ondatachannel) && this.ondatachannel(channel);
      }
    }

    conn.onaddstream = (event) => {
      let stream = event.stream;
      if (stream) {
        this.stream = stream;
        _.isFunction(this.onaddstream) && this.onaddstream(event);
      }
    }

    this.conn = this.connection = conn;

    return Promise.resolve(this.conn);
  }


  createOffer (options = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  }) {

    if (this.conn) {
      return this.conn.createOffer(options)
      .then(offer => {
        this.offer = offer;
        this.isCaller = true;
        return this.conn.setLocalDescription(offer);
      })
      .then(() => {
        return this.offer;
      })
    } else {
      return Promise.reject(new Error('Connection is not available'));
    }

  }

  createAnswer () {
    if (this.conn) {
      return this.conn.createAnswer()
      .then(answer => {
        this.answer = answer;
        this.isCaller = false;
        return this.conn.setLocalDescription(answer);
      })
      .then(() => {
        return this.answer;
      })
    } else {
      return Promise.reject(new Error('Connection is not available'));
    }
  }

  setRemoteSDP (sdp) {
    if (this.conn) {
      return this.conn.setRemoteDescription(sdp)
    } else {
      return Promise.reject(new Error('Connection is not available'));
    }
  }

  setRemoteCandidate (candidate = null) {
    if (this.conn && candidate && candidate.candidate) {
      return this.conn.addIceCandidate(new RTCIceCandidate(candidate))
    } else {
      return Promise.reject(new Error('Connection is not available'));
    }
  }

  attachStream (stream) {
    if (this.conn && stream) {
      return this.conn.addStream(stream);
    } else {
      return Promise.reject(new Error('Connection is not available'));
    }
  }

}
