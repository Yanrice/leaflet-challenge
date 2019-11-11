// Creating our initial map object
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var platesJSON = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json"

d3.json(queryUrl, function(data) {
    //get the tectonic plate data
    d3.json(platesJSON, function(data2) {
      createFeatures(data.features, data2.features);
    })
  });




  var earthquakes = L.geoJson(earthquakeData, {

    pointToLayer: function(feature, latlng) {

       //console.log("markersize: "+markerSize);
        //return L.circleMarker(latlng,  geojsonMarkerOptions );
        return L.circleMarker(latlng,  style(feature) );
    },
    onEachFeature: function (feature, layer) {
        //console.log("place: " + feature.properties.place);
        layer.bindPopup("<h3>" + feature.properties.place + "<hr>Magnitude: "
        + +feature.properties.mag + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

//console.log(earthquakes);

});

var plates = L.geoJson(plateData, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.PlateName + "</h3>");
    }
  });


function createMap(earthquakes, plates) {
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
    );

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
    );

    var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token={accessToken}pk.eyJ1IjoieWFucmljZTIiLCJhIjoiY2sxaWd2eHFoMGhmNTNjb2NhcWlybWZ4MCJ9.gHt2Rd4lPW2LGXg9MMlzTw" );


// Define a baseMaps object to hold the base layers
    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satmap,
    };
};
