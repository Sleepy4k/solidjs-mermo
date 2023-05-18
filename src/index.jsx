import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import Route from './components/Routes';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => () => (
  <Router>
    <Route />
  </Router>
), root);
