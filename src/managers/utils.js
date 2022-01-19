module.exports.calculateExpireOn = function calculateExpireOn(validDuration) {
  return Math.floor(new Date().getTime() / 1000.0) + validDuration;
};

module.exports.isExpired = function isExpired(expiry) {
  return new Date() - new Date(expiry * 1000) >= 0;
};
