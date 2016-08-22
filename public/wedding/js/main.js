// Google Maps APIs
google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.379596, lng: 114.186401},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  var latLng = new google.maps.LatLng(22.379596, 114.186401);
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

  map.setZoom(13);
  map.setCenter(latLng);

  // window.addEventListener("resize", function() {
  //   map.setCenter(latLng);
  // });
});

// Poptrox
(function($) {
  $('#photo-gallery').poptrox({
    useBodyOverflow: false,
    usePopupEasyClose: false,
    overlayColor: '#0a1919',
    overlayOpacity: 0.75,//(skel.vars.IEVersion < 9 ? 0 : 0.75),
    usePopupDefaultStyling: false,
    usePopupCaption: true,
    popupLoaderText: '',
    windowMargin: 10,
    usePopupNav: true
  });
}(jQuery));