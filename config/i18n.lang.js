module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      short: 'EN',
      name: 'English',
      img: 'english.png',
      file: 'en.js',
    },
    {
      code: 'hk',
      iso: 'hk-HKG',
      short: 'HK',
      name: 'HongKong',
      img: 'hongkong.png',
      file: 'hk.js',
    }
  ],
  defaultLocale: 'en',
  strategy: 'no_prefix',
  lazy: true,
  detectBrowserLanguage: {
    cookieKey: 'redirected',
    useCookie: true,
    alwaysRedirect: true
  },
  langDir: 'locales/global/',
  parsePages: false,
  pages: {}
};
