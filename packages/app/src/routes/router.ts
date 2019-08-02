import crayon from 'crayon';
import svelte from 'crayon-svelte';

import { App } from '@containers';

function createMainRouter(): void {
  const mainHandle = document.getElementById('AppContainer') || undefined;
  const router = crayon.create();

  router.use(svelte.router(mainHandle));

  router.path('/', (req, res) => {
    res.mount(App, { req, router });
  });

  router.load();
}

export { createMainRouter };
