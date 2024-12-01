import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';


const container = document.getElementById('root');
const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(
  <App />
);
