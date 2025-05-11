import { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export default function MapView() {
  const mapRef = useRef(null);
  useEffect(() => {
    let view;
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer'
      ],
      { css: true }
    ).then(([Map, MapView, FeatureLayer]) => {
      const map = new Map({
        basemap: 'gray-vector',
      });
      const renderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 6,
          color: "black",
          outline: {
            width: 0.5,
            color: "white"
          }
        }
      }
      const raptorNestLayer = new FeatureLayer({
        url: 'https://services5.arcgis.com/A7KxbLP4BqGmGXEY/arcgis/rest/services/raptorNests/FeatureServer/0',
        outFields: ['*'],
        renderer: renderer,
      });
      // Dynamically generate popup
      raptorNestLayer.when(() => {
        const fieldInfos = raptorNestLayer.fields
        .filter(f => !["OBJECTID", "Shape", "GlobalID"].includes(f.name))
        .map(f => ({
          fieldName: f.name,
          label: f.alias || f.name,
          format:
              f.type === "date"
              ? { dateFormat: "short-date" }
                : f.type === "double" || f.type === "integer"
                ? { digitSeparator: true, places: 2 }
                : undefined
              }));
            console.log(fieldInfos)
              raptorNestLayer.popupTemplate = {
          title: raptorNestLayer.title || "Feature Info",
          content: [{
            type: "fields",
            fieldInfos
          }]
        };
      });
      map.add(raptorNestLayer);
      view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-104, 40],
        zoom: 8,
      });
    });
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);
  return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
}
