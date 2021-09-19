# Community Server

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Docker build](https://github.com/pherval/create-graphql-server/actions/workflows/docker.yml/badge.svg)](https://github.com/pherval/create-graphql-server/actions/workflows/docker.yml) [![Build and Test](https://github.com/pherval/create-graphql-server/actions/workflows/build_test.yml/badge.svg)](https://github.com/pherval/create-graphql-server/actions/workflows/build_test.yml)

Community is the server module for a forum application, also
known as community, which connects people around a discussion
topic to help each other

## Environment Variables

To customize this project, you may add the following environment variables to your .env file.

| Variable       |   Default   | Description                                           |
| -------------- | :---------: | :---------------------------------------------------- |
| `SENTRY_DNS`   | `undefined` | Sentry API Key to monitoring the app                  |
| `APOLLO_KEY`   | `undefined` | Apollo API Key to track GraphQL schema                |
| `LOG_LEVEL`    |  `"info"`   | Log level to give more log information                |
| `PORT`         |  `"3000"`   | Server's port                                         |
| `DATABASE_URI` | `undefined` | MongoDB URI to be connected                           |
| `DEBUG`        | `undefined` | Debug the app. Example: `DEBUG=express:\*,database\*` |

Default values can also be seen in [.env.defaults](/.env.defaults)

## Run Locally

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

TODO: explain database configuration

Before starting make sure MongoDB is running and proper set in [.databaserc.json](/.databaserc.json) or in `/.env` with `DATABASE_URI`

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

```bash
  npm run docker:dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

**Client:** Next.js, ApolloGraphQL, React.js

**Server:** Node, Express, ApolloGraphQL

## Authors

- [@pherval](https://www.github.com/pherval)

## Contributing

Contributions are always welcome!

See [`contributing.md`](/contributing.md) for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
