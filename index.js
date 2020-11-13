TrimbleMaps.APIKey = '855CD55F5135A94AA2519FD565FAB5D9';
const map = new TrimbleMaps.Map({
    container: 'map', // container id
    center: [-100, 40],
    zoom: 3,
    style: TrimbleMaps.Common.Style.SATELLITE
});

// Save the panel elements
const lngElem = document.getElementById('longitude');
const latElem = document.getElementById('latitude');
const lngElem2 = document.getElementById('longitude2');
const latElem2 = document.getElementById('latitude2');
const distElem = document.getElementById('distance');

var markerMoved = false;

const marker1 = new TrimbleMaps.Marker({
    draggable: true
}).setLngLat([-100, 40]).addTo(map);

const marker2 = new TrimbleMaps.Marker({
    draggable: true
    
}).setLngLat([-100, 40]).addTo(map);

lngElem.innerHTML = '-100';
latElem.innerHTML = '40';

lngElem2.innerHTML = '-100';
latElem2.innerHTML = '40'; 

map.on('click', function(e){
    // Extract the lngLat object from the marker in the event
    console.log("click event occured");
   
    const lngLat = e.lngLat;
    marker1.setLngLat([lngLat.lng, lngLat.lat]);

    // Update the values in the panel
    lngElem.innerHTML = lngLat.lng;
    latElem.innerHTML = lngLat.lat;

    distElem.innerHTML = calculateDistance(lngLat.lng, lngLat.lat, lngElem2.innerHTML, latElem2.innerHTML);
    
    //document.getElementById('panel1').style.backgroundColor = 'green';//rgb(155, 152, 152);
    //await new Promise(r => setTimeout(r, 2000));
    //document.getElementById('panel1').style.backgroundColor = '#fff';
    
});

map.on('contextmenu', function(e){
    // Extract the lngLat object from the marker in the event
    console.log("click event occured");
    
        const lngLat = e.lngLat;         
        marker2.setLngLat([lngLat.lng, lngLat.lat]);

        // Update the values in the panel
        lngElem2.innerHTML = lngLat.lng;
        latElem2.innerHTML = lngLat.lat;

        distElem.innerHTML = calculateDistance(lngLat.lng, lngLat.lat, lngElem.innerHTML, latElem.innerHTML);
        markerMoved = !markerMoved;
    
});

// Listen to the dragend event of the marker
marker1.on('dragend', function(e){
    // Extract the lngLat object from the marker in the event
    const lngLat = e.target.getLngLat();

    // Update the values in the panel
    lngElem.innerHTML = lngLat.lng;
    latElem.innerHTML = lngLat.lat;

    distElem.innerHTML = calculateDistance(lngLat.lng, lngLat.lat, lngElem2.innerHTML, latElem2.innerHTML);
});

// Listen to the dragend event of the marker
marker2.on('dragend', function(e){
    // Extract the lngLat object from the marker in the event
    const lngLat = e.target.getLngLat();

    // Update the values in the panel
    lngElem2.innerHTML = lngLat.lng;
    latElem2.innerHTML = lngLat.lat;

    distElem.innerHTML = calculateDistance(lngLat.lng, lngLat.lat, lngElem.innerHTML, latElem.innerHTML);
});

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}
