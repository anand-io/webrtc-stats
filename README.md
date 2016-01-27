### Installation
  `npm install webrtc-stats`
  
### Usage

#### To get bandwidth details:

```javascript
  var bandwidthEvent = require("WebRTCUtils").getBandwidth(pc, timeInterval);
  bandwidthEvent.on("bandwidth", function (bandwidth) {
      console.log(bandwidth);
  });
```

`timeInterval` (in milliseconds and optional) is the time interval at which you need get bandwidth information.
`timeInterval` must be greater than 1000 milliseconds.

To stop capturing bandwidth information `bandwidthEvent.stop()`

#### To get Connection detail.

```javascript
  require("WebRTCStats").getConnectionDetails(pc)
  .then(function(connectionDetails){

  });
```
