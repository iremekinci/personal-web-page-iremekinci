// === İstanbul Map ===
var mapIstanbul = new ol.Map({
  target: 'map-istanbul',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([28.9784, 41.0082]), // İstanbul
    zoom: 10
  })
});

// === Ankara (Hacettepe) Map ===
var mapAnkara = new ol.Map({
  target: 'map-ankara',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([32.7420, 39.8695]), // Hacettepe University
    zoom: 14
  })
});


// === Travel Map ===
var travelMap = new ol.Map({
  target: 'travel-map',
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([32.0, 39.0]), // Türkiye ortası
    zoom: 6
  })
});

// === Cities ===
var cities = [
  { name: "Edirne", coords: [26.5557, 41.6764] },
  { name: "Tekirdağ", coords: [27.5110, 40.9781] },
  { name: "Çanakkale", coords: [26.4086, 40.1456] },
  { name: "Balıkesir", coords: [27.8903, 39.6484] },
  { name: "Bursa", coords: [29.0610, 40.1826] },
  { name: "Muğla", coords: [28.3664, 37.2153] },
  { name: "Antalya", coords: [30.7133, 36.8969] },
  { name: "Eskişehir", coords: [30.5206, 39.7667] },
  { name: "Ankara", coords: [32.8597, 39.9334] },
  { name: "Kocaeli", coords: [29.9339, 40.7667] },
  { name: "Konya", coords: [32.4846, 37.8715] },
  { name: "Tokat", coords: [36.5544, 40.3167] },
  { name: "Ordu", coords: [37.8789, 40.9839] },
  { name: "Giresun", coords: [38.3895, 40.9128] },
  { name: "Trabzon", coords: [39.7200, 41.0053] },
  { name: "Nevşehir", coords: [34.7136, 38.6244] }
];

// === Create markers ===
var features = cities.map(city => {
  return new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(city.coords)),
    name: city.name
  });
});

var vectorSource = new ol.source.Vector({
  features: features
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1], // alt ucu noktaya oturur
      src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // konum işareti ikonu
      scale: 0.05 // boyut (0.05 küçük, 0.1 daha büyük)
    })
  })
});


travelMap.addLayer(vectorLayer);

// === Zoom on click ===
travelMap.on('singleclick', function (evt) {
  travelMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
    var coordinates = feature.getGeometry().getCoordinates();

    // Smooth zoom animation
    travelMap.getView().animate({
      center: coordinates,
      zoom: 10,
      duration: 800
    });
  });
});
// === TOOLTIP ON HOVER ===
var tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.background = "rgba(26,35,126,0.9)";
tooltip.style.color = "#fff";
tooltip.style.padding = "4px 8px";
tooltip.style.borderRadius = "6px";
tooltip.style.fontSize = "13px";
tooltip.style.pointerEvents = "none";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

travelMap.on("pointermove", function (evt) {
  var feature = travelMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });

  if (feature) {
    var coordinate = evt.coordinate;
    tooltip.style.left = evt.originalEvent.pageX + 10 + "px";
    tooltip.style.top = evt.originalEvent.pageY + 10 + "px";
    tooltip.innerHTML = feature.get("name");
    tooltip.style.display = "block";
  } else {
    tooltip.style.display = "none";
  }
});

