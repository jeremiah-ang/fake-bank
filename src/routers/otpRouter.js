const router = require('express').Router();
const {
  otpData,
  VALID_DURATION,
  generateOtp,
  isExpired,
} = require('../managers/otpManager');
const { calculateExpireOn } = require('../managers/utils');

router.get('/', (req, res, next) => {
  if (otpData.expireOn && !isExpired(otpData.expireOn))
    return res.json(otpData);
  otpData.otp = generateOtp();
  otpData.expireOn = calculateExpireOn(VALID_DURATION);
  return res.json(otpData);
});

module.exports = router;
