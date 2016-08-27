var express = require('express');
var form = require('express-form'); // https://github.com/dandean/express-form
var router = express.Router();
var request = require('request');
var field = form.field;
var secretKey = "6LehpSgTAAAAAPvodvkWH8RVntgnqQs0HqWcjhL5";
var recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=";
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

var weddingImageData = [];
weddingImageData.push({'thumb': s3Path + 'thumb-min-004.jpg', 'img': s3Path + "min-004.jpg"});
weddingImageData.push({'thumb': s3Path + 'thumb-min-007.jpg', 'img': s3Path + "min-007.jpg"});
weddingImageData.push({'thumb': s3Path + 'thumb-min-001.jpg', 'img': s3Path + "min-001.jpg"});

function renderIndex(req, res) {
  res.render('index', {
    layout: 'layout', 
    title: "Arthur and Timberly's Wedding",
    homeImage: s3Path + "0003.jpg",
    footerImage: s3Path + "wedding-footer-3.jpg",
    hostPlaceImage: s3Path + "wedding-hongkong.jpg",
    images: weddingImageData,
    lat: req.location == 'hk' ? 22.379630 : 22.184340,
    lon: req.location == 'hk' ? 114.188579 : 113.546984,
    zoomLevel: req.location == 'hk' ? 18 : 15,
    location: req.location,
    i18n: req.t,
    url: req.url,
    language: req.i18n.language
  });
}

function renderRsvp(req, res, errorMap) {

  // TODO (artfhc): problem on the recaptcha object key
  if (errorMap && req.form && req.form.getErrors("g-recaptcha-response")) {
      errorMap.recaptcha = req.form.getErrors("g-recaptcha-response")
  }

  res.render('rsvp/index', {
    layout: 'rsvp/layout', 
    location: req.location,
    i18n: req.t,
    url: req.url,
    language: req.i18n.language,
    locals: req.form,
    errorMap: errorMap || {}
  });
}

function requestRecaptchaVerification(req, res, recaptchaResponse, remoteAddress) {
  var verificationUrl = recaptchaUrl + secretKey + "&response=" + recaptchaResponse + "&remoteip=" + remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      console.log("requestRecaptchaVerification failed: " + remoteAddress + " | response body: " + body);
      renderRsvp(req, res); // TODO (artfhc): just go to 404 or something
    } else {
      // TODO (artfhc): send the email?
      console.log("requestRecaptchaVerification succeed");
      renderIndex(req, res);
    }
  });
}

router.get('/', function(req, res, next) {
  renderIndex(req, res);
});

router.get('/rsvp', function(req, res, next) {
  renderRsvp(req, res);
});

router.post(
  '/rsvp',
  form(
    field("firstName").trim().required("", "rsvp:error:firstName"),
    field("lastName").trim().required("", "rsvp:error:lastName"),
    field("emailAddress").trim().isEmail("rsvp:error:emailAddress"),
    field("location").required("", "rsvp:error:location"),
    field("willYouBeThere").required("", "rsvp:error:willYouBeThere"),
    field("numberOfGuests"),
    field("message"),
    field("g-recaptcha-response").trim().required("", "rsvp:error:recaptcha")
  ),
  function(req, res){
    if (!req.form.isValid) {
      // Fail form validation
      renderRsvp(req, res, req.form.getErrors());
    } else {
      requestRecaptchaVerification(req, res, req.body['g-recaptcha-response'], req.connection.remoteAddress);
    }
  }
);


module.exports = router;
