const { defaultNavbar } = require('./defaults/navbar');

// Locale Imports
const { enLocale, enMenus } = require('./locales/en');
const { roLocale, roMenus } = require('./locales/ro');
const { skLocale, skMenus } = require('./locales/sk');
const { trLocale, trMenus } = require('./locales/tr');
const { deLocale, deMenus } = require('./locales/de');
const { defaultSEO } = require('./seo/default');

const title = 'Unofficial alt:V Documentation';
const desc = 'Unoffical Documentation and Tutorials for the GTA:V Client alt:V.';
const card = 'https://i.imgur.com/G09dNXt.png';

const meta = [
    ['meta', { name: 'theme-color', content: '#008736' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'description', content: desc }],
    // Favicons
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    [
        'link',
        {
            href:
                'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
            rel: 'stylesheet'
        }
    ],
    // SEO
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
    ['meta', { property: 'twitter:image', content: card }]
];

module.exports = {
    base: '/',
    title: title,
    description: desc,
    locales: {
        ...enLocale,
        // Import all normal locales here.
        ...roLocale,
        ...skLocale,
        ...trLocale,
        ...deLocale
    },
    head: meta,
    themeConfig: {
        repo: 'stuyk/altv-javascript-guide',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: true,
        logo: '/logo_large.png',
        locales: {
            ...enMenus,
            // Import  all locales for menus here.
            ...roMenus,
            ...skMenus,
            ...trMenus,
            ...deMenus
        },
        nav: [...defaultNavbar]
    },
    plugins: [
        '@vuepress/last-updated',
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/active-header-links',
        ['@dovyp/vuepress-plugin-clipboard-copy', true],
        [
            '@snowdog/vuepress-plugin-pdf-export',
            {
                puppeteerLaunchOptions: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                }
            }
        ],
        ...defaultSEO
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
