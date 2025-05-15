import { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import { tryingToImport } from './MapView';

console.log(tryingToImport());
async function getMapServerData (layerID) {
  const response = await axios.get(
    `https://geoservices2.syadtech.com/server/rest/services/AppWildLifeExplorer/WildLifeExplorerGuestView/MapServer/${layerID}/query`,
    {
      params: {
        f: 'json',
        where: '1=1',
        returnGeometry: true,
        spatialRel: 'esriSpatialRelIntersects'
      }
    }
  )
  return response.data
}
export default function MapWithMapImageLayer(layerID) {
  getMapServerData(layerID).then((data) => console.log(data.mapName));
  const mapRef = useRef();
  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/MapImageLayer',
        'esri/widgets/LayerList',
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, MapImageLayer, LayerList]) => {
      const map = new ArcGISMap({
        basemap: 'dark-gray',
      });

      const mapImageLayer = new MapImageLayer({
        url: 'https://geoservices2.syadtech.com/server/rest/services/AppWildLifeExplorer/WildLifeExplorerGuestView/MapServer',
        title: 'App Wild Life Explorer',
      });
      // When layer is ready, show all sublayers
      mapImageLayer.when(() => {
        mapImageLayer.sublayers.forEach((sublayer) => {
          sublayer.visible = true;
        });
      });

      map.add(mapImageLayer);

      const view = new MapView({
        container: mapRef.current,
        map,
        center: [45, 27],
        zoom: 5,
      });

      const layerList = new LayerList({
        view: view,
      });
      view.ui.add(layerList, 'top-right');
      view.on('pointer-move', (event) => {
        const mapPoint = view.toMap(event);
        const lat = mapPoint.latitude;
        const long = mapPoint.longitude;
        document.getElementById(
          'map-info'
        ).innerHTML = `<p><b>Latitude:</b> ${lat.toFixed(
          4
        )}, <b>Longitude:</b> ${long.toFixed(4)}</p>`;
      });
    });
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
