exports.up = knex => knex.schema.createTable('orders', table => {
  table.increments('id')
  table.enu('status', ['Pendente', 'Preparando', 'Preparado', 'Entregue']).default('Pendente')
  table.text('details')
  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('delivered_at').nullable()
  table.integer('user_id').references('id').inTable('users')
});

exports.down = function(knex) {
  
};
