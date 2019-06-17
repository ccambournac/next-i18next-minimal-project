// https://github.com/isaachinman/next-i18next
// https://react.i18next.com/
import NextI18Next from 'next-i18next';

// https://github.com/isaachinman/next-i18next#options
// https://www.i18next.com/overview/configuration-options
const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['fr'],
    localeSubpaths: 'all',
    localePath: 'i18n',
    browserLanguageDetection: true,
    serverLanguageDetection: false,
    ignoreRoutes: [
        '/_next',
        '/static',
        '/data',
        '/i18n'
    ]
});

export default NextI18NextInstance;
// Optionally, export class methods as named exports
export const {
    i18n,
    Link,
    Router,
    Trans,
    appWithTranslation,
    withTranslation,
    useTranslation
} = NextI18NextInstance;

