const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'tr';
const languageUpper = 'TR';
const languageName = 'Turkish';

const trLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `Döküman | ${languageName}`
    }
};

const sidebar = [
    {
        title: 'Guide',
        collapsable: false,
        children: [
            {
                title: '🚀 Giriş',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ Taşıma`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 API Rehberi`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 Eventler`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 Oyuncu`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `📊 Veritabanları`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 El kitabı`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            },
            {
                title: `📖 Data Tabloları`,
                collapsable: false,
                children: buildSidebar(`/${language}/tables/`)
            }
        ]
    }
];

// change this to first two letters + menus. ie. trMenus
const trMenus = {
    [`/${language}/`]: {
        label: languageName,
        nav: [...defaultNavbar],
        sidebar: {
            collapsable: false,
            [`/${language}/`]: sidebar
        },
        sidebarDepth: 3
    }
};

module.exports = {
    trLocale,
    trMenus
};
