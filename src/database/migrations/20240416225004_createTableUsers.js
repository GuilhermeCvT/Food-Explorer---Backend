exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.text('name')
  table.text('email')
  table.text('password')
  table.enu('position', ['Usuario', 'Admin']).default('usuario')
  table.boolean('active').default(true)
  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = function(knex) {
  
};
