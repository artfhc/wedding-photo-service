var express = require('express');
var router = express.Router();
var photos = require('../data/photos.json');

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

var photosRows4 = [];
while(photos[0])
  photosRows4.push(photos.splice(0,4));

/* GET template 2  */
router.get('/overflow', function(req, res, next) {
  res.render('overflow/index', {
    layout: 'overflow/layout', 
    title: 'Express',
    photos: photosRows4,
    i18n: req.t
  });
});

module.exports = router;
