var Bandwidth = require("./Bandwidth");

function WebRTCUtils() {}

WebRTCUtils.prototype.getBandwidth = function(pc, timeInterval) {
    timeInterval = !timeInterval || timeInterval < 1000 ? 1000 : timeInterval;
    return new Bandwidth(pc, timeInterval);
};

WebRTCUtils.prototype.getConnectionDetails = function (pc) {
    return new Promise(function(resolve, reject) {
        pc.getStats(null)
        .then(function(stats) {
            var connectionDetails = {};
            var filtered = stats[Object.keys(stats).filter(function(key){return stats[key].googActiveConnection || stats[key].selected;})[0]];
            if (!filtered) return reject('Could not find proper stats');
            connectionDetails.remoteIpAddress = stats[filtered.remoteCandidateId].ipAddress;
            connectionDetails.remoteCandidateType = stats[filtered.remoteCandidateId].candidateType;
            connectionDetails.localIpAddress = stats[filtered.localCandidateId].ipAddress;
            connectionDetails.localCandidateType = stats[filtered.localCandidateId].candidateType;
            resolve(connectionDetails);
        });
    });
};

module.exports = new WebRTCUtils();
