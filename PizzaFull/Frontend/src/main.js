$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    initializeMap();

    google.maps.event.addDomListener(window, 'load', initializeMap);
});

var pizzaLatLng = new google.maps.LatLng(50.464379, 30.519131);
var html_element = document.getElementById("googleMap");
var mapProp = {
    center: pizzaLatLng,
    zoom: 11
};
var map = new google.maps.Map(html_element, mapProp);

function initializeMap() {
//Тут починаємо працювати з картою
    var point = pizzaLatLng;
    var markerPizza = new google.maps.Marker({
        position: point,
        map: map,
        icon: "assets/images/map-icon.png"
    });
    markerPizza.setMap(map);

    var addressPlaceholder = $('#addressPlaceholder');
    var markerHome;
    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        geocodeLatLng(coordinates, function (err, adress) {
            if (!err) {
                console.log(adress);
                addressPlaceholder.val(adress);
                var point = new google.maps.LatLng(coordinates.lat(), coordinates.lng());
                if(markerHome !== undefined) markerHome.setMap(null);
                markerHome = new google.maps.Marker({
                    position: point,
                    map: map,
                    icon: "assets/images/home-icon.png"
                });
                markerHome.setMap(map);
                calculateRoute(coordinates, pizzaLatLng, function (err, data) {
                    $("#orderTime").text(data.duration.text);
                    $("#orderPlace").text(adress);
                })
            } else {
                console.log("Немає адреси")
            }
        })
    });
}

function geocodeLatLng(latLng, callback) {
    //Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latLng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var adress = results[1].formatted_address;
            callback(null, adress);
        } else {
            callback(new Error("Can't find address"));
        }
    });
}

var directionService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
function calculateRoute(A_latlng, B_latlng, callback) {
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setMap(null);
            directionsRenderer.setDirections(response);
            directionsRenderer.setMap(map);

            var leg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
        } else {
            callback(new Error("Can`t find direction"));
        }
    });
}

