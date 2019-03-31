var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

//fearthquake circles / colors on map
function picColor(col) {
    return col > 5 ? "#F63F1E" :
           col > 4 ? "#ED9A31" :
           col > 3 ? "#EDBC42" :
           col > 2 ? "#F0D74C" :
           col > 1 ? "#DCF464" :
           col > 0 ? "#9DF057" :
                    "#4DF303";
  }

  // Create layer groups for earthquakes and faultlines
var earthquakeLayer = new L.layerGroup();
var faultlinesLayer = new L.layerGroup();

d3.json(url).then(function(data){
    console.log(data)
    var earthquakes = data.features
    console.log(earthquakes)
    for(i = 0; i < earthquakes.length; i++){
    var theMag = earthquakes[i].properties.mag;
    var theColor = picColor(theMag);

    var long = earthquakes[i].geometry.coordinates[0]
    var lat = earthquakes[i].geometry.coordinates[1]

    L.circle([lat, long],{
        fillOpacity: .5, 
        color: theColor,
        fillColor: theColor, 
        radius: earthquakes[i].properties.mag * 30000
    })
    .bindPopup("Place: " + earthquakes[i].properties.place + "<br>Type: " + earthquakes[i].properties.type + "<br>Magnitude " + earthquakes[i].properties.mag)
    .addTo(earthquakeLayer)
    }
});

console.log(boundaries[0]);


L.geoJSON(boundaries[0], {style: {'color': '#F39403'}}).addTo(faultlinesLayer);

// Define variables for our base layers
var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: apiKey
});

var grayscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: apiKey
});

var outdoor = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: apiKey
});

// Create a baseMaps object
var baseMaps = {
  "Satellite": satellite,
  "Grayscale": grayscale,
  "Outdoor": outdoor
};

// Create an overlay object
var overlayMaps = {
  "Earthquakes": earthquakeLayer,
  "Fault lines": faultlinesLayer
};

// Define a map object
var mymap = L.map("mapID", {
  center: [50.825379, -27.600631],
  zoom: 3,
  layers: [grayscale, 
          earthquakeLayer, 
          faultlinesLayer
          ]
});



// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(mymap);



// Create the background box for the legend
var legendBox = L.control();

// Create a div with a class "info"
legendBox.onAdd = function (map) {
    return L.DomUtil.create('div', 'info');
};

// Add the box to the map
legendBox.addTo(mymap);


// Create a legend in layer control and position it
var legend = L.control({ position: "bottomright" });


// Create the legend div and update the innerHTML
legend.onAdd = function (map) {

  // Create a div with a class "legend"
  var addDiv = L.DomUtil.create('div', 'info legend'),
      magnitudes = [0, 1, 2, 3, 4, 5]

  // add title for legend
  addDiv.innerHTML='<p>Magnitude</p>'

  // Loop through our magnitude intervals and generate a label with a colored square for each interval
  for (var i = 0; i < magnitudes.length; i++) {
      addDiv.innerHTML +=
          '<p style="background:' + picColor(magnitudes[i]) + '"> ' + 
          + magnitudes[i] + 
          (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+ </p>');
  }
  return addDiv;
};

// Add the legend to the map
legend.addTo(mymap);