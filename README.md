### Installation
  `npm install webrtc-stats --save`

### Usage

#### To get bandwidth details:

```javascript
  var bandwidthEvent = require("WebRTCUtils").getBandwidth(pc, timeInterval);
  bandwidthEvent.on("bandwidth", function (bandwidth) {
      console.log(bandwidth.upStream);
      console.log(bandwidth.downStream);
  });
  bandwidthEvent.start();
```

`timeInterval` (in milliseconds and optional) is the time interval at which you need get bandwidth information.
`timeInterval` must be greater than 1000 milliseconds.

To stop capturing bandwidth information `bandwidthEvent.stop()`

#### To get Connection detail.

```javascript
  require("WebRTCStats").getConnectionDetails(pc)
  .then(function(connectionDetails){
      console.log(connectionDetails.remoteIpAddress);
      console.log(connectionDetails.remoteCandidateType);
      console.log(connectionDetails.localIpAddress);
      console.log(connectionDetails.localCandidateType);
  });
```
