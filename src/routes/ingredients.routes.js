const { Router } = require('express')
const IngredientsController = require('../controllers/ingredientsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ingredientsRoutes = Router()
const ingredientsController = new IngredientsController()

ingredientsRoutes.get('/', ensureAuthenticated, ingredientsController.index)

module.exports = ingredientsRoutes