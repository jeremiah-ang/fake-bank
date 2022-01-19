const router = require('express').Router();
const createHttpError = require('http-errors');
const { nanoid } = require('nanoid');
const { calculateExpireOn, isExpired } = require('../managers/utils');

function isOtpValid(otp) {
  return +otp === 123456;
}

const payments = {};

const PAYMENT_STATUS = {
  PENDING: 1,
  SUCCESS: 2,
  CANCELLED: 3,
};
const VALID_DURATIOn = 5 * 60; // 5 minute

router.post('/', (req, res, next) => {
  const id = nanoid();
  const cardNumber = req.body.card_number;
  const cvv = req.body.cvv;
  const expiry = req.body.expiry;
  const data = req.body.data;
  const redirect = req.body.redirect;
  payments[id] = {
    cardDetail: {
      cardNumber,
      cvv,
      expiry,
    },
    data,
    redirect,
    status: PAYMENT_STATUS.PENDING,
    expireOn: calculateExpireOn(VALID_DURATIOn),
  };
  return res.redirect(`/payment.html?id=${id}`);
});

function checkPayment(req, res, next) {
  const id = req.params.id;
  if (!id) return next(createHttpError(400, 'id not provided'));
  if (!payments[id]) return next(createHttpError(400, 'Unknown Id'));

  const payment = payments[id];
  if (isExpired(payment.expireOn))
    return res.redirect(`${payment.redirect}?status=expired`);

  req.payment = payment;
  next();
}

function checkOtp(req, res, next) {
  const otp = req.query.otp;
  if (!otp) return next(createHttpError(400, 'OTP not provided'));
  if (!isOtpValid(otp, payment))
    return next(createHttpError(400, 'Invalid OTP'));
  next();
}

router.get('/:id', checkPayment, (req, res, next) => {
  return res.json(req.payment.data);
});

router.put('/:id', checkPayment, checkOtp, (req, res, next) => {
  const payment = req.payment;
  return res.redirect(`${payment.redirect}?status=success`);
});

router.delete('/:id', checkPayment, (req, res, next) => {
  const payment = req.payment;
  return res.redirect(`${payment.redirect}?status=cancelled`);
});

module.exports = router;
