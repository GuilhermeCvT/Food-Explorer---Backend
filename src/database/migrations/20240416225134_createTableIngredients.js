exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id')
  table.text('name')
  table.integer('plate_id').references('id').inTable('plates').onDelete('CASCADE')
});

exports.down = function(knex) {
  
};
