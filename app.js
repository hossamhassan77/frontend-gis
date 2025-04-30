require(["esri/Map", "esri/views/MapView", "esri/Graphic"], function (Map, MapView, Graphic) {
    var map = new Map({
        basemap: "satellite",
    });
    var mapView = new MapView({
        container: "map-frame",
        map: map,
        zoom: 3,
        center: [30, 30],
    });
    mapView.ui.move("zoom", "top-right")
    document.querySelector("#goto").onclick = function (){
    mapView.goTo({
        center: [50,50],
        zoom:15
        },
        {duration: 5000},
    )};
    var marker = new Graphic({
        geometry: {
            type: "point",
            latitude:30,
            longitude:29
        },
        symbol: {
            type: "simple-marker",
            color: [226, 119, 40]
        }
    })
    mapView.on("click", function(event){
        console.log(event);
        document.querySelector("#latLng").innerHTML = `<b>Latitude:</b> ${event.mapPoint.latitude}, <b>Longitude:</b> ${event.mapPoint.longitude}`
    })
    mapView.graphics.add(marker)
})