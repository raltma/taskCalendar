import './App.css';
import { Home } from './pages/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Settings } from 'luxon';
import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  Settings.defaultLocale = 'en-GB';
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Home />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
