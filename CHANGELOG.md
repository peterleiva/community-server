# Changelog

All **notable changes** to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### GraphQL API

- threads query
- GraphQL design for paginable `threads` query and its connected types
-

#### CI

- Github action for Build & Test
- Build and Push github action
- CodeQL Analysis

#### Server

- HTTP express server factory with reconnect feature
- HTTP body compression
- Cors with origins `https?://localhost:3000|4000` and `https://studio.apollographql.com` with methods: `GET` and `POST`
- Build script

#### Deployment

- Docker integration
- Add Dockerfile
- Use docker-compose to start the application in several environments
- Add scripts to help start those actions

- Add VSCode debugger for test environment
- Pino Logger

### Changed

- Typescript project structure defines only one man `tsconfig.json` and one `tsconfib.build.json` for building purposes

## [0.2.0] - 2021-06-24

### Added

- Define project initial architecture
- Typescript configuration files
- Build application using webpack in development and production modes
- Linter (ESLint)
- Test setup with several layers: E2E, Integration and Unit

## [0.1.0] - 2021-06-24

### Added

- Initialize npm project with all dependencies and its initial script set
- Setup prettier and scripts for helping formating and checking the code
- Add [CHANGELOG.md](/CHANGELOG.md) file

[unreleased]: https://github.com/pherval/create-graphql-server/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/pherval/create-graphql-server/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pherval/create-graphql-server/releases/tag/v0.1.0
