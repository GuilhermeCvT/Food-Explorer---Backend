const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  
  async execute({ name, email, password, position }) {
    const userExist = await this.userRepository.findByEmail(email)

    if (userExist)
      throw new AppError('Este e-mail já está em uso')

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword, position })

    return userCreated
  }
}

module.exports = UserCreateService