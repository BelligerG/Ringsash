let map;
var markers = [];

const marker_positions = [
  {title: 'Copplestone Methodist Church', pos: {lat: 50.810304, lng: -3.746866}},
  {title: 'Hele Lane Methodist Church', pos: {lat: 50.875362, lng: -3.698078}},
  {title: 'Emmanuel Methodist Church', pos: {lat: 50.855809, lng: -3.751543}},
  {title: 'Witheridge Methodist Church', pos: {lat: 50.917270, lng: -3.703710}},
];

function initMap() {
  map = new google.maps.Map(document.getElementById("location"), {
  center: { lat: 50.87, lng: -3.72 },
  zoom: 11,
  disableDefaultUI: true
});

  for (let i = 0; i < marker_positions.length; i++) {
    addMarkerWithTimeout(marker_positions[i], i * 200);
  }
}

function openInfoWindow(marker){
  iWindow = new google.maps.InfoWindow({
    content: marker.title,
  });
  iWindow.open(map, marker);
}

function addMarkerWithTimeout(marker, timeout) {
  window.setTimeout(() => {
      let markerObj = new google.maps.Marker({
        position: marker.pos,
        map,
        title: marker.title,
        animation: google.maps.Animation.DROP,
        icon: 'images/map_logo.png',
      })
      markers.push(markerObj);
      markerObj.addListener("click", () => {
        openInfoWindow(markerObj);
      })
  }, timeout);
}


function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }