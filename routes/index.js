var express = require('express');
var router = express.Router();
var imageDataDescription = require('../data/imagedescription.json');
var getCookie = require('../helpers/getCookie');
var s3Path = 'https://s3-us-west-2.amazonaws.com/propose-photos/';
var s3ThumbnailPrefix = 'thumb-';

/**
 * Initializing the Data. Obviously the data is going to be hardcoded
 * because no data store support.
 */
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
Array.prototype.clone = function() {
  return this.slice(0);
};
var imageLength = 18;
var imagesData = [];
var i = 0;
var photosRows4 = [];

for (i = 0; i < imageLength; i++) { 
  temp = {
    full: s3Path + (i + 1).pad(4) + '.jpg',
    thumb: s3Path + s3ThumbnailPrefix + (i + 1).pad(2) + '.jpg'
  };
  temp.title = imageDataDescription['imageDecsripton'][i].title;
  temp.description = imageDataDescription['imageDecsripton'][i].description;
  imagesData.push(temp);
}

var imagesData2 = imagesData.clone();
while(imagesData2[0])
  photosRows4.push(imagesData2.splice(0,4));

/* GET template 1  */
router.get('/lens', function(req, res, next) {
  res.render('lens/index', {
    layout: 'lens/layout', 
    title: 'Express',
    i18n: req.t,
    pageData: {
      images: imagesData
    }
  });
});

/* GET template 2  */
router.get('/overflow', function(req, res, next) {
  res.render('overflow/index', {
    layout: 'overflow/layout', 
    title: 'Express',
    pageData: {
      images: photosRows4
    },
    i18n: req.t
  });
});

/* GET template 3  */
var weddingImageData = [];
weddingImageData.push({'thumb': s3Path + 'thumb-min-004.jpg', 'img': s3Path + "min-004.jpg"});
weddingImageData.push({'thumb': s3Path + 'thumb-min-007.jpg', 'img': s3Path + "min-007.jpg"});
weddingImageData.push({'thumb': s3Path + 'thumb-min-001.jpg', 'img': s3Path + "min-001.jpg"});
// router.get('/wedding', function(req, res, next) {
//   res.render('wedding/index', {
//     layout: 'wedding/layout', 
//     title: "Arthur and Timberly's Wedding",
//     homeImage: s3Path + "0003.jpg",
//     footerImage: s3Path + "wedding-footer-3.jpg",
//     hostPlaceImage: s3Path + "wedding-hongkong.jpg",
//     images: weddingImageData,
//     i18n: req.t
//   });
// });

/* GET template Under Construction  */
// router.get('/', function(req, res, next) {
//   res.render('underconstruction/index', {
//     layout: 'underconstruction/layout', 
//     title: "Arthur and Timberly's Wedding Under Construction",
//     i18n: req.t
//   });
// });

router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout', 
    title: "Arthur and Timberly's Wedding",
    homeImage: s3Path + "0003.jpg",
    footerImage: s3Path + "wedding-footer-3.jpg",
    hostPlaceImage: s3Path + "wedding-hongkong.jpg",
    images: weddingImageData,
    location: req.location,
    i18n: req.t
  });
});

router.get('/rsvp', function(req, res, next) {
  res.render('rsvp/index', {
    layout: 'rsvp/layout', 
    title: "Arthur and Timberly's Wedding",
    homeImage: s3Path + "0003.jpg",
    footerImage: s3Path + "wedding-footer-3.jpg",
    hostPlaceImage: s3Path + "wedding-hongkong.jpg",
    images: weddingImageData,
    location: req.location,
    i18n: req.t
  });
});


module.exports = router;
