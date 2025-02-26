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
}).addTo(map);

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

// Crear la barra corrediza en el centro
var sliderContainer = document.createElement('div');
sliderContainer.style.position = 'absolute';
sliderContainer.style.top = '50%';
sliderContainer.style.left = '50%';
sliderContainer.style.transform = 'translate(-50%, -50%)';
sliderContainer.style.zIndex = '1000';
sliderContainer.style.background = 'rgba(255, 255, 255, 0.8)';
sliderContainer.style.padding = '10px';
sliderContainer.style.borderRadius = '5px';

var slider = document.createElement('input');
slider.type = 'range';
slider.min = '0';
slider.max = '100';
slider.value = '50';
slider.style.width = '200px';

sliderContainer.appendChild(slider);
document.body.appendChild(sliderContainer);

// Manejar el evento del slider
slider.addEventListener('input', function() {
    var opacity = slider.value / 100;
    baseLayer.setOpacity(1 - opacity);
    overlayLayer.setOpacity(opacity);
});