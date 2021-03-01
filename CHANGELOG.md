# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

### Added

- Setup a GraphQL server to `/api` endpoint
- Add npm scripts

  - `npm run open:coverage-report` to open the coverage report in the browser
  - `npm test` to test the codebase with **[jest](http://jestjs.io/docs)**
  - `npm run format` to format the codebase using [prettier](http://prettier.io/docs/)

- Query a list of paginated topics

## Webpack

---

### Added

- Setup webpack to build the project inside `/dist`
- Use npm scripts to build and start the app and much more:
  - `npm run build` to build the app in `/dist` using webpack
  - `npm run start` to build and run the project
  - `npm run dev` to run [`webpack --watch`](https://webpack.js.org/guides/development/#using-watch-mode) and [nodemon](https://www.npmjs.com/package/nodemon) with the facility of live reload for development environment

[unreleased]: https://github.com/peterleiva/community-server/compare/canary
