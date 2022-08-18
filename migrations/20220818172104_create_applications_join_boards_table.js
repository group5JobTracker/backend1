/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('applications_join_boards', function(table) {
        table.integer('app').notNullable();
        table.foreign('app').references('app_id').inTable('applications')
        table.integer('board').notNullable();
        table.foreign('board').references('board_id').inTable('boards')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('applications_join_boards')
};