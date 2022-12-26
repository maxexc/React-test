import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import App2 from 'functional-components/App2';
// import './index.css';
// import 'modern-normalize/modern-normalize.css';
import './styles/base.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById('app2')).render(
  // <React.StrictMode>
    <App2 />
  // </React.StrictMode>
);
