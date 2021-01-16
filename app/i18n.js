/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');
const myLocaleData = require('react-intl/locale-data/my');

const enTranslationMessages = require('./translations/en.json');
const zhTranslationMessages = require('./translations/zh.json');
const myTranslationMessages = require('./translations/my.json');
const zeTranslationMessages = require('./translations/ze.json');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);
addLocaleData(myLocaleData);
addLocaleData({ locale: 'ze', pluralRuleFunction: () => {} });

const DEFAULT_LOCALE = 'zh';

// prettier-ignore
const appLocales = [
  'en',
  'zh',
  'my',
  'ze',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  my: formatTranslationMessages('my', myTranslationMessages),
  ze: formatTranslationMessages('ze', zeTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
