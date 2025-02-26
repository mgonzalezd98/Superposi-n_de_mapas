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
});

// Agregar control deslizante de comparación
var sideBySide = L.control.sideBySide(politicoLayer, baseLayer).addTo(map);

// Control de capas
var baseMaps = {
    "OpenStreetMap": baseLayer,
    "CartoDB Político": politicoLayer
};

var overlayMaps = {
    "OpenTopoMap": topoLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Agregar herramientas de dibujo con Geoman
map.pm.addControls({
    position: 'topleft',
    drawMarker: true,    // Dibujar puntos
    drawPolyline: true,  // Dibujar líneas
    drawPolygon: true,   // Dibujar polígonos
    drawRectangle: true, // Dibujar rectángulos
    drawCircle: true,    // Dibujar círculos
    cutPolygon: true,    // Recortar polígonos
    editMode: true,      // Editar geometrías
    dragMode: true,      // Mover geometrías
    removalMode: true    // Eliminar geometrías
});

// Permitir interacción sobre las geometrías dibujadas
map.on('pm:create', function(e) {
    e.layer.pm.enable();  // Habilita la edición para la nueva geometría
    console.log('Geometría creada:', e.layer.toGeoJSON());
});
