/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('applications', function(table) {
        table.increments('app_id', { primaryKey: true });
        table.integer("user").notNullable();
        table.foreign('user').references('user_id').inTable('users');
        table.string('status').notNullable();
        table.string('position').notNullable();
        table.string('company').notNullable()
        table.string('location').notNullable();
        table.string('recruiter_email').nullable();
        table.string('created_at').notNullable();
        table.string('notes', 20000).nullable();
        table.boolean('reminders_on');
        table.string('card_color_hex').notNullable();
        table.string('job_description', 20000).nullable();
        table.string("tagName").nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('applications')
};