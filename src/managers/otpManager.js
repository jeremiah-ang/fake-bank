const { isExpired } = require('./utils');

const otpData = {
  otp: null,
  expireOn: null,
};
const VALID_DURATION = 30; // seconds
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}
function isOtpValid(otp) {
  return !isExpired(otpData.expireOn) && otpData.otp === +otp;
}

module.exports = {
  otpData,
  VALID_DURATION,
  generateOtp,
  isExpired,
  isOtpValid,
};
