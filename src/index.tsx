import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { HashRouter } from "react-router-dom";
import "swiper/css/bundle";
import "./styles.css";


declare module '@mui/material/styles' {
  interface BreakpointOverrides {
      xs: true;
      ss: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
      xxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
      keys: ['xs', 'ss', 'sm', 'md', 'lg', 'xl', "xxl"],
      values: {
          xs: 0,
          ss: 450,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 1800,
      }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
