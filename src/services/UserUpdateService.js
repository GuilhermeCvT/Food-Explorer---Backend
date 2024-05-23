const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ user_id, name, email, password, old_password, position, active }) {
    const user = await this.existUser(user_id)

    await this.verifyEmailInUse(user_id, email)
    this.verifyPosition(position)
    await this.verifyOldPasswordNotFilled(password, old_password)
    if(this.passwordsAreFilled(password, old_password)) {
      await this.compareOldWithCurrentPassword(old_password, user.password)

      user.password = await hash(password, 8)
    }
    
    user.name = name ?? user.name
    user.email = email ?? user.email
    user.position = position ?? user.position
    user.active = active ?? user.active
    
    await this.userRepository.update( user )
  }

  async existUser(id) {
    const user = await this.userRepository.findById(id)
    if (!user)
      throw new AppError('Usuário não encontrado')

    return user
  }

  async verifyEmailInUse(user_id, email) {
    const emailAlredyUsed = await this.userRepository.findByEmail(email) 
    if (emailAlredyUsed && emailAlredyUsed.id !== user_id)
      throw new AppError('E-mail já está em uso')
  }

  verifyPosition(position) {
    const positionsArray = ['Admin', 'Usuario']
    if(!positionsArray.find(positionArray => positionArray === position))
      throw new AppError('Cargo inválido')
  }

  async verifyOldPasswordNotFilled(password, oldPassword) {
    if(password && !oldPassword)
      throw new AppError('Senha antiga não informada')
  }

  passwordsAreFilled(password, oldPassword) {
    return (password && oldPassword)
  }

  async compareOldWithCurrentPassword(oldPassword, currentPassword) {
    const checkPasswords = await compare(oldPassword, currentPassword)
    if(!checkPasswords)
      throw new AppError('Senha antiga não bate com a atual')
  }
}

module.exports = UserUpdateService