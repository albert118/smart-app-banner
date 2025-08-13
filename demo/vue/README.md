# Smart App Banner (Vue Demo)

> This is a typical create Vue. You can create a Vue project using `npm create vue@latest`.

This template should help get you started developing with Vue 3 in Vite.

## Quick Start

Install the deps and boot the demo!

```ts
npm i
npm run dev
```

For more commands, checkout the [package.json](./package.json)

## Development

### Enabling Vue Developer Tools

These are disabled, as they can get in the way of the banner. To enable them, uncomment the plugin within `vite.config.ts`.

### Updating the Plugin Version

Having published a new version of the plugin to NPM,

1. Update the `package.json` version
2. Update the README's as needed (bump the size note)
3. Publish the branch, done! 🎈

### Developing against a Local Build

If you ever want to develop against a local build version of the plugin, then swap the package version to `file:../../`.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
