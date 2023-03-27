import './App.css';
import { Home } from './pages/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Settings } from 'luxon';

function App() {
  Settings.defaultLocale = 'en-uk';
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
