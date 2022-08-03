/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('user_id', { primaryKey: true });
        table.string('first_name', 20).notNullable();
        table.string('last_name', 20).notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('industry').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};