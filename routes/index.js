var express = require('express');
var router = express.Router();
var photos = require('../data/photos.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * Initializing the Data. Obviously the data is going to be hardcoded
 * because no data store support.
 */
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
var imageSet = [1, 2, 3, 4, 5, 8, 10, 11, 13, 14, 15];
var imageDataDescription = [
  { title: 'Diam tempus accumsan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { title: 'Vivamus convallis libero', description: 'Sed velit lacus, laoreet at venenatis convallis in lorem tincidunt.' },
  { title: 'Nec accumsan enim felis', description: 'Maecenas eleifend tellus ut turpis eleifend, vitae pretium faucibus.' },
  { title: 'Donec maximus nisi eget', description: 'Tristique in nulla vel congue. Sed sociis natoque parturient nascetur.' },
  { title: 'Nullam vitae nunc vulputate', description: 'In pellentesque cursus velit id posuere. Donec vehicula nulla.' },
  { title: 'Phasellus magna faucibus', description: 'Nulla dignissim libero maximus tellus varius dictum ut posuere magna.' },
  { title: 'Proin quis mauris', description: 'Etiam ultricies, lorem quis efficitur porttitor, facilisis ante orci urna.' },
  { title: 'Gravida quis varius enim', description: 'unc egestas congue lorem. Nullam dictum placerat ex sapien tortor mattis.' },
  { title: 'Morbi eget vitae adipiscing', description: 'In quis vulputate dui. Maecenas metus elit, dictum praesent lacinia lacus.' },
  { title: 'Habitant tristique senectus', description: 'Vestibulum ante ipsum primis in faucibus orci luctus ac tincidunt dolor.' },
  { title: 'Pharetra ex non faucibus', description: 'Ut sed magna euismod leo laoreet congue. Fusce congue enim ultricies.' }

];
var imagesData = [];
var i = 0;
for (i = 0; i < imageSet.length; i++) { 
  temp = {
    full: 'https://s3-us-west-2.amazonaws.com/wedding-reg/' + imageSet[i].pad(4) + '.jpg',
    thumb: 'https://s3-us-west-2.amazonaws.com/wedding-reg/thumbnail-' + imageSet[i].pad(2) + '.jpg'
  };
  temp.title = imageDataDescription[i].title;
  temp.description = imageDataDescription[i].description;
  imagesData.push(temp);
}

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
