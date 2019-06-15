
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', table => {
        table.increments('id').unsigned().primary();
        table.dateTime('createdAt').notNull();
        table.string('name').notNull();
        table.string('description', 1000).notNull();
        table.decimal('price', 7, 2).notNull();
        table.string('observation', 1000);
        table.enum('status', ['approve', 'refuse', 'pending']).notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};
