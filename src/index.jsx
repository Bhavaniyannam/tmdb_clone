import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// Measure performance metrics and log results to console
reportWebVitals(console.log);
