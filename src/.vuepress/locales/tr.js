const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'tr';
const languageUpper = 'TR';
const languageName = 'Turkish';

const trLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `Documentation | ${languageName}`
    }
};

const sidebar = [
    {
        title: 'Guide',
        collapsable: false,
        children: [
            {
                title: '🚀 Introduction',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ Conversion`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 API Guide`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 Events`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 Player`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `📊 Databases`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 Cookbook`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            },
            {
                title: `📖 Data Tables`,
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
