const { Router } = require('express')
const usersRouter = require('./users.routes')
const sessionsRouter = require('./sessions.routes')
const platesRouter = require('./plates.routes')
const ingredientsRouter = require('./ingredients.routes')
// const ordersRouter = require('./orders.routes')
const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/plates', platesRouter)
routes.use('/ingredients', ingredientsRouter)
// routes.use('/orders', ordersRouter)

module.exports = routes