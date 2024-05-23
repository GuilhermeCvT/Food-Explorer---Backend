const { Router } = require('express')
const PlatesController = require('../controllers/platesController')
const PlateImageController = require('../controllers/plateImageController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const platesRoutes = Router()
const platesController = new PlatesController()
const plateImageController = new PlateImageController()
const upload = multer(uploadConfig.MULTER)

platesRoutes.use(ensureAuthenticated)
platesRoutes.post('/', platesController.create)
platesRoutes.put('/:id', platesController.update)
platesRoutes.patch('/image/:id', upload.single('image'), plateImageController.update)
platesRoutes.get('/', platesController.index)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)

module.exports = platesRoutes