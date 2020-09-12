/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import ErrorFallback from './components/ErrorFallback';

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root'),
);

serviceWorker.unregister();
