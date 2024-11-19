const UserService = require("../services/userService");

class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
