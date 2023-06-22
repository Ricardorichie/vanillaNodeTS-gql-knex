import { Knex } from "knex";

interface IKnexConfig {
  [key: string]: Knex.Config;
}
// Update with your config settings.

const config: IKnexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "/Users/a/Documents/nodeTS/src/database/dev.sqlite3",
    },
    debug: true,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
