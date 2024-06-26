const knex = require('../database')

class IngredientsController {
  async index(request, response) {
    const ingredients = await knex('ingredients')

    return response.json(ingredients)
  }
}

module.exports = IngredientsController