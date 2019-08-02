<script>
  import { _, locale } from 'svelte-i18n';

  import { IconButton } from '@components';
  import { locales } from '@dictionary';
  import { setLocale } from '@stores';
  import s from './Header.scss';

  let nextLocale = $locale;

  $: {
    nextLocale = Object.keys(locales).filter((l) => l !== $locale)[0];
  }
</script>

<header class={s.Header}>
  <div class={s.HeaderMain}>
    <IconButton
      isFlagIcon
      class={s.HeaderLocaleButton}
      classText={s.HeaderLocaleButtonText}
      classIcon={s.HeaderLocaleButtonIcon}
      text={locales[$locale].default}
      icon={`4x3/${locales[$locale].default}`}
      onClick={() => setLocale(nextLocale)} />

    <h1 class={s.HeaderLogo}>
      <IconButton to="/" classText={s.HeaderLogoContent} text="obibok" />
    </h1>
  </div>

  <div class={s.HeaderAside}>
    <ul class={s.HeaderLinks}>
      <li class={s.HeaderLink}>
        <IconButton text={$_('languages')} icon="search" outline />
      </li>

      <li class={s.HeaderLink}>
        <IconButton text={$_('qualifications')} icon="star" outline />
      </li>

      <li class={s.HeaderLink}>
        <IconButton to={'/sign-in'} text={$_('signIn')} icon="log-in" />
      </li>
    </ul>
  </div>
</header>
