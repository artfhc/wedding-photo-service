var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET template 1  */
router.get('/lens', function(req, res, next) {
  res.render('lens/index', {
    layout: 'lens/layout', 
    title: 'Express',
    i18n: req.t
  });
});

/* GET template 2  */
router.get('/overflow', function(req, res, next) {
  console.log(req);
  res.render('overflow/index', {
    layout: 'overflow/layout', 
    title: 'Express',
    i18n: req.t
  });
});

module.exports = router;
