const defaultNavbar = [
    {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
            { text: 'English', link: '/en/introduction/' },
            { text: 'Chinese', link: '/zh/introduction/' },
            { text: 'Deutsch', link: '/de/introduction/' },
            { text: 'Română', link: '/ro/introduction/' },
            { text: 'Slovenský', link: '/sk/introduction/' },
            { text: 'Türk', link: '/tr/introduction/' }
        ]
    },
    {
        text: 'Support',
        link: '/support/'
    },
    {
        text: 'alt:V Hub',
        link: 'https://hub.altv.mp'
    }
];

module.exports = {
    defaultNavbar
};
