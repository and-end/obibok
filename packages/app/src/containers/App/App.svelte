<script>
  import { setContext } from 'svelte';
  import { _ } from 'svelte-i18n';

  import { Landing, Layout } from '@containers';
  import s from './App.scss';

  let router = {};
  let req = {};

  setContext('router', { getRouter: () => router });

  export { router, req };
</script>

<svelte:head>
  <title>{$_('pageTitle')}</title>
</svelte:head>

<Layout {router} {req}>
  <div class={s.App}>
    <Landing {router} />
  </div>
</Layout>
