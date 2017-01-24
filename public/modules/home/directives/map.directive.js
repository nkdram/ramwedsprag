

'use strict';
angular.module('main').directive('googleMap', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        scope: {
            credentials: '=',
            initMap : '='
        },
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

            element.googleMap();

            navigator.geolocation.getCurrentPosition(function(pos){
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        element.addWay({
                            start: results[0]['formatted_address'], // Postal address for the start marker (obligatory)
                            end:  [9.9142833, 78.1395392], // Postal Address or GPS coordinates for the end marker (obligatory)
                            route : 'way', // Block's ID for the route display (optional)
                            langage : 'english' // language of the route detail (optional)
                        });
                    };
                });
            });


            scope.$on('loadMap', function(event, data){

                element.googleMap();
                element.addWay({
                    start: data, // Postal address for the start marker (obligatory)
                    end:  [9.9142833, 78.1395392], // Postal Address or GPS coordinates for the end marker (obligatory)
                    route : 'way', // Block's ID for the route display (optional)
                    langage : 'english' // language of the route detail (optional)
                });

            })
        }
    };
});