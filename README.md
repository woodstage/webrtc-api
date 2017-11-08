# webrtc
webrtc promisify API

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