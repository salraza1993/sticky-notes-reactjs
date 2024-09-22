import './assets/App.css';
import "fontawesome-free-v6/css/all.css";
import Header from './components/Header';
import StickyNotes from './components/StickyNotes';
import { useStickyContext } from './contexts/stickyContextManager';

function App() {
  const { resetPositionsState } = useStickyContext();
  return (
    <div className="main-wrapper">
      <Header />
      <StickyNotes key={resetPositionsState} />
    </div>
  );
}

export default App;
