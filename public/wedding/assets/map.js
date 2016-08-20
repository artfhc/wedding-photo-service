google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.379596, lng: 114.18859500000008},
    zoom: 13,
    mapTypeId: 'roadmap',
    scrollwheel: false
  });

  //var markers = [];

  // var getInfoWindow = function(selectorId) {
  //   var contentString = $(selectorId).html();
  //   return new google.maps.InfoWindow({
  //     content: contentString
  //   });
  // }

  // document.getElementById('hk-btn').onclick = function(ev) {
  //   $('.banner-macau').fadeOut(500, function() {
  //     $('.banner-hk').fadeIn(500);
  //   });

  //   markers.forEach(function(marker) {
  //     marker.setMap(null);
  //   });
  //   markers = [];

  //   var infowindow = getInfoWindow('#infow-hk');
  //   var latLng = new google.maps.LatLng(22.379596, 114.186401);
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     title: 'Royal Park Chinese Restaurant, Hong Kong',
  //     position: latLng
  //   });
  //   marker.addListener('click', function() {
  //     infowindow.open(map, marker);
  //   });

  //   markers.push(marker);
  //   //infowindow.open(map, marker);

  //   map.setZoom(14);
  //   map.setCenter(latLng);
  // }

  // document.getElementById('macau-btn').onclick = function(ev) {
  //   $('.banner-hk').fadeOut(500, function() {
  //     $('.banner-macau').fadeIn(500);
  //   });

  //   markers.forEach(function(marker) {
  //     marker.setMap(null);
  //   });
  //   markers = [];

  //   var infowindow = getInfoWindow('#infow-macau');
  //   var latLng = new google.maps.LatLng(22.1843793, 113.544935);
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     title: 'Mandarin Oriental, Macau',
  //     position: latLng
  //   });
  //   marker.addListener('click', function() {
  //     infowindow.open(map, marker);
  //   });

  //   markers.push(marker);
  //   //infowindow.open(map, marker);

  //   map.setZoom(14);
  //   map.setCenter(latLng);
  // }

});
