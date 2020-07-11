var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('pricing', { title: 'Crystal-Nails | Pricing'});
});

module.exports = router;
