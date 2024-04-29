import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./app/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import './css/index.css';
import ContextProvider from './app/context/ContextProvider';

const container = document.getElementById('root')!;//second argument   REAL DOM
const root = createRoot(container);

root.render(               // first argument  VIRTUAL DOM
  <React.StrictMode>
    <Provider store={store}>  
    <ContextProvider>
    <ThemeProvider theme={theme}> 
    <CssBaseline />      
    <Router>
      <App />
    </Router>
      
      </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
