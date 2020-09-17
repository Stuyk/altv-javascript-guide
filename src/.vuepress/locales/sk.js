const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'sk';
const languageUpper = 'SK';
const languageName = 'Slovenský';

const skLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `Dokumentácia | ${languageName}`
    }
};

const sidebar = [
    {
        title: 'Príručká',
        collapsable: false,
        children: [
            {
                title: '🚀 Úvod',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ Conversion`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 Sprievodca API`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 Eventy`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 Hráč`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `📊 Databázy`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 Príručká`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            }
        ]
    }
];

// change this to first two letters + menus. ie. trMenus
const skMenus = {
    [`/${language}/`]: {
        label: languageName,
        nav: [...defaultNavbar],
        sidebar: {
            collapsable: false,
            [`/${language}/`]: sidebar
        }
    }
};

module.exports = {
    skLocale,
    skMenus
};
