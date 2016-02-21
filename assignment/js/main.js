$(document).ready(function() {
  $("#text-input1").prop('disabled', false);
  $("#text-input2").prop('disabled', false);
  $("#text-input3").prop('disabled', false);

  var downloadData;
  var markers;

  $("#button1").click(function(){
    var latKey = $("#text-input2").val();
    var longKey = $("#text-input3").val();
    downloadData = $.ajax($("#text-input1").val());

    var parseData = function(data){
      return JSON.parse(data);
      };

    var makeMarkers = function(data){
      return _.map(data, function(num){
      return L.circleMarker(([num[latKey], num[longKey]]), {radius: 10,
       fillColor: "#ff9966",
       color: "#000",
       weight: 1,
       opacity: 1,
       fillOpacity: 0.8});
        //
        //
        // return L.marker([num[latKey], num[longKey]]);
      });
    };

    var plotMarkers = function(data) {
      return _.each(data, function(num){
        num.addTo(map);
      });
    };

  downloadData.done(function(data) {
    var parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);
  });
});

$("#button2").click(function(){
  var removeMarkers = function(data) {
     return _.each(data, function(num){
       map.removeLayer(num);
    });
  };
  removeMarkers(markers);
});

});

/* =====================
 Leaflet setup
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
