export default class MediaStream {

  constructor (constaints) {

    this.constaints = constaints;

  }

  initialize () {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    
      navigator.getUserMedia(this.constaints, stream => {
          this.stream = stream;
          this.videoTracks = stream.getVideoTracks();
          this.audioTracks = stream.getAudioTracks();
          resolve(stream);
      }, err => {
          reject(err);
      })
    })
  }

  stopVideo (index = 0) {
    this.videoTracks && this.videoTracks[index] && this.videoTracks[index].stop();
  }

  stopAudio (index = 0) {
    this.audioTracks && this.audioTracks[index] && this.audioTracks[index].stop();
  }

}