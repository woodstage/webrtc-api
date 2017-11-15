import w from 'webrtc-adapter'
import MediaStream from './MediaStream'
import MediaRecorder from './MediaRecorder'
import PeerConnection from './PeerConnection'
import DataChannel from './DataChannel'

if (typeof window !== 'undefined') {
  window.webrtc = {
    MediaStream,
    MediaRecorder,
    PeerConnection,
    DataChannel
  }
}

export {
  MediaStream,
  MediaRecorder,
  PeerConnection,
  DataChannel
}
