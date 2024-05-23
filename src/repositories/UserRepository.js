const knex = require('../database')

class UserRepository {
  async findByEmail(email) {
    const user = await knex.table('users').where('email', email).first()

    return user
  }

  async findById(id) {
    const user = await knex.table('users').where('id', id).first()

    return user
  }

  async create({ name, email, password, position }) {
    const userId = await knex.insert([{
      name: name,
      email: email,
      password: password,
      position: position
    }]).into('users')

    return { id: userId }
  }

  async update({ id, name, email, password, position, active }) {
    const userId = await knex('users')
      .update({
        name: name,
        email: email,
        password: password,
        position: position,
        active: active
      })
      .where('id', id)

    return { id: userId }
  }
}

module.exports = UserRepository