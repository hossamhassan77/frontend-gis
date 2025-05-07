import './App.css';
import Hello from './Components/PropsTest';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import About from './About/About';
import Home from './Home/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav id='navigation-bar'>
          <Link to="/Home">Home</Link> | <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/" element={<Hello name="Meso" num={20} />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
