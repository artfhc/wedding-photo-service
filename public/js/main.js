// Google Maps APIs
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

      var contentString = 
        '<div>' + 
          '<p>Royal Park Chinese Restaurant</p>' +
          '<p>8 Pak Hok Ting Street, Shatin, Hong Kong</p>' +
          '<p><a href="http://www.royalpark.com.hk" target="_blank">http://www.royalpark.com.hk</a>' +
        '</div>';

      var contentString2 = 
        '<div>' + 
          '<p>Mandarin Oriental</p>' +
          '<p>Mandarin Oriental, Macau Avenida Dr Sun Yat Sen, NAPE, Macau</p>' +
          '<p><a href="http://www.mandarinoriental.com/" target="_blank">http://www.mandarinoriental.com/macau</a>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      map.setZoom(zoomLevel);

      // shift map slightly top right
      map.setCenter(new google.maps.LatLng(mapLat, mapLong));

      // window.addEventListener("resize", function() {
      //   map.setCenter(latLng);
      // });
    });
  } catch(err) {

  }
}


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

// Language
(function($) {
  // $('select[name="language-select"]').change(function(ev) {
  //   var $this = $(this);
  //   if($this.val() == 'en')
  //     document.cookie = 'locale=en_US';
  //   else if ($this.val() == 'zh')
  //     document.cookie = 'locale=zh_CN';
  //   else
  //     return false;
  //   window.location.href = window.location.href;
  // });
  $('a.english-btn').click(function(event) {
    event.preventDefault();
    document.cookie = 'locale=en_US';
    window.location.href = window.location.href;
  });

  $('a.chinese-btn').click(function(event) {
    event.preventDefault();
    document.cookie = 'locale=zh_CN';
    window.location.href = window.location.href;
  });

}(jQuery));

// Location
(function($) {
  $('.hk-btn').click(function() {
    document.cookie = 'location=hk';
    window.location.href = window.location.href;
  });

  $('.macau-btn').click(function() {
    document.cookie = 'location=macau';
    window.location.href = window.location.href;
  });
}(jQuery));

// RSVP Form
(function($) {
  $('.submit-btn').click(function(){
    // Validate here...
    var success = true;

    $('form').submit();

    if (success)
      $('.success-message').show();
    else
      $('.success-message').hide();
  });
}(jQuery));

// Navbar show mid-way
(function($) {
  var showFixedNav = false;
  $(window).scroll(function() {
    if ($('#hk-image-section').position().top <= $(document).scrollTop() && !showFixedNav) {
      $('#wedding-navbar').hide();
      $('#wedding-navbar').addClass('navbar-fixed-top');
      $('#wedding-navbar').removeClass('navbar-absolute-top');
      $('#wedding-navbar').slideDown(200);
      showFixedNav = true;
    } else if ($('#hk-image-section').position().top > $(document).scrollTop() && showFixedNav) {
      $('#wedding-navbar').slideUp(200, function() {
        $('#wedding-navbar').removeClass('navbar-fixed-top');
        $('#wedding-navbar').addClass('navbar-absolute-top');
        $('#wedding-navbar').show();
      });
      showFixedNav = false;
    }
  });
  $(window).scroll();
}(jQuery));