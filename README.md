# webrtc
webrtc promisify API

[![NPM](https://nodei.co/npm//webrtc-api.png?stars&downloads)](https://nodei.co/npm/webrtc-api/)

[![](https://img.shields.io/travis/woodstage/webrtc-api.svg?style=flat-square)](https://travis-ci.org/woodstage/webrtc-api)
[![Coveralls](https://img.shields.io/coveralls/woodstage/webrtc-api.svg?style=flat-square)](https://coveralls.io/github/woodstage/webrtc-api)


[![npm package](https://img.shields.io/npm/v/webrtc-api.svg?style=flat-square)](https://www.npmjs.org/package/webrtc-api)
[![NPM downloads](http://img.shields.io/npm/dm/webrtc-api.svg?style=flat-square)](https://npmjs.org/package/webrtc-api)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/woodstage/webrtc-api.svg)](http://isitmaintained.com/project/woodstage/webrtc-api "Average time to resolve an issue")

## Get to started

### Initialize media stream
```javascript
import { MediaStream, PeerConnection, DataChannel } from 'webrtc-api'

let mediaStream = new MediaStream({ video: true, audio: true });
mediaStream.initialize()
  .then(stream => {
    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    } else {
      video.srcObject = stream;
    }
  })
```

### Peer connection and data channel 

```javascript
let peerConnection = new PeerConnection();
let dataChannel = new dataChannel(peerConnection, 'message');
peerConnection.initialize()
  .then(() => {
    dataChannel.initialize();
    return connA.createOffer();
  })
  .then(offer => {
    //Send offer to oppsite client through backend signaling server
  })
```

There are lots of [living demos](https://woodstage.github.io/webrtc-api/).

# LICENSE
Apache License 2.0