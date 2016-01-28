function Bandwidth(pc, timeInterval) {
    this.pc = pc;
    this.timeInterval = timeInterval;
    this.listeners = {};
    this.started = false;
}

Bandwidth.prototype.on = function (event, fn) {
    if (this.listeners[event]){
        this.listeners[event].push(fn);
    } else {
        this.listeners[event] = [fn];
    }
};

Bandwidth.prototype.emit = function () {
    var args = Array.prototype.slice.call(arguments);
    var event = args.shift();
    if (this.listeners[event]){
        this.listeners[event].forEach(function (fn) {
            fn.apply(null, args);
        });
    }
};

Bandwidth.prototype.start = function () {
    var _self = this;
    if(_self.started)
        return;
    _self.started = true;
    _self.intervalEvent = setInterval(function () {
        if(_self.pc.iceConnectionState !== 'completed' && _self.pc.iceConnectionState !== "connected")
            return clearInterval(_self.intervalEvent);
        _self.pc.getStats(null)
        .then(function(result) {
            var totalbytesReceived = 0;
            var totalbytesSent = 0;
            // console.log(result);
            Object.keys(result).forEach(function(key) {
                if (!result[key].ssrc) return;
                if(result[key].isRemote === true) return;
                _self.timestamp = typeof result[key].timestamp === "number" ? result[key].timestamp : result[key].timestamp.getTime();
                if (result[key].bytesReceived) {
                    totalbytesReceived += Number(result[key].bytesReceived);
                } else if (result[key].bytesSent) {
                    totalbytesSent += Number(result[key].bytesSent);
                }
            });
            if (_self.prevTotalbytesReceived && _self.prevTotalbytesSent) {
                var timestampInterval = _self.timestamp - _self.lastTimestamp;
                var seconds = timestampInterval/1000;
                var bytesSentPerSec = (totalbytesSent - _self.prevTotalbytesSent)/seconds;
                var bytesReceivedPerSec = (totalbytesReceived - _self.prevTotalbytesReceived)/seconds;
                var bandwidth = {upStream: Math.floor(bytesSentPerSec/1024), downStream: Math.floor(bytesReceivedPerSec/1024)};
                _self.emit("bandwidth", bandwidth);
            }
            _self.prevTotalbytesSent = totalbytesSent;
            _self.prevTotalbytesReceived = totalbytesReceived;
            _self.lastTimestamp = _self.timestamp;
        })
        .catch(function(err) {
            throw new Error(err);
        });
    }, _self.timeInterval);
};

Bandwidth.prototype.stop = function() {
    this.started = false;
    clearInterval(this.intervalEvent);
};

module.exports = Bandwidth;
