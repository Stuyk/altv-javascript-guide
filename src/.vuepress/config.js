const { enLocale, enMenus } = require('./locales/en');
const { trLocale, trMenus } = require('./locales/tr');

const googleSearchConsole = 'bRc7ZyO5gVfceHGhFLN1AvtcptSSPl_6SaLIMHde7bQ';
const googleAdsenseCode = `ca-pub-3314445478682546`;
const title = 'alt:V Tutorials by Stuyk';
const desc = 'Tutorials for the alt:V Framework in JavaScript created by Stuyk. Not for FiveM or RAGE:MP.';
const card = 'https://i.imgur.com/4yB3BJd.png';

const meta = [
    ['meta', { name: 'description', content: desc }],
    ['meta', { itemprop: 'name', content: title }],
    ['meta', { itemprop: 'description', content: desc }],
    ['meta', { itemprop: 'image', content: card }],
    ['meta', { property: 'og:url', content: 'https://altv.stuyk.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: desc }],
    ['meta', { property: 'og:image', content: card }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: title }],
    ['meta', { property: 'twitter:description', content: desc }],
    ['meta', { property: 'twitter:image', content: card }],
    ['meta', { name: 'google-site-verification', content: googleSearchConsole }],
    [
        'script',
        {
            'data-ad-client': googleAdsenseCode,
            async: true,
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        }
    ]
];

module.exports = {
    base: '/',
    title: title,
    description: desc,
    locales: {
        ...enLocale,
        // Import all normal locales here.
        ...trLocale
    },
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ...meta
    ],
    themeConfig: {
        repo: 'stuyk/altv-javascript-guide',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        locales: {
            ...enMenus,
            // Import  all locales for menus here.
            ...trMenus
        }
    },
    plugins: [
        '@vuepress/last-updated',
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/active-header-links',
        ['@vuepress/google-analytics', { ga: 'UA-83296585-4' }],
        [
            'sitemap',
            {
                hostname: 'https://altv.stuyk.com/'
            }
        ],
        [
            'robots',
            {
                host: 'https://altv.stuyk.com/',
                allowAll: true,
                sitemap: '/sitemap.xml'
            }
        ]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@gif': '/gifs/',
                '@img': '/img/'
            }
        }
    }
};
