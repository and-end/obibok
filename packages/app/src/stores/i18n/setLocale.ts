import { _, locale as i18nLocale } from 'svelte-i18n';

// TODO: check whether locale (language) is available
export default (locale) => {
  i18nLocale.set(locale);
};
