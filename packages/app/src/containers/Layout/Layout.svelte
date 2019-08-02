<script>
  import { _ } from 'svelte-i18n';

  import { Header } from '@containers';
  import s from './Layout.scss';
</script>

<svelte:head>
  <title>{$_('pageTitle')}</title>
</svelte:head>

<div class={s.Layout}>
  <Header />
  <slot />
</div>
