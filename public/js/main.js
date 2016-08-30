/* ==========================================================================
   Helper Functions
   ========================================================================== */
function initGoogleMap(mapLat, mapLong, zoomLevel) {
  try {
    google.maps.event.addDomListener(window, 'load', function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: mapLat, lng: mapLong},
        zoom: zoomLevel,
        mapTypeId: 'roadmap',
        scrollwheel: false,
        zoomControl: false,
        draggable: false,
        styles:[{
          featureType:"poi",
          elementType:"labels",
          stylers:[{
              visibility:"off"
          }]
        }]
      });

      var latLng = new google.maps.LatLng(mapLat, mapLong);
      var marker = new google.maps.Marker({
        map: map,
        title: 'Royal Park Chinese Restaurant, Hong Kong',
        position: latLng
      });

      map.setZoom(zoomLevel);
      map.setCenter(new google.maps.LatLng(mapLat, mapLong));
    });
  } catch(err) {

  }
}

function toggleCookieParm(event) {
  event.preventDefault();
  document.cookie = event.data.cookieParm;
  window.location.href = window.location.href;
}

/* ==========================================================================
   Main Code
   ========================================================================== */
   
// Poptrox
(function($) {
  $('#photo-gallery').poptrox({
    useBodyOverflow: false,
    usePopupEasyClose: false,
    overlayColor: '#0a1919',
    overlayOpacity: 0.75,//(skel.vars.IEVersion < 9 ? 0 : 0.75),
    usePopupDefaultStyling: false,
    usePopupCaption: false,
    popupLoaderText: '',
    windowMargin: 10,
    usePopupNav: true
  });
}(jQuery));

// Language & Location
(function($) {
  $('a.english-btn').on('click', { cookieParm: 'locale=en_US'}, toggleCookieParm);
  $('a.chinese-btn').on('click', { cookieParm: 'locale=zh_CN'}, toggleCookieParm);
  $('.hk-btn').on('click', { cookieParm: 'location=hk'}, toggleCookieParm);
  $('.macau-btn').on('click', { cookieParm: 'location=macau'}, toggleCookieParm);
}(jQuery));

// Navbar show mid-way
(function($) {
  var showFixedNav = false;
  var $document = $(document);
  var $hkImageSection = $('#hk-image-section');
  var $weddingNavbar = $('#wedding-navbar');

  if($.isEmptyObject($hkImageSection))
    return;

  $(window).scroll(function() {
    if(showFixedNav) {
      if($hkImageSection.position().top > $document.scrollTop()) {
        $weddingNavbar.slideUp(200, function() {
          $weddingNavbar.removeClass('navbar-fixed-top');
          $weddingNavbar.addClass('navbar-absolute-top');
          $weddingNavbar.show();
        });
        showFixedNav = false;
      }
    } else {
      if($hkImageSection.position().top <= $document.scrollTop()) {
        $weddingNavbar.hide();
        $weddingNavbar.addClass('navbar-fixed-top');
        $weddingNavbar.removeClass('navbar-absolute-top');
        $weddingNavbar.slideDown(200);
        showFixedNav = true;
      }
    }
  });

  $(window).scroll();
}(jQuery));
