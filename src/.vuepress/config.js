const { description } = require('../../package');

const sidebar = {
    docs: [
        //
        {
            //
            title: 'Guide',
            collapsable: false,
            children: [
                {
                    title: 'Introduction',
                    collapsable: false,
                    children: [
                        '/docs/introduction/',
                        '/docs/introduction/installing_altv',
                        '/docs/introduction/debugging',
                        '/docs/introduction/javascript_primer'
                    ]
                },
                {
                    title: 'API',
                    collapsable: false,
                    children: ['/docs/api/', '/docs/api/classes', '/docs/api/arrays', '/docs/api/events']
                },
                {
                    title: 'Events',
                    collapsable: false,
                    children: ['/docs/events/', '/docs/events/using_events']
                },
                {
                    title: 'Cookbook',
                    collapsable: false,
                    children: ['/docs/cookbook/']
                }
            ]
        }
    ]
};

module.exports = {
    base: '/altv-javascript-guide/',
    title: 'alt:V JavaScript Tutorials',
    description: description,
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],
    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        nav: [
            {
                text: 'Start Learning',
                link: '/docs/introduction/'
            }
        ],
        sidebarDepth: 3,
        sidebar: {
            collapsable: false,
            '/docs/': sidebar.docs
        }
    },
    plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
    configureWebpack: {
        resolve: {
            alias: {
                '@gif': '/gifs/',
                '@img': '/img/'
            }
        }
    }
};
