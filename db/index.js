const knex = require('knex');

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'node-docker-api',
    password: 'qwerty',
  },
});
