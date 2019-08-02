import { locale, dictionary, getClientLocale } from 'svelte-i18n';

// TODO: lazy load phrases
import { phrases, language } from '@dictionary';

export default () => {
  dictionary.set(phrases);

  locale.set(
    getClientLocale({
      navigator: true,
      search: 'lang',
      fallback: language.ENGLISH
    })
  );
};
