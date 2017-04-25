/**
 * Created by michogarcia on 22/04/17.
 */
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'

let map = L.map('map').setView([42.284829, -8.553642], 8)

const topo = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
})

const pnoa = L.tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma?', {
    layers: 'OI.OrthoimageCoverage'
}).addTo(map)

const baseMaps = {
    Ortofoto: pnoa,
    Topográfico: topo
}

L.control.layers(baseMaps).addTo(map)

let layer = null

map.on('click', (evt) => {
    const point = map.latLngToContainerPoint(evt.latlng, map.getZoom())
    const size = map.getSize()
    const bbox = map.getBounds().toBBoxString()

    const URL = `getfeatureinfo?bbox=${bbox}&height=${size.y}&width=${size.x}&x=${point.x}&y=${point.y}`
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(request) {
        if (request.target.readyState != 4 || request.target.status != 200) return;
        const geom = request.target.responseText;
        const theStyle = {
            "color": "#23ff0c",
            "weight": 3,
            "opacity": 0.8
        };
        if (layer) {
            layer.remove()
        }
        layer = L.geoJSON(JSON.parse(geom), {
            style: theStyle
        }).addTo(map)
    };
    xhr.open('GET', URL, true);
    xhr.send();
})
