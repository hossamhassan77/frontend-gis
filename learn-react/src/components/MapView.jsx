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
        'esri/layers/FeatureLayer',
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleFillSymbol"
      ],
      { css: true }
    ).then(([Map, MapView, FeatureLayer, SimpleRenderer, SimpleFillSymbol]) => {
      const map = new Map({
        basemap: 'satellite',
      });
      const symbol = new SimpleFillSymbol({
        color: [0, 120, 200, 0.5], // RGBA: blue fill with transparency
        outline: {
          color: [0, 0, 0, 1],
          width: 1
        }
      });

      const renderer = new SimpleRenderer({
        symbol
      });
      const raptorNestLayer = new FeatureLayer({
        url: 'https://services5.arcgis.com/A7KxbLP4BqGmGXEY/arcgis/rest/services/raptorNests/FeatureServer/0',
        renderer,
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
