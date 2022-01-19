const router = require('express').Router();
const otpRouter = require('./otpRouter');

router.use('/otp', otpRouter);

module.exports = router;
