import './App.css';
import MapWithMapImageLayer from './components/mapImage';

function App() {
  return (
    <div className="App">
      <MapWithMapImageLayer />
      <div id='map-info'>
        <p><strong>Curser location</strong></p>
      </div>
    </div>
  );
}
export default App;
