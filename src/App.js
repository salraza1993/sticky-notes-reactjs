import './assets/App.css';
import "fontawesome-free-v6/css/all.css";
import Header from './components/Header';
import StickyNotes from './components/StickyNotes';

function App() {
  return (
    <div className="main-wrapper">
      <Header />
      <StickyNotes />
    </div>
  );
}

export default App;
