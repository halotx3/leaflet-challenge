let quakeData =  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
// Store our API endpoint inside queryUrl
let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
console.log(API_KEY)

// Creating map object
let myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 5
  });
// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Perform a GET request to the query URL to add data to map object
d3.json(queryUrl, (data)=>{
    let data_feed = data.features
    // console.log(data_feed)

    let circleArray = [];
    let sizeArray = [];

    for (let i = 0; i < data_feed.length; i++){
        let loc = data_feed[i].geometry;
        let size = data_feed[i].properties;
        if(loc){

            circleArray.push([loc.coordinates[1], loc.coordinates[0]])
            sizeArray.push([size.mag]);
            L.circle([loc.coordinates[1], loc.coordinates[0]], {
                color: chooseColor(size.mag),
                fillColor: chooseColor(size.mag),
                fillOpacity: 0.75,
                //Increased Radius for visiblity
                radius: (size.mag * 15000),


            }).addTo(myMap)
                .bindPopup(`<h4>Place:</h4> ${size.place} <br>`
                + `<h4>Earthquake Magnitude:</h4> ${size.mag} <br>`
                + `<h4>Magnitude Type:</h4> ${size.magType}`);
        };
    };

    //Deciding the circle color depending on the magnatude of the earthquake
    function chooseColor(mag){

        if (mag < .25) {
            return "#feb95d";
        } else if (mag < .50) {
            return "#fd8d3c";
        } else if (mag < 1) {
            return "#fc4e2a";
        } else if (mag < 2) {
            return "#cc1719";
        } else if (mag <= 3) {
            return "#aa0022";
        } else {
            return "#66001e";
        };
    };
});