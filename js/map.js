//Initilize ourr map and markers array
var map;
var markers = [];

//This array contains the locations we are featuring on the map
var locations = [
          {title: 'Strawberry Rock', location: {lat: 41.083923, lng: -124.133847}},
          {title: 'Top Of The World', location: {lat: 40.7996976, lng: -123.9837136}},
          {title: 'College Cove', location: {lat: 41.065966, lng: -124.150562}},
          {title: 'Miranda Bridge', location: {lat: 40.217904, lng: -123.816195}},
          {title: 'Centerville Beach Lookout', location: {lat: 40.574033, lng: -124.3492484}},
          {title: 'Patricks Point', location: {lat: 41.1320369, lng: -124.1530033}}
        ];

var current_locations = ko.observableArray(locations)

function initMap() {
    var mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(40.478287,-123.505343), 
    styles: [{"elementType": "labels.text", "stylers": [{"visibility": "off"}]},{"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{"color": "#f5f5f2"},{"visibility": "on"}]},{"featureType": "administrative", "stylers": [{"visibility": "off"}]},{"featureType": "transit", "stylers": [{"visibility": "off"}]},{"featureType": "poi.attraction", "stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"},{"visibility": "on"}]},{"featureType": "poi.business", "stylers": [{"visibility": "off"}]},{"featureType": "poi.medical", "stylers": [{"visibility": "off"}]},{"featureType": "poi.place_of_worship", "stylers": [{"visibility": "off"}]},{"featureType": "poi.school", "stylers": [{"visibility": "off"}]},{"featureType": "poi.sports_complex", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway", "elementType": "geometry", "stylers": [{"color": "#ffffff"},{"visibility": "simplified"}]},{"featureType": "road.arterial", "stylers": [{"visibility": "simplified"},{"color": "#ffffff"}]},{"featureType": "road.highway", "elementType": "labels.icon", "stylers": [{"color": "#ffffff"},{"visibility": "off"}]},{"featureType": "road.highway", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "stylers": [{"color": "#ffffff"}]},{"featureType": "road.local", "stylers": [{"color": "#ffffff"}]},{"featureType": "poi.park", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},{"featureType": "poi", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},{"featureType": "water", "stylers": [{"color": "#71c8d4"}]},{"featureType": "landscape", "stylers": [{"color": "#e5e8e7"}]},{"featureType": "poi.park", "stylers": [{"color": "#8ba129"}]},{"featureType": "road", "stylers": [{"color": "#ffffff"}]},{"featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [{"color": "#c7c7c7"},{"visibility": "off"}]},{"featureType": "water", "stylers": [{"color": "#a0d3d3"}]},{"featureType": "poi.park", "stylers": [{"color": "#91b65d"}]},{"featureType": "poi.park", "stylers": [{"gamma": 1.51}]},{"featureType": "road.local", "stylers": [{"visibility": "off"}]},{"featureType": "road.local", "elementType": "geometry", "stylers": [{"visibility": "on"}]},{"featureType": "poi.government", "elementType": "geometry", "stylers": [{"visibility": "off"}]},{"featureType": "landscape", "stylers": [{"visibility": "off"}]},{"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"visibility": "simplified"}]},{"featureType": "road.local", "stylers": [{"visibility": "simplified"}]},{"featureType": "road"},{"featureType": "road"},{},{"featureType": "road.highway"}]
    };

    // Get the HTML DOM element that will contain our map 
    var mapElement = document.getElementById('map');
    // Create the Google Map using our element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);

    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
       var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
    }
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        });
    }
}

// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
}