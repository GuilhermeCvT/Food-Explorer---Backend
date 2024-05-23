exports.up = knex => knex.schema.createTable('plates', table =>  {
  table.increments('id')
  table.text('name')
  table.text('image').nullable()
  table.text('category')
  table.text('description')
  table.decimal('price', 10, 2)
  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').nullable()
});

exports.down = function(knex) {
  
};
