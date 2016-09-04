var express = require('express');
var form = require('express-form'); // https://github.com/dandean/express-form
var router = express.Router();
var request = require('request');
var sendGrid = require('sendgrid');

var field = form.field;
var recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=";
var imageDataDescription = require('../data/imagedescription.json');
var getCookie = require('../helpers/getCookie');
var cdnPath = "https://d3oglu70a1k4a5.cloudfront.net/";

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
weddingImageData.push({'thumb': cdnPath + 'thumb-min-004.jpg', 'img': cdnPath + "min-004.jpg", 'size': "2560x1920"});
weddingImageData.push({'thumb': cdnPath + 'thumb-min-007.jpg', 'img': cdnPath + "min-007.jpg", 'size': "2560x1920"});
weddingImageData.push({'thumb': cdnPath + 'thumb-min-001.jpg', 'img': cdnPath + "min-001.jpg", 'size': "1200x1600"});

function renderIndex(req, res) {
  var isHK = req.location == 'hk';
  res.render('index', {
    layout: 'layout', 
    title: "The Wedding",
    homeImage: cdnPath + "0003.jpg",
    footerImage: cdnPath + "wedding-footer-3.jpg",
    hostPlaceImageHK: cdnPath + "wedding-hongkong.jpg",
    hostPlaceImageMacau: cdnPath + "wedding-macau.jpg",
    images: weddingImageData,
    lat: isHK ? 22.379630 : 22.184340,
    lon: isHK ? 114.188579 : 113.546984,
    zoomLevel: isHK ? 18 : 15,
    location: req.location,
    i18n: req.t,
    url: req.url,
    language: req.i18n.language,
    enableParallex: !req.isMobile || req.isTablet
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
    title: "The Wedding",
    hostPlaceImage: cdnPath + "rsvp-1.jpg",
    i18n: req.t,
    url: req.url,
    language: req.i18n.language,
    locals: req.form,
    errorMap: errorMap || {}
  });
}

function requestRecaptchaVerification(req, res, recaptchaResponse, remoteAddress) {
  var verificationUrl = recaptchaUrl + process.env.RECAPCHA_SECRETKEY + "&response=" + recaptchaResponse + "&remoteip=" + remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      console.error("requestRecaptchaVerification failed: " + remoteAddress + " | response body: " + body);
      renderRsvp(req, res); // TODO (artfhc): just go to 404 or something
    } else {
      // TODO (artfhc): send the email?
      console.log("requestRecaptchaVerification succeed");
      sendEmail(req, res);
    }
  });
}

function sendEmail(req, res) {
  var sendgrid = sendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD),
      from = process.env.EMAILFROM,
      to = process.env.EMAILTO,
      payload = {
        firstName: req.form.firstName,
        lastName: req.form.lastName,
        emailAddress: req.form.emailAddress,
        phoneNumber: req.form.phoneNumber,
        location: req.form.location,
        willYouBeThere: req.form.willYouBeThere,
        numberOfGuests: req.form.numberOfGuests,
        message: req.form.message,
      };
  sendgrid.send({
    to:       to,
    from:     from,
    subject:  'RSVP for Wedding Photo App',
    text:     'Content of the form: ' + JSON.stringify(payload)
  }, function(err, json) {
    if(err) { 
      console.error("sendEmail failed: " + err);
      renderRsvp(req, res); 
    } else {
      console.log("sendEmail succeed: " + from);
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
    field("phoneNumber").trim().isNumeric("rsvp:error:phoneNumber"),
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
