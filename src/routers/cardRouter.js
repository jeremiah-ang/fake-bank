const router = require('express').Router();

router.post('/', (req, res, next) => {
  const email = req.body.email;
});

module.exports = router;
