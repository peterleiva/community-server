# Community Server

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Docker build](https://github.com/pherval/create-graphql-server/actions/workflows/docker.yml/badge.svg)](https://github.com/pherval/create-graphql-server/actions/workflows/docker.yml) [![Build and Test](https://github.com/pherval/create-graphql-server/actions/workflows/build_test.yml/badge.svg)](https://github.com/pherval/create-graphql-server/actions/workflows/build_test.yml)

Community-server is the server module for a forum application, also
known as community, which connects people around a discussion
topic to help each other. The client can be found [here](https://github.com/pherval/community-client)

## Environment Variables

To customize this project, you may add the following environment variables to your .env file in development environment

| Variable                  |   Default   | Description                                          |
| ------------------------- | :---------: | :--------------------------------------------------- |
| `PORT`                    |  `"3000"`   | Server's port                                        |
| `SENTRY_DNS`              | `undefined` | Sentry API Key to monitoring the app                 |
| `APOLLO_KEY`              | `undefined` | Apollo API Key to track GraphQL schema               |
| `APOLLO_GRAPH_ID`         | `undefined` | Apollo Graph ID                                      |
| `APOLLO_GRAPH_VARIANT`    | `undefined` | Apollo Graph variant name. Usually an environment    |
| `APOLLO_SCHEMA_REPORTING` | `undefined` | Indicates whether to push graphql schema to Apollo   |
| `LOG_LEVEL`               |  `"info"`   | Log level can give you more information              |
| `NO_LOG`                  |   `false`   | For security reasons you can disable logger          |
| `DATABASE_URI`            | `undefined` | MongoDB URI to be connected                          |
| `DEBUG`                   | `undefined` | [Debug](https://www.npmjs.com/package/debug) the app |

## Run Locally

Requirements:

- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [node 16](https://nodejs.org/en/download/)

Clone the project

```bash
  git clone https://github.com/pherval/community-server
```

Go to the project directory

```bash
  cd community-server
```

Install dependencies

```bash
  npm install
```

Before starting make sure MongoDB is running and proper set or in `/.env` has `DATABASE_URI` environment variable

### Start the server

Build the app

```bash
  npm run build
```

then start it

```bash
  npm run start
```

### Start in dev mode

```bash
  npm run dev
```

### Start using Docker

- [ ] write script
- [ ] write documentation

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

notable techs used:

- Node
- [Express.js](https://expressjs.com/)
- [ApolloGraphQL](apollographql.com/docs/apollo-server)

## Authors

- [@pherval](https://www.github.com/pherval)

## Contributing

- [ ] write `contributing.md` guide

Contributions are always welcome!

See [`contributing.md`](/contributing.md) for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
