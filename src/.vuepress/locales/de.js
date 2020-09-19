const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'de';
const languageUpper = 'DE';
const languageName = 'Deutsch';

const deLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `Dokumentation | ${languageName}`
    }
};

const sidebar = [
    {
        title: 'Inhaltsverzeichnis',
        collapsable: false,
        children: [
            {
                title: '🚀 Einleitung',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ Konvertierung`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 API Hilfe`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 Events`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 Spieler`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `📊 Datenbanken`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 Nützliches Wissen`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            }
        ]
    }
];

const deMenus = {
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
    deLocale,
    deMenus
};
