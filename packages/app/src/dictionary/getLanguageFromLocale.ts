import locales from './locales';

export default (locale) => {
  return Object.keys(locales).filter((language) => locales[language].values.includes(locale))[0];
};
