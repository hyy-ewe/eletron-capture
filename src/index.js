import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
