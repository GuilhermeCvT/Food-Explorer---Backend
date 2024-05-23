const knex = require('../database')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class PlateImageController {
  async update(request, response) {
    const { id } = request.params
    const imageFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const plate = await knex('plates').where('id', id).first()
    if(!plate)
      throw new AppError('Prato não encontrado', 401)

    if(plate.image)
      await diskStorage.deleteFile(plate.image)
    
    const filename = await diskStorage.saveFile(imageFilename)
    plate.image = filename

    await knex('plates').update(plate).where('id', id)

    return response.json(plate)
  }
}

module.exports = PlateImageController