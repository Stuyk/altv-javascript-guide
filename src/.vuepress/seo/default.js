const defaultSEO = [
    [
        'seo',
        {
            publishedAt: () => new Date(Date.now()).toISOString(),
            modifiedAt: () => new Date(Date.now()).toISOString()
        }
    ],
    [
        'robots',
        {
            host: 'https://altv.stuyk.com/',
            allowAll: true,
            sitemap: '/sitemap.xml'
        }
    ],
    ['@vuepress/google-analytics', { ga: 'UA-83296585-4' }],
    ['web-monetization', { address: '$ilp.uphold.com/gJRgqRGGRFHp' }]
];

module.exports = {
    defaultSEO
};
