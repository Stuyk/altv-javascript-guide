const defaultNavbar = [
    {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
            { text: 'Deutsch', link: '/de/introduction/' },
            { text: 'English', link: '/en/introduction/' },
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
    },
    {
        text: 'Unofficial Docs Discord',
        link: 'https://discord.gg/UubceKy'
    }
];

module.exports = {
    defaultNavbar
};
