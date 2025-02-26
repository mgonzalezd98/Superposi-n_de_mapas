// Inicializar el mapa centrado en Colombia con zoom activado y arrastre desactivado
var map = L.map('map', {
    center: [4.5709, -74.2973],
    zoom: 6,
    zoomControl: true,      // Activa el control de zoom (+/-)
    dragging: false,        // Desactiva el arrastre (paneo)
    scrollWheelZoom: true,  // Permite hacer zoom con la rueda del ratón
    doubleClickZoom: true,  // Permite hacer zoom con doble clic
    touchZoom: true         // Permite hacer zoom táctil
});

// Capa base de OpenStreetMap
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Segunda capa: Mapa político de CartoDB
var politicoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; CartoDB | OpenStreetMap contributors'
}).addTo(map);

// Capa adicional: OpenTopoMap
var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenTopoMap contributors'
}).addTo(map);

// Agregar herramientas de dibujo con Geoman
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