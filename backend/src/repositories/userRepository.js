const User = require('../models/User');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() });
  }

  async findById(id) {
    return User.findById(id);
  }

  async updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }
}

module.exports = new UserRepository();
