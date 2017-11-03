import w from 'webrtc-adapter'
import MediaStream from './MediaStream'
import MediaRecorder from './MediaRecorder'
import PeerConnection from './PeerConnection'
//import DataChannel from './DataChannel'

if (typeof window != undefined) {
  window.webrtc = {
    MediaStream: MediaStream,
    MediaRecorder: MediaRecorder,
    PeerConnection: PeerConnection
  }
}

export {
  MediaStream,
  MediaRecorder,
  PeerConnection
}
