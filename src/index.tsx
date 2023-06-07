import './index.css';
import App from './App';
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';

const root = document.getElementById('root');
const title = import.meta.env.VITE_APP_NAME || 'SolidJS';

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

document.title = title + ' Gateway';

render(() => (
  <Router source={hashIntegration()}>
    <App />
  </Router>
), document.getElementById('root') as HTMLElement);

