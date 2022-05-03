import logo from './logo.svg';
import './App.css';
import BannerImage from './components/bannerImage';
import AlbumMaker from './components/AlbumMarker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BannerImage />
        <h1>My simple demo album</h1>
        <h3>Jeff Ho</h3>
        <AlbumMaker />
      </header>
    </div>
  );
}

export default App;
