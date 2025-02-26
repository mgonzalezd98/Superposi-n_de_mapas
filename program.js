/* Archivo script.js */
// Inicializar el mapa
var map = L.map('map').setView([0, 0], 2);

// Capa base de OpenStreetMap
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Segunda capa de OpenStreetMap con otro estilo
var overlayLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenTopoMap contributors'
});

// Control de capas
var baseMaps = {
    "OpenStreetMap": baseLayer
};

var overlayMaps = {
    "OpenTopoMap": overlayLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Agregar funcionalidad de Geoman
map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawPolygon: true,
    drawPolyline: true,
    drawCircle: true,
    drawRectangle: true,
    cutPolygon: true,
    editMode: true,
    dragMode: true,
    removalMode: true
});
