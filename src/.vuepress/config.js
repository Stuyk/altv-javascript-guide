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
    ['meta', { property: 'og:url', content: 'https://stuyk.github.io/altv-javascript-guide' }],
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

const sidebar = {
    docs: [
        //
        {
            //
            title: 'Guide',
            collapsable: false,
            children: [
                {
                    title: '🚀 Introduction',
                    collapsable: false,
                    children: [
                        '/docs/introduction/',
                        '/docs/introduction/installing_altv',
                        '/docs/introduction/debugging',
                        '/docs/introduction/javascript_primer'
                    ]
                },
                {
                    title: '♻️ Conversion',
                    collapsable: false,
                    children: ['/docs/conversion/']
                },
                {
                    title: '📄 API Guide',
                    collapsable: false,
                    children: ['/docs/api/', '/docs/api/classes', '/docs/api/arrays', '/docs/api/events']
                },
                {
                    title: '💡 Events',
                    collapsable: false,
                    children: ['/docs/events/', '/docs/events/using_events', '/docs/events/good_practice']
                },
                {
                    title: '🧍 Player',
                    collapsable: false,
                    children: ['/docs/player/', '/docs/player/scriptid']
                },
                {
                    title: '📚 Cookbook',
                    collapsable: false,
                    children: [
                        '/docs/cookbook/',
                        '/docs/cookbook/snippet_drawtext',
                        '/docs/cookbook/snippet_math',
                        '/docs/cookbook/snippet_prototyping',
                        '/docs/cookbook/snippet_encryption',
                        '/docs/cookbook/snippet_sha256',
                        '/docs/cookbook/snippet_shuffle',
                        '/docs/cookbook/snippet_marker',
                        '/docs/cookbook/snippet_notifications'
                    ]
                }
            ]
        }
    ]
};

module.exports = {
    base: '/altv-javascript-guide/',
    title: title,
    description: desc,
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
        nav: [
            {
                text: 'Start Learning',
                link: '/docs/introduction/'
            },
            {
                text: 'alt:V Website',
                link: 'https://altv.mp'
            },
            {
                text: 'Support Stuyk',
                link: 'https://patreon.com/stuyk'
            }
        ],
        sidebarDepth: 3,
        sidebar: {
            collapsable: false,
            '/docs/': sidebar.docs
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
                hostname: 'https://stuyk.github.io/altv-javascript-guide/'
            }
        ],
        [
            'robots',
            {
                host: 'https://stuyk.github.io/altv-javascript-guide/',
                allowAll: true,
                sitemap: '/sitemap.xml'
            }
        ],
        ['seo']
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
