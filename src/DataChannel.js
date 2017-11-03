export default DataChannel () {
      webrtc.prototype.createDataChannel = function (label) {
      let dataConstraint = null;
      let datachannel = self.datachannel = self.conn.createDataChannel(label, dataConstraint);

      dataChannel.onopen = function() {
        isFunction(self.ondatachannelopen) && self.ondatachannelopen(data);
      }
      
      dataChannel.onclose = function() {
        isFunction(self.ondatachannelclose) && self.ondatachannelclose(data);
      }
      
      dataChannel.onmessage = function(message) {
        let data = message.data;
        isFunction(self.onmessage) && self.onmessage(data);
      }

      return datachannel;
    }

}