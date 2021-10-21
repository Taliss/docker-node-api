/* eslint-disable no-process-exit */
const db = require('.');

(async () => {
  try {
    await db.schema.dropTableIfExists('users');
    await db.schema.withSchema('public').createTable('users', (table) => {
      table.increments();
      table.string('email').unique().notNullable();
      table.string('given_name').notNullable();
      table.string('family_name').notNullable();
      table.datetime('created').defaultTo(db.fn.now());
    });
    console.log('Created users table!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
