export default class MyMediaRecorder {
  
  constructor (stream, mimeType = 'video/webm') {
    this.stream = stream;
    this.mimeType = mimeType;
  }

  initialize () {
    return new Promise((resolve, reject) => {
      try {
        let recorder = this.recorder = new MediaRecorder(this.stream, { mimeType: this.mimeType })
        resolve(recorder);
      } catch (err) {
        reject(err);
      }
    })

    // this.recorder.ondataavailable = e => {
    //   this.data = e.data;
    // }
  }

  start () {
    this.recorder.start();
  }

  stop () {
    this.recorder.stop();
    return new Promise((resolve, reject) => {
      this.recorder.ondataavailable = e => {
        this.lastData = e.data;
        resolve(e.data);
        this.recorder.ondataavailable = undefined;
      }
    })
  }

}