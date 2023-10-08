import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
