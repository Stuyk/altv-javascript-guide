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
                    children: ['/docs/introduction/', '/docs/introduction/installing_altv']
                },
                {
                    title: 'API',
                    collapsable: false,
                    children: ['/docs/api/']
                },
                {
                    title: 'Events',
                    collapsable: false,
                    children: ['/docs/events/', '/docs/events/using_events']
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
        sidebarDepth: 1,
        sidebar: {
            collapsable: false,
            '/docs/': sidebar.docs
        }
    },
    plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
