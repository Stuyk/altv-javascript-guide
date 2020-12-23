const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'zh-cn'; // zh-cn
const languageUpper = 'ZH-CN';
const languageName = '中文简体'; // Simplified Chinese

const zhcnLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `文档资料 | ${languageName}`
    }
};

const sidebar = [
    {
        title: '指南',
        collapsable: false,
        children: [
            {
                title: '🚀 介绍',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ 转换`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 API 指南`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 事件`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 玩家`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `🚙 载具`,
                collapsable: false,
                children: buildSidebar(`/${language}/vehicle/`)
            },
            {
                title: `📊 数据库`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 杂项`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            },
            {
                title: `📖 资料库`,
                collapsable: false,
                children: buildSidebar(`/${language}/tables/`)
            }
        ]
    }
];

// change this to first two letters + menus. ie. trMenus
const zhcnMenus = {
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
    zhcnLocale,
    zhcnenMenus
};
