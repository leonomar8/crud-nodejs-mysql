const User = require("../models/userModel");

class UserService {
  static async createUser(data) {
    return await User.create(data);
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(id) {
    return await User.findByPk(id);
  }

  static async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.update(data);
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.destroy();
  }
}

module.exports = UserService;
