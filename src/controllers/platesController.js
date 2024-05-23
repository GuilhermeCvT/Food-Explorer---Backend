const knex = require('../database')

class PlatesController {
  async create(request, response) {
    const { name, category, description, price, ingredients } = request.body
    const [plate_id] = await knex('plates').insert({name, category, description, price})
    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        plate_id
      }
    })

    await knex('ingredients').insert(ingredientsInsert)
    return response.json(plate_id)
  }

  async update(request, response) {
    const { name, category, description, price, ingredients } = request.body
    const { id } = request.params
    await knex('plates').update({
      name,
      category,
      description,
      price
    })
    .where('id', id)

    await knex('ingredients').where('plate_id', id).delete()

    const IngredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        plate_id: id
      }
    })

    await knex('ingredients').insert(IngredientsInsert)

    return response.json()
  }

  async index(request, response) {
    const { name, ingredients } = request.query
    let plates

    if(ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

      plates = await knex('ingredients')
        .whereIn('name', filterIngredients)
        .innerJoin('plates', 'plates.id', 'ingredients.plate_id')
        .select(['plates.name', 'plates.category', 'plates.description', 'plates.price'])
        .whereLike('plates.name', `%${name}%`)
        .orderBy('plates.name')
    } else {
      plates = await knex('plates')
        .whereLike('name', `%${name}%`)
        .orderBy('name')
    }

    const allIngredients = await knex('ingredients')
    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = allIngredients.filter(ingredient => ingredient.plate_id === plate.id)

      return {
        ...plate,
        ingredients: plateIngredients
      }
    })

    return response.json({platesWithIngredients})
  }

  async show(request, response) {
    const {id} = request.params
    const plate = await knex('plates').where({id}).first()
    const ingredients = await knex('ingredients').where('plate_id', id)

    return response.json({
      ...plate,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex('plates').where('id', id).delete()

    return response.json()
  }
}

module.exports = PlatesController