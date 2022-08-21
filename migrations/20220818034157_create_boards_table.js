/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('boards', function(table) {
        table.increments('board_id', { primaryKey: true });
        table.string('name').notNullable();
        table.integer('owner').notNullable();
        table.foreign('owner').references('user_id').inTable('users')
        table.string('card_color_hex').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('boards');
};