## alt:V JavaScript Guide

![](https://i.imgur.com/Wp1rE91.png)

[Click to Open Documents](https://altv.stuyk.com/)

A set of documentation that will help you understand alt:V and writing JavaScript code for it.

It is not an API reference and is meant to teach some of the lingo and details about alt:V.

[Unofficial alt:V Documentation Discord](https://discord.gg/UubceKy)

## Development / Testing

```sh
$ npm install
```

```sh
$ npm run dev
```

## Creating Translations

We recommend that each individual file you update has its own commit.

This keeps the history for commits clean and easy to track backwards.

### Creating a New Locale / Translation

It's a pretty short process but requires some work.

0. Fork the Repository

1. Copy `en.js` from `src/.vuepress/locales/en.js`.

1. Rename it to your two letter [ISO-639-1 Code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

1. Edit the titles and translate them. Follow instructions in the copied code. We left comments for you.

1. Copy the folder `en` from the `src` directory.

1. Rename it to your ISO-639-1 Code for your Country / Language.

1. Begin converting documents from English to your language.

1. Test locally! It's very important!

1. Make a pull request.
