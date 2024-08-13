# Changelog

All notable changes to this project will be documented in this file.

# [1.0.1](https://github.com/favware/concourse-discord-webhook-resource/compare/v1.0.0...v1.0.1) - (2024-08-13)

## 🐛 Bug Fixes

- Fixed image name `concource` -> `concourse` ([fc01623](https://github.com/favware/concourse-discord-webhook-resource/commit/fc01623022852c9f39b472021c2681d1c2f00e02))

## 📝 Documentation

- **readme:** Fix icon in example ([7ad8e61](https://github.com/favware/concourse-discord-webhook-resource/commit/7ad8e611ccfc4b3023ecda5bc8b6d238cfc11820))
- **readme:** Change slack for discord ([ce32501](https://github.com/favware/concourse-discord-webhook-resource/commit/ce32501460aaff3827d9cb18767c6e275cf18896))

# [1.0.0](https://github.com/favware/concourse-discord-webhook-resource/tree/v1.0.0) - (2024-08-10)

## 🐛 Bug Fixes

- Slice off ending new line from content ([a3edb20](https://github.com/favware/concourse-discord-webhook-resource/commit/a3edb2041f88084cb06081a382188df2a13d654b))
- Fixed incorrect option mapping ([4cbca15](https://github.com/favware/concourse-discord-webhook-resource/commit/4cbca15e913db137316e8d975c2dc194c495171d))
- Better jq parsing ([3b74f7c](https://github.com/favware/concourse-discord-webhook-resource/commit/3b74f7cd1021386ff09307828bc28d5dec967831))
- Properly process boolean values + debugging ([990184d](https://github.com/favware/concourse-discord-webhook-resource/commit/990184dd589e195c3b29f80f2c500ba01d291d04))
- Wrap with quotes again ([e2ac7d7](https://github.com/favware/concourse-discord-webhook-resource/commit/e2ac7d7155536e06d5133eb3a8c988d9ae15dcb6))
- Parse out double strings ([dc5cd58](https://github.com/favware/concourse-discord-webhook-resource/commit/dc5cd5886f61e58c8460e46a4df2b3880951f754))
- Remove output redirection ([7443591](https://github.com/favware/concourse-discord-webhook-resource/commit/7443591a7119face39a5ae2120639f43017df1c5))
- Remove wrapping quotes ([cd4935c](https://github.com/favware/concourse-discord-webhook-resource/commit/cd4935c49325c9c43a6284a3d283e52236c8913e))
- Remove unnecessary quotes from concourse script ([29329cb](https://github.com/favware/concourse-discord-webhook-resource/commit/29329cbd0d2591e61a9f19d4edca861303ae7046))
- Output redirection ([5a40ebc](https://github.com/favware/concourse-discord-webhook-resource/commit/5a40ebc45aadfaa69c9b635046dcd85131c3f28b))
- Remove all the debug logging and echo timestamp as final line ([c549c66](https://github.com/favware/concourse-discord-webhook-resource/commit/c549c6645588cd01905629def4e8cb197a667555))
- Remove string literal empty values ([bdbdff6](https://github.com/favware/concourse-discord-webhook-resource/commit/bdbdff624d52e49b538942acd310882c91c7f468))
- Fixed concourse out script ([157bc58](https://github.com/favware/concourse-discord-webhook-resource/commit/157bc58fdb55f44b8911331821dfb0cfc4039103))
- Update the concourse out script ([9575a5c](https://github.com/favware/concourse-discord-webhook-resource/commit/9575a5cdffcc475cb05a7c23795c3a4adf44d966))
- Add jq to dockerfile ([5178cde](https://github.com/favware/concourse-discord-webhook-resource/commit/5178cdee723fd7ce3f42b861d0631375f3bb7fc1))
- Ensure this works properly in docker (hopefully) ([bd79d7d](https://github.com/favware/concourse-discord-webhook-resource/commit/bd79d7d1be9af7fccf430276001b383075f20cd2))
- Fixes for concourse scripts ([1847f60](https://github.com/favware/concourse-discord-webhook-resource/commit/1847f60b51f992c30120b76a4f8f5ec00d1c7007))
- Make scripts executable ([2db9242](https://github.com/favware/concourse-discord-webhook-resource/commit/2db924221e6d6dd1a976cf11eaa2b2db2630bcd8))

## 📝 Documentation

- **readme:** Update usage ([ef9f4ac](https://github.com/favware/concourse-discord-webhook-resource/commit/ef9f4ac76286912421adab58cca5baa026be4de7))
- **readme:** Document allowed mentions should be strings ([2d96b04](https://github.com/favware/concourse-discord-webhook-resource/commit/2d96b0495f14d4ee2e965ac1ed15136cccb1e267))
- **readme:** Add note ([2612af8](https://github.com/favware/concourse-discord-webhook-resource/commit/2612af879d78adef9b343db262a8d99ab193f493))
- Update readme to use `ATC_EXTERNAL_URL` ([a64b5d9](https://github.com/favware/concourse-discord-webhook-resource/commit/a64b5d9c48da4c544f312076ee9ba4c34e3bb8fb))
- Update readme mentioning env vars ([8804c2e](https://github.com/favware/concourse-discord-webhook-resource/commit/8804c2e9e9653d47f6732b5c39bd4366883e02b7))
- Readme updates ([015bc70](https://github.com/favware/concourse-discord-webhook-resource/commit/015bc705bc6855f363410ffa8e37ac24e4dd5aa7))
- Update readme ([27e730e](https://github.com/favware/concourse-discord-webhook-resource/commit/27e730e12f77cbc77192729bbe871eeeaf2a46f6))

## 🚀 Features

- Properly parse proxy and allow-insecure options ([583932f](https://github.com/favware/concourse-discord-webhook-resource/commit/583932f06756dc915e032b9ec57a45ccb1aff4a9))
- Add env var injection for content ([3cf77e4](https://github.com/favware/concourse-discord-webhook-resource/commit/3cf77e44d4114e0008f7be3c041186760e5ed03a))
- Implement sending webhook messages ([98eee7c](https://github.com/favware/concourse-discord-webhook-resource/commit/98eee7c21f60d02c780e657ea5f66d18c9409d2f))

## 🪞 Styling

- Prettier formatting ([3ed82fd](https://github.com/favware/concourse-discord-webhook-resource/commit/3ed82fda06c98b849a1897c6de648c747052b55c))

