<script>
  import { getContext } from 'svelte';
  import s from './IconButton.scss';

  let outline = false;
  let right = false;
  let isFlagIcon = false;
  let text = '';
  let icon = '';
  let to = '';
  let classIcon = '';
  let classText = '';
  let onClick = () => {};

  const router = getContext('router').getRouter();

  async function getIconComponent() {
    if (!icon) {
      return '';
    }

    // FIXME: too complicated, not dry, etc.
    let iconComponent;

    if (isFlagIcon) {
      iconComponent = (await import(`flag-icon-css/flags/${icon}.svg`)).default;
    } else {
      iconComponent = (await import(
        `eva-icons/${outline ? 'outline' : 'fill'}/svg/${outline ? `${icon}-outline` : icon}.svg`
      )).default;
    }

    if (!iconComponent) {
      throw new Error(`Icon "${icon}" not found`);
    }

    return iconComponent;
  }

  function handleClicked() {
    if (to) {
      router.navigate(to);
    }
    onClick();
  }

  export { text, icon, outline, onClick, to, right, classIcon, isFlagIcon, classText };
</script>

<button class:right class={`${$$props.class || ''} ${s.IconButton}`} on:click={handleClicked}>
  {#if icon}
    <div class={classIcon || s.IconButtonIcon}>
      {#await getIconComponent()}
        {''}
      {:then iconComponent}
        {@html iconComponent}
      {:catch error}
        {console.error(error) || ''}
      {/await}
    </div>
  {/if}

  <p class={classText || s.IconButtonText}>{text}</p>
</button>
