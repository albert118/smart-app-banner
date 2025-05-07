# smart-app-banner

[![NPM version](https://img.shields.io/npm/v/smart-app-banner?color=a1b858&label=)](https://www.npmjs.com/package/smart-app-banner) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A Smart App Banner for promoting mobile app installs based on the Safari Apple Experience.

> [!NOTE]
> This isn't for everyone. Most people should probably prefer the [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) approach. However, if you need a 'simple' banner that redirects to a _native_ mobile app then keep reading.
>
> For specific details on iOS and Safari specifically, read [here](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners) and for Android see [here](https://developer.chrome.com/blog/app-install-banners-native/).

## TODO

- [ ] change package name to avoid conflicts
- [ ] add example screenshots
- [ ] tests
- [ ] styling
- [ ] cookie feature ("remember dismissal")
- [ ] Vue 3 usage (plugin)
- [ ] check bundle size and add badge

## Features

- Typescript support
- Standalone/Frameworkless
- Small!
- Platform specific
  - custom banner for iOS (non-Safari) and Android user agents
  - Safari specific config

> TODO: Examples per platform

---

## Install

```sh
npm i -S smart-app-banner
```

## Configuration

https://github.com/albert118/smart-app-banner/blob/a3b0ec2a68090d45c64b79c2c92f09204f87bf05/src/models.ts#L1-L110

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

### Vue usage (plugin TODO)

> TODO

## Licence

[MIT](./LICENSE) License © 2025-PRESENT [Albert Ferguson](https://github.com/albert118/)
