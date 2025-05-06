// require(["esri/Map", "esri/views/MapView", "esri/Graphic"], function(Map, MapView, Graphic) {
//     var glMap = new Map ({
//         basemap: "osm"
//     })
//     var glMapView = new MapView({
//         map: glMap,
//         container: "graphic-layer-map",
//         center:[30,30],
//         zoom:3
//     })
//     var gl = new Graphic({
//         geometry: {
//             type: "point",
//             latitude: 30,
//             longitude:30
//         },
//         symbol: {
//             type:"simple-marker",
//             color: "red",
//             size:10
//         }
//     })
//     glMapView.graphics.add(gl)
// })

const users = [
    { id: 1, name: "Alice", age: 25, active: true },
    { id: 2, name: "Bob", age: 30, active: false },
    { id: 3, name: "Charlie", age: 22, active: true },
    { id: 4, name: "David", age: 35, active: false }
  ];

console.log(users.filter(actv => actv.active == false))
console.log(users.map(mapFunc => `My name is ${mapFunc.name}, I am ${mapFunc.age}.`))
console.log(users.reduce((tot, totAge) => tot+totAge.age, 0))