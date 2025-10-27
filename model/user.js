// User model and in-memory storage
const users = [];

class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // hashed
  }
}

module.exports = { User, users };
