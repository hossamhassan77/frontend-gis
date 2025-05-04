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
            color: [200, 10, 90],
            outline:{
                 color: "white",
                width: 1
                },
        }
    })
    mapView.on("click", function(event){
        console.log(event);
        document.querySelector("#latLng").innerHTML = `<b>Latitude:</b> ${event.mapPoint.latitude}, <b>Longitude:</b> ${event.mapPoint.longitude}`;
        var customMarkers = new Graphic({
            geometry: event.mapPoint,
            symbol: {
                popupTemplate: {
                    title:"point",
                    content:document.querySelector("#latLng").innerHTML
                },
                type: "simple-marker",
                style: "cross",
                color: "red",
                size: 10,
                outline: {
                    color:"black",
                    width: 1
                }
            },
        })
        mapView.graphics.add(customMarkers)
    })
    mapView.graphics.add(marker)
})