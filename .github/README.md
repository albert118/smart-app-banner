# Easy Smart App Banner

[![NPM version](https://img.shields.io/npm/v/@easy-smart-app-banner/core?logo=npm&color=e3e023)](https://www.npmjs.com/package/@easy-smart-app-banner/core)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

An Easy Smart App Banner for promoting mobile app installs based on the Safari Apple Experience.

> [!NOTE]
> This isn't for everyone. Most people should probably prefer the [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) approach. However, if you need a 'simple' banner that redirects to a _native_ mobile app then keep reading.
>
> For specific details on iOS and Safari specifically, read [here](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners) and for Android see [here](https://developer.chrome.com/blog/app-install-banners-native/).

<img src='https://github.com/user-attachments/assets/de1387da-e51a-4851-9a64-345dbf0349ce' style='width: 69%;' />

## Features

- Typescript support
- Standalone/Frameworkless
- Small! `15.59 kB │ gzip: 4.50 kB │ map: 50.44 kB`
- Platform specific
  - custom banner for iOS (non-Safari) and Android user agents
  - Safari specific config
- Option, use SCSS/Sass variables to configure the banner as needed

---

## Install

```sh
npm i -S @easy-smart-app-banner/core
```

## Configuration

<https://github.com/albert118/smart-app-banner/blob/a3b0ec2a68090d45c64b79c2c92f09204f87bf05/src/models.ts#L1-L110>

## Advanced Usage

### Platform Specific Overrides

Several options have platform specific overrides. These take precedence over any equivalent option when running on the relevant platform.

> For specific details on iOS and Safari specifically, read [here](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners). For Android see [here](https://developer.chrome.com/blog/app-install-banners-native/).

#### Icon

A single icon is typical, but specific ones can be configured.

```ts
{
    icon: '/assets/my-icon.jpeg',
    androidIcon: null,
    appleIcon: null,
}
```

#### Price

The price tagline defaults to FREE with platform specific defaults for both Android and iOS platforms.

```ts
{
    price: 'FREE',
    androidPrice: 'FREE - On the Google Play Store',
    applePrice: 'GET - On the App Store'
}
```

#### Call to Action Button Label

```ts
{
    buttonLabel: 'View',
    androidButtonLabel: null,
    appleButtonLabel: null
}
```

### SCSS/Sass Variables

Styles can be overriden using the provided SCSS/Sass variables.

<https://github.com/albert118/smart-app-banner/blob/3b9011fa5b391e54901068a895253cebf2b539f6/src/styles/_vars.scss#L1-L8>

You can provide these styles as needed by using the `.scss` files instead,

```scss
@use 'smart-app-banner/dist/variables' as *;

// overwrite as needed
$background-color: #000;
```

### Platform Specific Plugins

> Looking for a platform that isn't here? Propose a PR to add it!

* [Vue 3 Plugin](https://github.com/albert118/smart-app-banner/tree/master/plugins/vue-plugin)

## Development

To get started, pull the repo and run a build as well as the tests.

> don't forget to run `npm i`!

```ts
npm run build
npm run test
```

You can checkout the rest of the commands in the [package.json](./package.json).

The next step would be to boot a demo project. Checkout the Vue demo [here](https://github.com/albert118/smart-app-banner/tree/master/demo/vue).

## TODO

- [ ] cookie feature ("remember dismissal")

## Licence

[MIT](./LICENSE) License © 2025-PRESENT [Albert Ferguson](https://github.com/albert118/)
