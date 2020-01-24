exports.up = async function(knex) {
    await knex.schema.createTable("countries", (table) => {
        table.increments("id")
        table.string("country")
            .notNullable()
            .unique()
        table.boolean("visited")
            .defaultTo(false)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("countries")
};
